import { Request, Response } from "express";
import { People } from "../models/index";

class PersonController {
    public async create(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        if (!name) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        } else {
            try {
                const response = await People.create({ name });
                res.send(response);
            } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await People.find(
            {},
            {},
            {
                sort: { nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await People.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, name } = req.body;
        try {
            const response = await People.findByIdAndUpdate(
                id,
                { name },
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
            if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }


}

export default new PersonController();