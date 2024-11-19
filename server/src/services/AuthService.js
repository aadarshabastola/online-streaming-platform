const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const AppError = require("../errors/AppError");
const knex = require("../../db/knex");

class AuthService {
  static async registerUser(username, email, password) {
    // Check if user exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new AppError(
        "USER_ALREADY_EXISTS",
        "A user with this email already exists.",
        400
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      message: "Registration successful",
      user,
    };
  }

  static async loginUser(email, password) {
    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new AppError(
        "AUTH_INVALID_CREDENTIALS",
        "Invalid email or password.",
        401
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError(
        "AUTH_INVALID_CREDENTIALS",
        "Invalid email or password.",
        401
      );
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Store session
    await knex("sessions").insert({
      user_id: user.id,
      token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  static async logout(token) {
    await knex("sessions").where({ token }).update({ is_valid: false });

    return {
      message: "Logout successful.",
    };
  }

  static async getCurrentUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("USER_NOT_FOUND", "User not found.", 404);
    }

    return { user };
  }
}

module.exports = AuthService;
