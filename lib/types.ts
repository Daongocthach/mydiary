export type FoodItemType = {
    id: string
    name: string
    carbsWeight: number
    proteinsWeight: number
    fatsWeight: number
    calories: number
    type: string
}
export type FoodDailyItemType = {
    id: string
    name: string
    carbsWeight: number
    proteinsWeight: number
    fatsWeight: number
    calories: number
    type: string
    time: string
}
export type IntensiveType = 'inactive' | 'low' | 'medium' | 'high' | 'super'

export type GenderType = 'male' | 'female'

export type BodyDataType = {
    height: number
    weight: number
    age: number
    gender: GenderType
    intensive: IntensiveType
}
export type FoodType = 'fastfood' | 'vegetable' | 'meat' | 'drink' | 'fruit' | 'snack' | 'vegetarian' | 'sweet'

export type FoodTypesItem = {
    name: string
    icon: string
}