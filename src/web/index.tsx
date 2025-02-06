import React from "react";
import { WebNavbar } from "../components/navbar";
import { VideoCard } from "../components/videoCard";

export const Web: React.FC = () => {
    return (
        <WebNavbar>
            <VideoCard />
        </WebNavbar>
    )
};