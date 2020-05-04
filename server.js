const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

//settings

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

//routes

app.use('/api',routes);

app.listen(PORT, () => console.log(`app is listening on ${PORT}`))