"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/search", authMiddleware_1.authMiddleware, userController_1.searchUsers);
router.put("/:userId/friends", authMiddleware_1.authMiddleware, userController_1.addFriend);
router.put("/:userId/status", authMiddleware_1.authMiddleware, userController_1.updateStatus);
router.get('/:userId', authMiddleware_1.authMiddleware, userController_1.getUserStatus);
exports.default = router;
