import express from 'express';
import bodyParser from 'body-parser';

import participantsRouter from './routes/participant.routes.js';
import projectsRouter from './routes/projects.routes.js';


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/participants', participantsRouter);
app.use('/api/projects', projectsRouter);

app.listen(port, () => {
    console.log(`Server is running on the port ${port}...`);
});


export default app;
