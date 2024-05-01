export type FoodItem = {
    name: string;
    category: string;
    vitamins: {
        name: string;
        unit: string;
        average: number;
        minimum: number;
        maximum: number;
    }[];
};
