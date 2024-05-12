import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const users = await User.find({
      $or: [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['AVAILABLE', 'BUSY'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Status updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }



};



export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, 'status');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ status: user.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};