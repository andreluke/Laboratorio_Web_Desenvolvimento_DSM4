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
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string) {
            // expressão regular para validar o formato do e-mail
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value);
            },
            message: (props:any) => `${props.value} não é um formato de e-mail válido`,
    }
    }
});



const User = mongoose.model('User', UserSchema)

export {User}
