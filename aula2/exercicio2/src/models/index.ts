import mongoose, { ObjectId, Schema, Types } from "mongoose";

const DistrictsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    }
});

const CitiesSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },
    districts: [DistrictsSchema]
}); 

const StatesSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 30,
        required: true
    },
    cities: [CitiesSchema]
});

const States = mongoose.model('States', StatesSchema)
const Cities = mongoose.model('Cities', CitiesSchema)
const Districts = mongoose.model('Districts', DistrictsSchema)

export {States, Cities, Districts}