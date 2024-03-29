import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { AppDataSource } from "../data-source";
import { FoodItem } from "../entity/FoodItem";
import { Restaurant } from "../entity/Restaurant";

type RawRestaurant = {
    Name: string
    Address: string
    Description: string
}

type RawFoodItem = {
    Restaurant: string
    MenuItem: string
    Price: number
    Description: string
    Image : string
}

const readCSV = async <T>(filePath: string, delimeter: string = ','): Promise<T[]> => {
    let records: T[] = [];

    const parser = fs.createReadStream(filePath).pipe(parse({
        delimiter: delimeter,
        columns: true
    }));
    for await (const record of parser) {
        console.log(JSON.stringify(record))
        records.push(record as T);
    }
    return records;
}

AppDataSource.initialize().then(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.synchronize();
    let rawRestaurants = await readCSV<RawRestaurant>(path.resolve(__dirname, '../../../shared/data/DatabaseRestaurants.csv'), '|');

    for await(const rawRestaurant of rawRestaurants) {
        let restaurant = await AppDataSource.manager.findOneBy(Restaurant, {name: rawRestaurant.Name});
        if (restaurant === null) {
            console.log(`${rawRestaurant.Name} not found`)
            restaurant = new Restaurant()
            restaurant.name = rawRestaurant.Name;
            restaurant.address = rawRestaurant.Address;
            restaurant.description = rawRestaurant.Description;
            await AppDataSource.manager.save(restaurant)
        } else {
            console.log(`${restaurant.name} found`)
        }
    }

    let rawItems = await readCSV<RawFoodItem>(path.resolve(__dirname, '../../../shared/data/DatabaseItems.csv'));



    console.log("Loading food items from the database...")

    await Promise.all(rawItems.map(async (rawItem) => {
        let restaurant = await AppDataSource.manager.findOneBy(Restaurant, {name: rawItem.Restaurant});
        console.log(`New food item: ${rawItem.MenuItem}, ${rawItem.Price}, ${rawItem.Description}`)
        const foodItem = new FoodItem();
        foodItem.name = rawItem.MenuItem;
        foodItem.price = rawItem.Price;
        foodItem.description = rawItem.Description;
        foodItem.restaurant = restaurant;
        foodItem.image = rawItem.Image;
        await AppDataSource.manager.save(foodItem);
        console.log("Saved a new food with id: " + foodItem.id);
    }));

    const foodItems = await AppDataSource.manager.find(FoodItem)
    console.log("Loaded food items: ", foodItems)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
