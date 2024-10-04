"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Post } from "@prisma/client";
import { useUserRating } from "@/features/ratings/hooks/use-user-rating";

interface UserReviewButtonProps {
    listing: Post;
}

export default function UserReviewButton({ listing }: UserReviewButtonProps) {
    const { data: userReview, isPending, error } = useUserRating(listing?.id!);

    return (
        <div>
            {userReview ? (
                <div className="flex gap-4">
                    <Link
                        className={cn(buttonVariants(), "w-full")}
                        href={`/review?id=${listing.id}&action=edit`}
                    >
                        Edit My Review
                    </Link>
                </div>
            ) : (
                <Link
                    className={cn(buttonVariants(), "w-full")}
                    href={`/review?id=${listing.id}`}
                >
                    Add a Review
                </Link>
            )}
        </div>
    );
}
