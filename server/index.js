import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.get('/', (req,res) => {
    res.send('Hello to Memories API')
})

const PORT = process.env.PORT || 5000;

mongoose.connect( process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((error) => console.log(error));

// mongoose.set('useFindAndModify', false);
