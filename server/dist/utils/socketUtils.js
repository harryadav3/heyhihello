"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const messageModel_1 = __importDefault(require("../models/messageModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const languageModel_1 = require("./languageModel");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { sender, receiver, content } = data;
            const newMessage = new messageModel_1.default({ sender, receiver, content });
            yield newMessage.save();
            const receiverUser = yield userModel_1.default.findById(receiver);
            if (receiverUser && receiverUser.status === 'BUSY') {
                const response = yield (0, languageModel_1.languageModelResponse)(content);
                const botMessage = new messageModel_1.default({
                    sender: receiver,
                    receiver: sender,
                    content: response,
                });
                yield botMessage.save();
                io.to(socket.id).emit('message', botMessage);
            }
            else {
                io.emit('message', newMessage);
            }
        }));
        socket.on('typing', (data) => {
            io.emit('typing', data);
        });
        socket.on('online', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userModel_1.default.findById(userId);
            if (user) {
                user.status = 'AVAILABLE';
                yield user.save();
                io.emit('online', { userId, status: 'AVAILABLE' });
            }
        }));
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.initSocket = initSocket;
const getIO = () => io;
exports.getIO = getIO;
