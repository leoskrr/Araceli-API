const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const routes = require('./routes');
const { mongo, server } = require('./.env');

mongoose.connect(`mongodb+srv://${mongo.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(server.port,() => {
    console.log(`Back-end executando em ${server.ip}:${server.port}.`);
})

