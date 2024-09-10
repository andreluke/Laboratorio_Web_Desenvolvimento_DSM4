import { Request, Response } from "express";
import { Cities, Districts } from "../models";

class DistrictsController {
    public async create(req: Request, res: Response): Promise<void> {
        const { cityId, name } = req.body;

        try {
            const city = await Cities.findById(cityId);
            if (!city) {
                res.status(404).send({ message: "Cidade não encontrada" });
                return;
            }

            const district = await Districts.create({ name });
            city.districts.push(district); 
            await city.save(); 

            res.send(district);
        } catch (e: any) {
            res.send({ message: e });
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Districts.find({}, {}, { sort: { name: 1 } }));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const district = await Districts.findByIdAndDelete(id);

        if (district) {
            await Cities.updateMany({}, { $pull: { districts: { _id: id } } });
            res.json(district);
        } else {
            res.json({ message: "Distrito não encontrado" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, name } = req.body;
        try {
            const district = await Districts.findByIdAndUpdate(
                id,
                { name },
                { new: true, runValidators: true }
            );
            if (district) {
                res.json(district);
            } else {
                res.json({ message: "Distrito não encontrado" });
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

export default new DistrictsController();
