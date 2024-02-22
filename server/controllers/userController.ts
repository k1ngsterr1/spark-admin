import { User } from "@models/userModel";
import bcryptjs from "bcryptjs";
import sequelize from "config/sequelize";

const JWT_SECRET = process.env.JWT_SECRET;
const sendVerificationEmail = require("@services/emailService");
const jwt = require("jsonwebtoken");

class UserController {
  async createUser(req, res) {
    try {
      const { username, email, password, passwordConfirmation } = req.body;
      const userRepository = sequelize.getRepository(User);
      const newUser = await userRepository.create({
        username,
        email,
        password,
      });

      if (password !== passwordConfirmation) {
        console.log(password, passwordConfirmation);
        return res.status(400).json({ message: "Passwords do not match" });
      }

      await newUser.save(
        res
          .status(201)
          .json({ message: "User created successfully", user: newUser })
      );
      sendVerificationEmail(email, username);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userRepository = sequelize.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

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

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        message: "Logged in successfully",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async verifyUser(req, res) {
    try {
      const { userCode, userID } = req.body;
      const userRepository = sequelize.getRepository(User);
      const user = userRepository.findByPk(userID);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if ((await user).verificationCode === userCode) {
        (await user).isVerified = true;
        (await user).verificationCode = null;
        (await user).save;

        res.json({ message: "User successfully verified" });
      } else {
        res.status(400).json({ message: "Invalid verification code" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async changeUserPassword(req, res) {
    try {
      const { userId, oldPassword, newPassword } = req.body;
      const user = await User.findByPk(userId);

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
      const user = await User.findByPk(userId);

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
