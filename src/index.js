import Express from "express";
import morgan from "morgan";
import paymentRoutes from './routes/payment.routes';
import {PORT} from './config'

const app = Express();
//conf
app.use(morgan('dev'))


//routes
app.use(paymentRoutes);


app.listen(PORT);
console.log("server on port", PORT);