import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import 'reflect-metadata';
import express from 'express';
import { createClient } from 'redis';


const app = express();
app.use(express.json());

// Connect to Redis
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.connect().then(() => {
  console.log('Redis connected');
});

// Initialize TypeORM
AppDataSource.initialize().then(async () => {

    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)


}).catch(error => console.log(error))

// Example route to test DB
app.get('/users', async (req, res) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

