const express = require('express');
const dbConnection = require("./config/db")
const app = express();
const userRoutes = require("./modules/users/routes/userRoutes");
const postRoutes = require("./modules/posts/routes/postRoutes");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json())
app.use(userRoutes);
app.use(postRoutes);
dbConnection();
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))