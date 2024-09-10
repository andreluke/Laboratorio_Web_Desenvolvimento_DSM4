import { Request, Response } from "express";
import { States, Cities } from "../models";

class CitiesController {
    public async create(req: Request, res: Response): Promise<void> {
        const { stateId, name } = req.body;

        try {
            const state = await States.findById(stateId);
            if (!state) {
                res.status(404).send({ message: "Estado não encontrado" });
                return;
            }

            const city = await Cities.create({ name });
            state.cities.push(city); // Adiciona a cidade ao estado
            await state.save(); // Salva o estado com a nova cidade

            res.send(city);
        } catch (e: any) {
            res.send({ message: e });
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Cities.find({}, {}, { sort: { name: 1 } }));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const city = await Cities.findByIdAndDelete(id);

        if (city) {
            // Remove a cidade do estado correspondente
            await States.updateMany({}, { $pull: { cities: { _id: id } } });
            res.json(city);
        } else {
            res.json({ message: "Cidade não encontrada" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, name } = req.body;
        try {
            const city = await Cities.findByIdAndUpdate(
                id,
                { name },
                { new: true, runValidators: true }
            );
            if (city) {
                res.json(city);
            } else {
                res.json({ message: "Cidade não encontrada" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O nome ${name} já está em uso` });
            } else if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            } else {
                res.send({ message: e });
            }
        }
    }
}

export default new CitiesController();
