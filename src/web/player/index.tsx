import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../components/video";
import { useParams } from "react-router-dom";
import { CatalogController } from "../../controllers";
import { Spin } from "antd";

const catalogCtrl = new CatalogController();

export const Player: React.FC = () => {
    let { id } = useParams();
    const [src, setSrc] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCatalog = async () => {
            if (id) {
                try {
                    const res = await catalogCtrl.getCatalog(id);
                    console.log(res);
                    setSrc(`${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}/videos/stream/${res.data.file_path}`);
                } catch (error) {
                    console.error("Error fetching catalog:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCatalog();
    }, [id]);

    return (
        <div className="player-container">
            {loading ? (
                <Spin
                    size="large"
                    tip="Loading video..."
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}
                />
            ) : (
                src ? <VideoPlayer src={src} /> : <div>Video not available</div>
            )}
        </div>
    )
}