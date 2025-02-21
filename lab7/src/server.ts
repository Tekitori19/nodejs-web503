import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dbInit from './config/initDB.js';
import HeaderMiddleware from './middlewares/header.middleware.js';
import router from './routers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let httpServer: ReturnType<typeof http.createServer>;

const PORT = 5000
dbInit
    .then(() => { console.log("db connected") })
    .catch((err) => { throw new Error(err) })

app.use(HeaderMiddleware)
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));

app.use('/', router)

httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
