const User = require("@models/userModel");

class UserController {
  async createUser(req, res) {
    try {
      const { username, email, password, role } = req.body;

      const newUser = new User({ username, email, password, role });
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
}
