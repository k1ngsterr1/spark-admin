const User = require("@models/userModel");
const bcryptjs = require("bcryptjs");

class UserController {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({ username, email, password });
      await newUser.save(
        res
          .status(201)
          .json({ message: "User created successfully", user: newUser })
      );
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found" });
      }

      const isMatch: boolean = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async changeUserPassword(req, res) {
    try {
      const { userId, oldPassword, newPassword } = req.body;
      const user = await User.findById(userId); // Adjust based on your ORM

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordChanged = await user.changePassword(
        oldPassword,
        newPassword
      );
      if (!passwordChanged) {
        return res.status(400).json({ message: "Incorrect old password" });
      }

      // Save the updated user
      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error changing password", error: error.message });
    }
  }

  async changeUserRole(req, res) {
    try {
      const { userId, newRole } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = newRole;

      await user.save();
      res.json({ message: "Role updated successfully", role: user.role });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error changing role:", error: error.message });
    }
  }
}

export default new UserController();
