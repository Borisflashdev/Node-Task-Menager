require('./database/connect');
require('dotenv').config();

const express = require('express');
const app = express();

const tasksRouter = require('./routes/tasks');
const connectDB = require('./database/connect');
const urlDB = process.env.MONGO_URI;

// GET ALL TASKS    - app.get('/api/v1/tasks')
// POST TASK        - app.post('/api/v1/tasks')
// GET SINGLE TASK  - app.get('/api/v1/tasks/:id')
// DELETE TASK      - app.delete('/api/v1/tasks/:id')
// PATCH TASK       - app.patch('/api/v1/tasks/:id')

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);

const port = 5005;

const startServer = async () => {
    try {
        await connectDB(urlDB);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();