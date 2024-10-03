"use client";

import Section from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCard } from "@/features/posts/components/post-card";
import { usePosts } from "@/features/posts/hooks/use-posts";
import { CloseTo } from "@prisma/client";
import { useState } from "react";

export default function Home() {
    const [postCount, setPostCount] = useState(10);
    const [closeToFilter, setCloseToFilter] = useState<CloseTo | undefined>(
        undefined
    );
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isPending, isFetching } = usePosts(postCount, closeToFilter);

    if (isPending)
        return (
            <Section>
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full max-w-sm rounded-xl" />
                    </div>
                ))}
            </Section>
        );

    const filterOptions = [
        { label: "All", value: undefined },
        { label: "Main", value: CloseTo.main },
        { label: "West", value: CloseTo.west },
        { label: "Both Campus", value: CloseTo.both },
    ];

    function handleFilterClick(value: CloseTo | undefined) {
        setCloseToFilter(value);
        setPostCount(10); // Reset to the initial count when changing filter
    }

    // Filter the data based on the search term
    const filteredPosts = data?.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (closeToFilter === undefined || post.close_to === closeToFilter)
    );

    return (
        <Section>
            <div className="flex gap-2 mb-5">
                {filterOptions.map((option) => (
                    <Badge
                        key={option.label}
                        onClick={() => handleFilterClick(option.value)}
                        className="cursor-pointer px-4 py-2"
                        variant={
                            closeToFilter === option.value
                                ? "default"
                                : "secondary"
                        }
                    >
                        {option.label}
                    </Badge>
                ))}
            </div>

            {/* Search Input */}
            <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul className="space-y-2">
                {filteredPosts?.slice(0, postCount).map((post) => (
                    <li key={post.id}>
                        <PostCard {...post} />
                    </li>
                ))}
            </ul>

            {postCount < (filteredPosts?.length || 0) && (
                <Button
                    onClick={() => setPostCount(postCount + 10)}
                    disabled={isFetching}
                >
                    {isFetching ? "Loading..." : "Show More"}
                </Button>
            )}
        </Section>
    );
}
