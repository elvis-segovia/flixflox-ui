import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../../components/video";
import { Link, useParams } from "react-router-dom";
import { CatalogController } from "../../../controllers";
import { Spin, message } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";

interface Video {
    id: string;
    src: string;
    type: string;
    title: string;
    image?: string;
    file_path: string;
    uuid?: string;
    release_year?: number;
    intro_start_time?: string;
    intro_end_time?: string;
    season_number?: number;
    seasons?: Array<{
        season_number: number;
        episodes: Array<{
            episode_number: number;
            title: string;
        }>;
    }>;
}

const catalogCtrl = new CatalogController();

const EpisodeCard: React.FC<{ id: any; season: any; episode: any; video: Video; isActive?: boolean }> = ({ id, season, episode, video, isActive }) => (
    <Link to={`/web/play/${id}/season/${season}/episode/${episode.episode_number}`}>
        <div className={`stream-episode-card ${isActive ? 'stream-episode-card-active' : ''}`}>
            <div className="stream-episode-thumb">
                <img alt={episode.title} src={video.image || "https://placehold.co/320x180/1a1a1a/666"} />
                <div className="stream-episode-play-overlay">
                    <PlayCircleFilled />
                </div>
                <span className="stream-episode-number">E{episode.episode_number}</span>
            </div>
            <div className="stream-episode-info">
                <div className="stream-episode-title">Episode {episode.episode_number}</div>
                <div className="stream-episode-subtitle">{episode.title}</div>
            </div>
        </div>
    </Link>
);

export const Player: React.FC = () => {
    let { id, season, episode } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [sources, setSources] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSeason, setActiveSeason] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    if (season) {
                        const res = await catalogCtrl.getEpisode(id, season)
                        setSources(res.data.map((episode: any) => ({
                            "id": episode.episode,
                            "src": `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}/videos/stream/${episode.file_path}`,
                            "intro_start_time": episode.intro_start_time || "",
                            "intro_end_time": episode.intro_end_time || "",
                            "next_episode_time": episode.next_episode_time || ""
                        })));
                    } else {
                        const res = await catalogCtrl.getCatalog(id);
                        setVideo(res.data);
                    }
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
    }, [id, season]);

    if (loading) {
        return (
            <div className="stream-loading">
                <Spin size="large" />
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="stream-empty">
                <h2>{error || "Video not available"}</h2>
            </div>
        );
    }

    return (
        <div className="stream-player-page">
            {video.type === 'tvshow' && sources.length === 0 ? (
                <>
                    {/* TV Show Hero */}
                    <div className="stream-show-hero" style={{
                        backgroundImage: `url(${video.image || ''})`,
                    }}>
                        <div className="stream-hero-gradient" />
                        <div className="stream-show-hero-content">
                            <h1>{video.title}</h1>
                            {video.release_year && <span className="stream-show-year">{video.release_year}</span>}
                        </div>
                    </div>

                    {/* Season Tabs */}
                    <div className="stream-seasons">
                        <div className="stream-season-tabs">
                            {video.seasons?.map((s, index) => (
                                <button
                                    key={index}
                                    className={`stream-season-tab ${activeSeason === index ? 'active' : ''}`}
                                    onClick={() => setActiveSeason(index)}
                                >
                                    Season {s.season_number}
                                </button>
                            ))}
                        </div>
                        <div className="stream-episodes-grid">
                            {video.seasons?.[activeSeason]?.episodes.map((ep, idx) => (
                                <EpisodeCard
                                    key={idx}
                                    id={id}
                                    episode={ep}
                                    season={video.seasons![activeSeason].season_number}
                                    video={video}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="stream-player-container">
                    <VideoPlayer
                        id={episode || "0"}
                        video={sources.length > 0 ? sources : video}
                        title={video.title}
                    />
                    {/* Episode list below player for TV shows */}
                    {video.type === 'tvshow' && video.seasons && (
                        <div className="stream-seasons" style={{ marginTop: 24 }}>
                            <div className="stream-season-tabs">
                                {video.seasons.map((s, index) => (
                                    <button
                                        key={index}
                                        className={`stream-season-tab ${(season && s.season_number === parseInt(season)) ? 'active' : activeSeason === index ? 'active' : ''}`}
                                        onClick={() => setActiveSeason(index)}
                                    >
                                        Season {s.season_number}
                                    </button>
                                ))}
                            </div>
                            <div className="stream-episodes-grid">
                                {video.seasons[season ? video.seasons.findIndex(s => s.season_number === parseInt(season)) : activeSeason]?.episodes.map((ep, idx) => (
                                    <EpisodeCard
                                        key={idx}
                                        id={id}
                                        episode={ep}
                                        season={video.seasons![season ? video.seasons!.findIndex(s => s.season_number === parseInt(season)) : activeSeason].season_number}
                                        video={video}
                                        isActive={episode ? ep.episode_number === parseInt(episode) : false}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};