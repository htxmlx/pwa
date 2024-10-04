import { useQuery } from "@tanstack/react-query";
import { CloseTo } from "@prisma/client";
import { getPost } from "../api/get-post";

const usePost = (id: string) => {
    return useQuery({
        queryKey: [`post-${CloseTo}`],
        queryFn: () => getPost(id),
    });
};

export { usePost, getPost };
