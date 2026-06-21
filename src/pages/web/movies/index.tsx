import React, { useEffect, useState } from "react";
import { VideoCard, HeroCard } from "../../../components/video/videoCard";
import { CatalogController } from "../../../controllers";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

const catalogCtrl = new CatalogController();

export const Movies: React.FC = () => {
    let { type } = useParams();
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        catalogCtrl.listVideosByType(type || 'movie').then((res) => {
            if(res.data.data){
                setVideos(res.data.data);
            }else{
                setVideos([]);
            }
        }).finally(() => setLoading(false));
    }, [type]);

    if (loading) {
        return (
            <div className="stream-loading">
                <Spin size="large" />
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="stream-empty">
                <div className="stream-empty-icon">🎬</div>
                <h2>Nothing here yet</h2>
                <p>Check back later for new content</p>
            </div>
        );
    }

    // Pick a random featured video for the hero
    const featured = videos[Math.floor(Math.random() * Math.min(videos.length, 5))];

    // Split videos into rows for variety
    const recentlyAdded = videos.slice(0, 10);
    const trending = [...videos].sort(() => Math.random() - 0.5).slice(0, 10);
    const allContent = videos;

    return (
        <div className="stream-catalog">
            <HeroCard video={featured} />
            <div className="stream-catalog-rows">
                <VideoCard videos={recentlyAdded} title="Recently Added" />
                {videos.length > 5 && (
                    <VideoCard videos={trending} title="Trending Now" />
                )}
                <VideoCard videos={allContent} title={type === 'tvshow' ? 'All TV Shows' : 'All Movies'} />
            </div>
        </div>
    );
}