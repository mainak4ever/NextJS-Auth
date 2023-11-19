import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        // mongoose.connect("mongodb+srv://mainak:mainak@first-db.ym48oac.mongodb.net/");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log(`Error connecting to MongoDB: ${err}`);
            process.exit();
        })
    } catch (error) {

        console.log("Something went wrong");
        console.log(error);

    }

}