import express from 'express'
import { connectDB } from './config/db.js';
import productRouter from './routes/product.router.js';

const app=express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World')
});


app.use('/products', productRouter);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});