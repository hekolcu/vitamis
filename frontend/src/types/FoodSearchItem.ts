export type FoodSearchItem = {
    name: string | null;
    category: string | null;
    vitamins: {
        name: string | null;
        average: string | null;
        unit: string | null;
    }[];
    foodId: number | null;
};
