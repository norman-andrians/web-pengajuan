import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
});

const ajuanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    telepon: { type: String, required: true },
    keluhan: {
        subjek: { type: String, required: true },
        pesan: { type: String, required: true }
    }
})

export const UserModel = mongoose.model("user", userModel);
export const KeluhanModel = mongoose.model("keluhan", ajuanSchema);