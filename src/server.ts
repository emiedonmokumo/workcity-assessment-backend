import app from './app';
import connectDB from './config/db';

const port = Number(process.env.PORT) || 8080;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Listening on ${port}...`);
    });
}

startServer();
