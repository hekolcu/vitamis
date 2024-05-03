export type PendingFood = {
    name: string;
    category: string;
    foodId: number;
    vitamins: {
        name: string;
        average: string;
        maximum: string;
        minimum: string;
        unit: string;
        }[];
}