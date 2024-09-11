import mongoose, { ObjectId, Schema, Types } from "mongoose";

const UserSchema = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        maxlength: 30,
        required: true,
        unique: true
    }
});



const User = mongoose.model('User', UserSchema)

export {User}