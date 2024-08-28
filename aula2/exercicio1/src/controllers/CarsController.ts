import { Request, Response } from "express";
import { Cars } from "../models/index";

class CarsController {
    public async create(req: Request, res: Response): Promise<void> {
        const { model } = req.body;
        if (!model) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        } else {
            try {
                const response = await Cars.create({ model });
                res.send(response);
            } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Cars.find(
            {},
            {},
            {
                sort: { nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Cars.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, model } = req.body;
        try {
            const response = await Cars.findByIdAndUpdate(
                id,
                { model },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.errors?.model) {
                res.send({ message: e.errors.model.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }


}

export default new CarsController();