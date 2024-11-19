const AuthService = require("../services/AuthService");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const result = await AuthService.registerUser(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const token = req.token; // We'll get this from auth middleware
      const result = await AuthService.logout(token);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req, res, next) {
    try {
      const result = await AuthService.getCurrentUser(req.user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
