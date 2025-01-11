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
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to Redis
const redisClient = (0, redis_1.createClient)({ url: 'redis://localhost:6379' });
redisClient.connect().then(() => {
    console.log('Redis connected');
});
// Initialize TypeORM
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.AppDataSource.manager.find(User_1.User);
    console.log("Loaded users: ", users);
})).catch(error => console.log(error));
// Example route to test DB
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const users = yield userRepo.find();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map