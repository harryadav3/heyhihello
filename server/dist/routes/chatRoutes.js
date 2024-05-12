"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
router.get('/:userId', authMiddleware_1.authMiddleware, chatController_1.getMessages);
router.post('/', authMiddleware_1.authMiddleware, chatController_1.sendMessage);
exports.default = router;
