import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class userController {
  static userRegistration = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ status: 'failed', message: 'Email is already exits' });
    } else {
      if (firstName && lastName && email && password && confirmPassword) {
        if (password === confirmPassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashPassword,
            });
            await doc.save();
            const saveUser = await User.findOne({ email: email });
            const token = jwt.sign(
              { userID: saveUser._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '15d' }
            );
            res.status(201).send({
              status: 'success',
              message: 'Registration successfully',
              token: token,
            });
          } catch (error) {
            console.log(errror);
            res.send({ status: 'failed', message: 'Registration failed' });
          }
        } else {
          res.send({
            status: 'failed',
            message: "Password and confirm password  doesn't match",
          });
        }
      } else {
        res.send({ status: 'failed', message: 'All fields are required' });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '15d' }
            );
            res.json({
              status: 'success',
              message: 'Login successfully',
              token: token,
              user: user,
            });
          } else {
            res.send({
              status: 'failed',
              message: 'Email or Password is not Valid',
            });
          }
        } else {
          res.send({
            status: 'failed',
            message: 'You are not a registered user',
          });
        }
      } else {
        res.send({ status: 'failed', message: 'All fields are required' });
      }
    } catch (error) {
      res.send({ status: 'failed', message: 'Unable to Login' });
    }
  };

  static userLogout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.send({ msg: 'You have been Logged Out' });
      } else {
        res.send({ msg: 'Error' });
      }
    });
  };
}

export default userController;
