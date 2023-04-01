import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { AppDataSource } from "./data-source";
import { FoodItem } from "./entity/FoodItem";
import { Restaurant } from "./entity/Restaurant";
import express, { Request, Response } from "express";
import { Like } from "typeorm"
import cors from "cors"


AppDataSource.initialize().then(async () => {
//     await AppDataSource.manager.clear(FoodItem);
//     console.log("Inserting food items into the database...")
//     const rawItems = await readCSV();

//     console.log("Loading food items from the database...")
//     rawItems.forEach(async (rawItem) => {
//         console.log(`New food item: ${rawItem.MenuItem}, ${rawItem.Price}, ${rawItem.Description}`)
//         const foodItem = new FoodItem();
//         foodItem.name = rawItem.MenuItem;
//         foodItem.price = rawItem.Price;
//         foodItem.description = rawItem.Description;
//         await AppDataSource.manager.save(foodItem);
//         console.log("Saved a new food with id: " + foodItem.id);
//     });

//     const foodItems = await AppDataSource.manager.find(FoodItem)
//     console.log("Loaded food items: ", foodItems)

//     console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), async (req: Request, res: Response) => {
    console.log(req);
    return res.json(JSON.stringify(await AppDataSource.manager.find(FoodItem, {relations: {restaurant: true}})));
})

app.get('/searchbar', cors(corsOptions), async (req: Request, res: Response) => {
    console.log(req.query)
    var keyword = req.query.keyword
    console.log("test==="+keyword+"====")
    if( (keyword === null) || (keyword === '') || (keyword === undefined)){
        let data = await AppDataSource.getRepository(FoodItem).find({relations: {restaurant: true}});
        return res.json(JSON.stringify(data))
    } else{
        let data = await AppDataSource.getRepository(FoodItem).find({relations: {restaurant: true},where:{description: Like(`%${keyword}%`)}});
        return res.json(JSON.stringify(data))
    }
 })

app.listen(3001, () => {
    console.log(`[server]: Server is running at http://localhost:3001`)
});
