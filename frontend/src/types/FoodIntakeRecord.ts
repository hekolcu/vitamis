export type FoodIntakeRecord = {
    foodIntakeId: number | null;
    userId: number | null;
    foodId: number | null;
    food: {
        name: string | null;
        category: string | null;
        vitamins: {
            name: string | null;
            average: string | null;
            unit: string | null;
        }[];
        foodId: number | null;
    };
    amount: number | null;
    date: string | null;
}