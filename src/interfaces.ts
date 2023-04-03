interface IProduct {
    id: number
    name: string
    price: number
    weight: number
    section: "food" | "cleaning" 
    expirationDate: Date
}

interface ICleaningProduct extends IProduct {

}

interface IfoodProduct extends IProduct{
    calories: number
}

export{IProduct, ICleaningProduct, IfoodProduct}