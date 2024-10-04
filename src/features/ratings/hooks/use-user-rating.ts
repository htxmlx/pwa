import { useQuery } from "@tanstack/react-query";
import { CloseTo } from "@prisma/client";
import { getUserRating } from "../api/get-user-rating";

const useUserRating = (id: string) => {
    return useQuery({
        queryKey: [`rating-${CloseTo}`],
        queryFn: () => getUserRating(id),
    });
};

export { useUserRating, getUserRating };
