import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { AppDataSource } from "./data-source"
import { FoodItem } from "./entity/FoodItem"

type RawFoodItem = {
    Restaurant: string
    MenuItem: string
    Price: number
    Description: string
}

const readCSV = async () => {
    const csvFilePath = path.resolve(__dirname, 'data/DatabaseItems.csv');
    const headers = ['Restaurant', 'MenuItem', 'Price', 'Description'];
    let records: RawFoodItem[] = [];

    const parser = fs.createReadStream(csvFilePath).pipe(parse({
        delimiter: ',',
        columns: headers
    }));
    for await (const record of parser) {
        console.log(JSON.stringify(record))
        records.push(record as RawFoodItem);
    }
    return records;
}

AppDataSource.initialize().then(async () => {
    await AppDataSource.manager.clear(FoodItem);
    console.log("Inserting food items into the database...")
    const rawItems = await readCSV();

    console.log("Loading food items from the database...")
    rawItems.forEach(async (rawItem) => {
        console.log(`New food item: ${rawItem.MenuItem}, ${rawItem.Price}, ${rawItem.Description}`)
        const foodItem = new FoodItem();
        foodItem.name = rawItem.MenuItem;
        foodItem.price = rawItem.Price;
        foodItem.description = rawItem.Description;
        await AppDataSource.manager.save(foodItem);
        console.log("Saved a new food with id: " + foodItem.id);
    });

    const foodItems = await AppDataSource.manager.find(FoodItem)
    console.log("Loaded food items: ", foodItems)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
