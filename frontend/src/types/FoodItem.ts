export type FoodItem = {
    name: string;
    id: string;
    group: string;
    vitamins: {
        vitamin: string;
        unit: string;
        average: number;
        minimum: number;
        maximum: number;
    }[];
};
