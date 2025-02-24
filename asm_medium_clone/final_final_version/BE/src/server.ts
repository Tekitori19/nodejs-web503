import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import dbInit from './config/db.js';
import HeaderMiddleware from './middlewares/header.middleware.js';
import router from './routers/index.js';

const app = express();
let httpServer: ReturnType<typeof http.createServer>;

const PORT = 5000
dbInit
    .then(() => { console.log("db connected") })
    .catch((err: any) => { throw new Error(err) })

app.use(HeaderMiddleware)
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))

app.use('/', router)

httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
