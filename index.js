const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

//connect mongodb database
require('./database/db');

app.get("/", async (req,res)=>{
    res.send("Test server is running");
});


app.listen(port, ()=> console.log(`Server running on port ${port}`));





