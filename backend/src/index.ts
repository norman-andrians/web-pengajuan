import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const port = 6970;

const MONGO_URI = "mongodb://127.0.0.1:27017/pengajuan";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
    console.log("Connected to mongodb");
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes());

app.listen(port, () => {
    console.log("Server is running");
});