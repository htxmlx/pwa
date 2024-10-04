"use server";

import prisma from "@/lib/prisma";

export async function getPost(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                ratings: true,
            },
        });
        return post;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}
