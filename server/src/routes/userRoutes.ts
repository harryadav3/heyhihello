import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  searchUsers,
  addFriend,
  updateStatus,
  getUserStatus
} from "../controllers/userController";

const router = express.Router();

router.get("/search", authMiddleware, searchUsers);
router.put("/:userId/friends", authMiddleware, addFriend);
router.put("/:userId/status", authMiddleware, updateStatus);
router.get('/:userId', authMiddleware, getUserStatus);

export default router;
