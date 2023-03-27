import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { FoodItem } from "./FoodItem"

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: number

    @Column()
    description?: string

    @OneToMany(() => FoodItem, (foodItem) => foodItem.restaurant)
    foodItems: FoodItem[]
}