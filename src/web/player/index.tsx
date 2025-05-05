import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../components/video";
import { Link, useParams } from "react-router-dom";
import { CatalogController } from "../../controllers";
import { Card, Space, Spin, Tabs, message } from "antd";
import Meta from "antd/es/card/Meta";
import { MainBlock } from "../../components";

interface Video {
    type: string;
    title: string;
    image?: string;
    file_path: string;
    intro_start_time?: number;
    intro_end_time?: number;
    seasons?: Array<{
        season_number: number;
        episodes: Array<{
            episode_number: number;
            title: string;
        }>;
    }>;
}

const catalogCtrl = new CatalogController();

const EpisodeCard: React.FC<{ id: any; season: any; episode: any, video: Video }> = ({ id, season, episode, video }) => (
    <Link to={`/play/${id}/season/${season}/episode/${episode.episode_number}`}>
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={video.image || "https://placehold.co/240x135"} />}
        >
            <Meta title={`Episode ${episode.episode_number}`} description={episode.title} />
        </Card>
    </Link>
);

export const Player: React.FC = () => {
    let { id, season, episode } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const res = season && episode
                        ? await catalogCtrl.getEpisode(id, season, episode)
                        : await catalogCtrl.getCatalog(id);
                    setVideo(res.data);
                } catch (error) {
                    console.error("Error fetching catalog:", error);
                    setError("Failed to load video. Please try again later.");
                    message.error("Failed to load video. Please try again later.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id, season, episode]);

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!video) {
        return <div>Video not available</div>;
    }

    return (
        <>
            {video.type === 'tvshow' ? (
                <MainBlock>
                    <Tabs
                        defaultActiveKey="1"
                        items={video.seasons?.map((season, index) => ({
                            label: `Season ${season.season_number}`,
                            key: index.toString(),
                            children: (
                                <Space size="middle" style={{ display: 'flex' }}>
                                    {season.episodes.map((episode, idx) => (
                                        <EpisodeCard key={idx} id={id} episode={episode} season={season.season_number} video={video} />
                                    ))}
                                </Space>
                            ),
                        }))}
                    />
                </MainBlock>
            ) : (
                <div className="player-container">
                    <VideoPlayer
                        src={`${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}/videos/stream/${video.file_path}`}
                        title={video.title}
                        intro_start_time={video.intro_start_time?.toString() || ""}
                        intro_end_time={video.intro_end_time?.toString() || ""}
                    />
                </div>
            )}
        </>
    );
};