// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User, { IUser } from "../models/userModel";
// import { error } from "console";


// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     const savedUser = await newUser.save();

//     res.status(201).json({ 
//       status: "user created successfully",
//       user: {
//       id: savedUser._id,
//       name: savedUser.name,
//       email: savedUser.email,
//       friends: savedUser.friends,
//       status: savedUser.status
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }


//     const token = jwt.sign({ userId: user._id , username : user.name , email: user.email, friends: user.email , status: user.status  }, process.env.JWT_SECRET!, {
//       expiresIn: "1d",
//     });


//     const { _id,  name , friends , status } = user;

//     res.status(200).json({ status: "success", 
//     user: { id:_id, name , email, friends , status },
//     token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error",
//       error : err
//      });
//   }


// };

// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const populatedUser = await User.findById(savedUser._id).populate('friends', 'name email status');

    if (populatedUser) {
      res.status(201).json({
        status: 'user created successfully',
        user: {
          id: populatedUser._id,
          name: populatedUser.name,
          email: populatedUser.email,
          friends: populatedUser.friends,
          status: populatedUser.status,
        },
      });
    } else {
      res.status(500).json({ message: 'Failed to populate user' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').populate('friends', 'name email status');

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username: user.name, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 'success',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        friends: user.friends,
        status: user.status,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};