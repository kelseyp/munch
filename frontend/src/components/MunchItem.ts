import { Restaurant } from "./Restaurant"

export interface MunchItem {
    id: number
    name: string
    price: number
    description: string
    restaurant: Restaurant
    image: string
}
