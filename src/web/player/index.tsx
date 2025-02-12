import React, { useEffect } from "react";
import { VideoPlayer } from "../../components/video";
import { useParams } from "react-router-dom";
import { CatalogController } from "../../controllers";

const catalogCtrl = new CatalogController();

export const Player: React.FC = () => {
    let { id } = useParams();
    const [src, setSrc] = React.useState<any>(null);

    useEffect(() => {
        const fetchCatalog = async () => {
            if (id) {
                try {
                    const res = await catalogCtrl.getCatalog(id);
                    console.log(res);
                    setSrc(`${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}/file/${res.data.file_path}`);
                } catch (error) {
                    console.error("Error fetching catalog:", error);
                }
            }
        };
        fetchCatalog();
    }, [id]);

    return (
        src ? <VideoPlayer src={src} /> : <div>Loading...</div>
    )
}