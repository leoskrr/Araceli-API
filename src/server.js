const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const routes = require('./routes');
const { mongo, server } = require('./.env');

const mongodb = process.env.MONGO || mongo.db;
const port = process.env.PORT || server.port; 

mongoose.connect(`mongodb+srv://${mongodb}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(port,() => {
    console.log(`Back-end executando em ${server.ip}:${port}.`);
})