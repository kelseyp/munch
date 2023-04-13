import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Restaurant } from "./Restaurant"

@Entity()
export class FoodItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("double")
    price: number

    @Column()
    description: string

    @Column()
    image: string

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodItems)
    restaurant: Restaurant
}
