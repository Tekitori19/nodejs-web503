import express from 'express';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routers/index.js';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression'; // nén dữ liệu tăng hiệu suất
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import dbInit from './config/initDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let httpServer: ReturnType<typeof http.createServer>;

const PORT = 5000
dbInit
    .then(() => { console.log("db connected") })
    .catch((err) => { throw new Error(err) })

const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/resources/views/layouts/',
    partialsDir: __dirname + '/resources/views/partials/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Cho phép truy cập vào các thuộc tính không phải "own property"
        allowProtoMethodsByDefault: true, // Cho phép truy cập vào các phương thức không phải "own property"
    },
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', __dirname + '/resources/views')
app.use(compression())
app.use(cookieParser())
app.use(methodOverride('_method'));
app.use(express.json()) // Add this line to parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Add this line to parse URL-encoded request bodies
app.use(cors({
    credentials: true,
}))
app.use(morgan('dev'))

app.use('/', router)

httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
