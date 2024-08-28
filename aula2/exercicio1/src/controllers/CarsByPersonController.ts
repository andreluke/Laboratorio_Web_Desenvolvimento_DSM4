import { Request, Response } from "express";
import { CarPeople } from "../models/index";

class CarPeopleController {
    public async create(req: Request, res: Response): Promise<void> {
        const { idpeople, idcar } = req.body;
        if (!idpeople || !idcar) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        } else {
            try {
                const response = await CarPeople.create({ idpeople, idcar });
                res.send(response);
            } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await CarPeople.find(
            {},
            {},
            {
                sort: { nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await CarPeople.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    


}

export default new CarPeopleController();