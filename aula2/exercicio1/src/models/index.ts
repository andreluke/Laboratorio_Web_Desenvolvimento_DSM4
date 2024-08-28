import mongoose, { ObjectId, Schema, Types } from "mongoose";

const PeopleSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    }
})

const PhoneSchema = new Schema({
    idpeople: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        valitdate: {
            validator: async function (id: string) {
                const pep = await People.findById(id);
                return !!pep;
            },
            message: 'A pessoa fornecida não existe',
        },
    },
    number: {
        type: Number,
        maxlength: [11, "O telefone pode ter no máximo 11 caracteres"],
        trim: true,
        unique: true,
        required: [true, "O telefone é obrigatório"],
        validate: {
            validator: function (value: string) {

                const regex = /^[0-9]{11}$/;
                return regex.test(value);
            },
            message: (props: any) => `${props.value} não é telefone válido`,
        }
    }
})

const CarsSchema = new Schema({
    model:{
        type: String,
        maxlength: 15,
        unique: true
    }
})

const CarPersonSchema = new Schema({
    idpeople: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        valitdate: {
            validator: async function (id: string) {
                const pep = await People.findById(id);
                return !!pep;
            },
            message: 'A pessoa fornecida não existe',
        },
    },
    idcar: {
        type: Schema.Types.ObjectId,
        ref: 'Cars',
        required: true,
        valitdate: {
            validator: async function (id: string) {
                const car = await Cars.findById(id);
                return !!car;
            },
            message: 'O carro fornecido não existe',
        },
    },
})

const People = mongoose.model('People', PeopleSchema)
const Phones = mongoose.model('Phones', PhoneSchema)
const Cars = mongoose.model('Cars', CarsSchema)
const CarPeople = mongoose.model('car_by_person', CarPersonSchema)

export { People, Phones, Cars, CarPeople}