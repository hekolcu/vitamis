export type FoodIntakeReport = {
    startDate: string | null;
    endDate: string | null;
    vitaminSummaries: {
        name: string | null;
        totalAmount: number | null;
        unit: string | null;
    }[];
};