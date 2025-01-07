import express from 'express';

const app = express();

const PORT = 5000

app.get('/', (req, res) => {
    res.send('Hello I am Phan Dương Định - PD09993')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
