import React, { useEffect } from "react";
import { MainBlock } from "../../components";
import { VideoCard } from "../../components/video";
import { CatalogController } from "../../controllers";

const catalogCtrl = new CatalogController();

export const Movies: React.FC = () => {
    const [videos, setVideos] = React.useState<any[]>([]);
    useEffect(() => {
        catalogCtrl.getCatalog().then((res) => {
            setVideos(res.data);
        });
    }, []);

    return (
        <MainBlock>
            <VideoCard videos={videos} />
        </MainBlock>
    )
}