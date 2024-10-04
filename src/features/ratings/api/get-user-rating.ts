"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getUserRating(postId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    try {
        const post = await prisma.rating.findUnique({
            where: { id: postId, userId: userId },
        });

        if (!post) {
            return;
        }

        if (post.userId !== userId) {
            throw new Error("User is not authorized to delete this post");
        }

        revalidatePath(`/details?id=${postId}`);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}
