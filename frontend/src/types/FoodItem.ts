export type FoodItem = {
    name: string;
    group: string;
    vitamins: {
        vitamin: string;
        unit: string;
        average: number;
        minimum: number;
        maximum: number;
    }[];
};
