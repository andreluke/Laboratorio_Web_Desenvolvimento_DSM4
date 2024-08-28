import { Request, Response } from "express";
import { Phones } from "../models/index";

class PhonesController {
    public async create(req: Request, res: Response): Promise<void> {
        const { idpeople, number } = req.body;
        if (!idpeople || number) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        } else {
            try {
                const response = await Phones.create({ idpeople, number });
                res.send(response);
            } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Phones.find(
            {},
            {},
            {
                sort: { Phones_nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Phones.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, number } = req.body;
        try {
            const response = await Phones.findByIdAndUpdate(
                id,
                { number },
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
            if (e.errors?.number) {
                res.send({ message: e.errors.number.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }


}

export default new PhonesController();