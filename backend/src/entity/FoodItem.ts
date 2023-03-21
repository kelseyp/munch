import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class FoodItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

}
