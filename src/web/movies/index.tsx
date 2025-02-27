import React, { useEffect } from "react";
import { MainBlock } from "../../components";
import { VideoCard } from "../../components/video";
import { CatalogController } from "../../controllers";
import { useParams } from "react-router-dom";

const catalogCtrl = new CatalogController();

export const Movies: React.FC = () => {
    let { type } = useParams();
    const [videos, setVideos] = React.useState<any[]>([]);
    useEffect(() => {
        catalogCtrl.listVideosByType(type || 'movies').then((res) => {
            console.log(res)
            setVideos(res.data.data);
        });
    }, [type]);

    return (
        <MainBlock>
            <VideoCard videos={videos} />
        </MainBlock>
    )
}