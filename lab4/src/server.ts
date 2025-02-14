import express from 'express';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './router/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__dirname);

const app = express();

const PORT = 5000

const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/resources/views/layouts/',
    partialsDir: __dirname + '/resources/views/partials/'
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', __dirname + '/resources/views')
app.use(express.json()) // Add this line to parse JSON request bodies

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
