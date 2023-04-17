import { AppDataSource } from "./data-source";
import { FoodItem } from "./entity/FoodItem";
import express, { Request, Response } from "express";
import { Like } from "typeorm"
import cors from "cors"

AppDataSource.initialize().catch(error => console.log(error))

const app = express()

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), async (req: Request, res: Response) => {
    return res.json(JSON.stringify(await AppDataSource.manager.find(FoodItem, { relations: { restaurant: true } })));
})

app.get('/searchbar', cors(corsOptions), async (req: Request, res: Response) => {
    var searchWord = req.query.keyword?.toString().trim();
    if (searchWord) {
        let data = await AppDataSource.getRepository(FoodItem).find({ relations: { restaurant: true }, where: [{ description: Like(`%${searchWord}%`) }, { name:Like(`%${searchWord}%`) }, { restaurant: { name: Like(`%${searchWord}%`)}}] });
        return res.json(JSON.stringify(data))
    } 
    else {
        let data = await AppDataSource.getRepository(FoodItem).find({ relations: { restaurant: true } });
        return res.json(JSON.stringify(data))
    }
})

app.listen(3001, () => {
    console.log(`[server]: Server is running at http://localhost:3001`)
});
