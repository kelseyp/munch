import "reflect-metadata"
import { DataSource } from "typeorm"
import { FoodItem } from "./entity/FoodItem"
import { Restaurant } from "./entity/Restaurant"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "munch-dev.c3xdv2gw417p.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "munch2023!",
    database: "munch",
    synchronize: true,
    logging: true,
    entities: [FoodItem, Restaurant],
    migrations: [],
    subscribers: [],
})
