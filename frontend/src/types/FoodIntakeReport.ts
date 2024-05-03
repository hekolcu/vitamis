export type FoodIntakeReport = {
    startDate: string;
    endDate: string | null;
    vitaminSummaries: {
        name: string | null;
        totalAmount: number | null;
        unit: string | null;
    }[];
};