"use client";

import { cn, formatPrice } from "@/lib/utils";
import type { Post } from "@prisma/client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
    MapRef,
    Map as MapGL,
    Marker,
    NavigationControl,
    GeolocateControl,
    Popup,
} from "react-map-gl";
import { Badge, badgeVariants } from "@/components/ui/badge";
import MapFilter from "./filter";

import "mapbox-gl/dist/mapbox-gl.css";

import { PostWithRating } from "@/features/posts/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const TOKEN =
    "pk.eyJ1IjoiYXprcml2ZW4xNiIsImEiOiJjbGhma3IxaWcxN3c3M2VyM3VhcGsxcHk3In0.pto_0eshW9NHMP-m1O_blg";

const mapStyles = {
    light: "mapbox://styles/mapbox/light-v11",
    dark: "mapbox://styles/mapbox/dark-v11",
    satellite: "mapbox://styles/mapbox/satellite-v9",
};

interface MapProps {
    data: PostWithRating[];
}

export default function Map({ data }: MapProps) {
    const { theme } = useTheme();
    const mapRef = useRef<MapRef>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [currentMapStyle, setCurrentMapStyle] = useState<string>(
        theme === "dark" ? mapStyles.dark : mapStyles.light
    );
    const [popupInfo, setPopupInfo] = useState<Post | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Retained

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const newMapStyle = theme === "dark" ? mapStyles.dark : mapStyles.light;
        setCurrentMapStyle(newMapStyle);
    }, [theme]);

    const filteredData = data.filter((item) => {
        const price = Number(item.price);
        return price >= priceRange[0] && price <= priceRange[1];
    });

    const handleStyleChange = (val: string) => {
        setCurrentMapStyle(val);
    };

    return (
        <>
            <MapFilter
                priceRange={priceRange}
                setIsDrawerOpen={setIsDrawerOpen}
                setPriceRange={setPriceRange}
                currentMapStyle={currentMapStyle}
                handleStyleChange={handleStyleChange}
            />
            <MapGL
                ref={mapRef}
                initialViewState={{
                    latitude: 11.461424460015792,
                    longitude: 123.14389088712784,
                    zoom: 12,
                    bearing: 0,
                    pitch: 0,
                }}
                mapStyle={currentMapStyle}
                mapboxAccessToken={TOKEN}
                style={{ height: "100%", width: "100%", zIndex: 10 }}
            >
                {filteredData.map((city, index) => (
                    <Marker
                        key={`marker-${index}`}
                        latitude={city.latitude}
                        longitude={city.longitude}
                        anchor="bottom"
                    >
                        <Badge
                            onClick={(e) => {
                                e.stopPropagation(); // Use stopPropagation directly on the event
                                setPopupInfo(city);
                            }}
                        >
                            {formatPrice(Number(city.price))}
                        </Badge>
                    </Marker>
                ))}

                <GeolocateControl position="top-left" />
                <NavigationControl position="top-right" />

                {popupInfo && (
                    <Popup
                        latitude={popupInfo.latitude}
                        longitude={popupInfo.longitude}
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                    >
                        <div className="text-black">
                            <Link href={`/details?id=${popupInfo.id}`}>
                                <h2>{popupInfo.address}</h2>
                                <p>
                                    <strong>Price:</strong> {popupInfo.price}
                                </p>
                            </Link>

                            <div className="flex gap-1">
                                <Link
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${popupInfo.latitude},${popupInfo.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        badgeVariants({
                                            variant: "secondary",
                                        })
                                    )}
                                >
                                    Navigate
                                </Link>
                            </div>
                        </div>
                    </Popup>
                )}
            </MapGL>
        </>
    );
}
