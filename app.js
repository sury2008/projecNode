import express from 'express'
import { connectDB } from './config/db.js';
import productRouter from './routes/product.router.js';
import { printMsg } from './middlewares/custom.middleware.js';
import { errorHandler } from './middlewares/errors.middleware.js';

const app=express();

connectDB();


app.use(express.json())


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use(printMsg)

app.use('/products', productRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});