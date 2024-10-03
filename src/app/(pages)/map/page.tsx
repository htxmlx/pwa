"use client";

import Section from "@/components/ui/section";
import Map from "@/features/map/components/map";
import { usePosts } from "@/features/posts/hooks/use-posts";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";

export default function Page() {
    const { data, isPending, isFetching } = usePosts(100);
    if (isPending)
        return (
            <Section className="flex items-center justify-center flex-col">
                <Loader2 className="size-10 animate-spin" />
                Please wait...
            </Section>
        );
    if (data) {
        return (
            <Section className="space-y-0 py-0 h-screen">
                <Map data={data} />
            </Section>
        );
    }
}
