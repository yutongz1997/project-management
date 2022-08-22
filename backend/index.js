const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);


app.listen(port, () => {
    console.log(`Server is running on the port ${port}...`);
});

