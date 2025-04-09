require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const comicRoutes = require('./routes/comic-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectToDB();

// Middleware -> express.json()
app.use(express.json());

// Create routes here
app.use('/api/comics', comicRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});