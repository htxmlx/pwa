"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Section from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import UserReviewButton from "@/components/user-review-button";
import { usePost } from "@/features/posts/hooks/use-post";
import {
    BathIcon,
    BedIcon,
    Droplets,
    LocateIcon,
    StarIcon,
    WifiIcon,
} from "lucide-react";
import Image from "next/image";

export default function Page({
    searchParams,
}: {
    searchParams?: { id: string };
}) {
    const { data: listing, isPending, error } = usePost(searchParams?.id!);

    if (isPending) {
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
    }

    if (error) {
        return <Section>Error loading page</Section>; // Added return statement
    }

    if (!listing) {
        return <Section>No listing found.</Section>; // Handle null or undefined listing
    }

    return (
        <Section className="gap-5 flex flex-col justify-between">
            <div className="grid gap-4">
                <Carousel className="rounded-xl overflow-hidden">
                    <CarouselContent>
                        {listing.images.map((item, key) => (
                            <CarouselItem key={key}>
                                <Image
                                    src={item || "/placeholder.svg"}
                                    width={1200}
                                    height={600}
                                    alt="Listing Image"
                                    className="object-cover w-full aspect-[2/1]"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className="grid gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{listing.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <LocateIcon className="w-5 h-5" />
                        <span>{listing.address}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar className="border w-11 h-11">
                        <AvatarImage
                            src={listing.owner_image || "/placeholder-user.jpg"}
                            alt="Host"
                        />
                        <AvatarFallback>{listing.owner_name}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <div className="font-semibold">
                            Hosted by {`${listing.owner_name}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Owner Contact &middot; {`${listing.owner_contact}`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <h2 className="text-2xl font-bold">
                    This property is close to
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <span>{listing.close_to.toUpperCase()} Campus</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <h2 className="text-2xl font-bold">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <BedIcon className="w-5 h-5" />
                        <span>{listing.bedroom_no} Bedroom</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BathIcon className="w-5 h-5" />
                        <span>{listing.bathroom_no} Bathroom</span>
                    </div>

                    {listing.watersupply_available && (
                        <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5" />
                            <span>Water Supply</span>
                        </div>
                    )}

                    {listing.wifi_available && (
                        <div className="flex items-center gap-2">
                            <WifiIcon className="w-5 h-5" />
                            <span>Wifi</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="grid gap-6">
                    {listing.ratings.length > 0 ? (
                        listing.ratings.map((rating) => (
                            <div
                                key={rating.id}
                                className="flex items-start gap-4 border p-2 rounded-lg"
                            >
                                <Avatar className="border w-11 h-11">
                                    <AvatarImage
                                        src={
                                            rating.user_image ||
                                            "/placeholder-user.jpg"
                                        }
                                        alt={rating.user_name || "Reviewer"}
                                    />
                                    <AvatarFallback>
                                        {rating.user_name || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-2">
                                    {rating.user_name || "Unnamed User"}
                                    <div className="flex items-center gap-2 text-xs font-semibold">
                                        <div className="flex items-center gap-1">
                                            {Array.from(
                                                { length: 5 },
                                                (_, index) => (
                                                    <StarIcon
                                                        key={index}
                                                        className={`w-4 h-4 ${
                                                            rating.value > index
                                                                ? "fill-primary"
                                                                : "fill-muted stroke-muted-foreground"
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        {rating.review || "No review provided"}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                <UserReviewButton listing={listing} />
            </div>
        </Section>
    );
}
