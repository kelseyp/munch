import "reflect-metadata"
import { DataSource } from "typeorm"
import { FoodItem } from "./entity/FoodItem"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "54.237.150.71",
    // port: 3306,
    username: "root",
    password: "123456",
    database: "munch_md",
    synchronize: true,
    logging: true,
    entities: [FoodItem],
    migrations: [],
    subscribers: [],
})
