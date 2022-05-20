import mongoose from "mongoose";

export async function connect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(
      "Connected to database successfully on " + conn.connection.host
    );
  } catch (error) {
    console.log(error);
  }
}
