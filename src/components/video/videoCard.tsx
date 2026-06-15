import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { PlayCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { env } from "../../env";

interface VideoCardProps {
    uuid: string;
    title: string;
    description?: string;
    bg_image?: string;
    release_year?: number;
    type?: string;
}

interface ListVideoCardProps {
    videos: VideoCardProps[];
    title?: string;
}

const getImageBg = (img: string): string => {
    return img ? `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}/videos/image/${img}` : "";
}

const SingleCard: React.FC<{ video: VideoCardProps }> = ({ video }) => {
    return (
        <Link to={`/web/play/${video.uuid}`} className="stream-card-link">
            <div className="stream-card">
                <div className="stream-card-image">
                    <img
                        alt={video.title}
                        src={`${getImageBg(video.bg_image || "")}` || "https://placehold.co/300x170/1a1a1a/666?text=No+Image"}
                        loading="lazy"
                    />
                    <div className="stream-card-overlay">
                        <PlayCircleFilled className="stream-card-play-icon" />
                    </div>
                </div>
                <div className="stream-card-info">
                    <div className="stream-card-title">{video.title}</div>
                    <div className="stream-card-meta">
                        {video.release_year && <span>{video.release_year}</span>}
                        {video.type && <span className="stream-card-badge">{video.type === 'tvshow' ? 'Series' : 'Movie'}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const HeroCard: React.FC<{ video: VideoCardProps }> = ({ video }) => {
    return (
        <div className="stream-hero" style={{
            backgroundImage: `url(${getImageBg(video.bg_image || "") || "https://placehold.co/1920x800/1a1a1a/666"})`,
        }}>
            <div className="stream-hero-gradient" />
            <div className="stream-hero-content">
                <h1 className="stream-hero-title">{video.title}</h1>
                {video.description && (
                    <p className="stream-hero-description">{video.description}</p>
                )}
                <div className="stream-hero-actions">
                    <Link to={`/web/play/${video.uuid}`} className="stream-hero-btn stream-hero-btn-play">
                        <PlayCircleFilled /> Play
                    </Link>
                    <Link to={`/web/play/${video.uuid}`} className="stream-hero-btn stream-hero-btn-info">
                        <InfoCircleOutlined /> More Info
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const ContentRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 800;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="stream-row">
            <h2 className="stream-row-title">{title}</h2>
            <div className="stream-row-container">
                <button className="stream-row-arrow stream-row-arrow-left" onClick={() => scroll('left')}>
                    ‹
                </button>
                <div className="stream-row-scroll" ref={scrollRef}>
                    {children}
                </div>
                <button className="stream-row-arrow stream-row-arrow-right" onClick={() => scroll('right')}>
                    ›
                </button>
            </div>
        </div>
    );
};

export const VideoCard: React.FC<ListVideoCardProps> = ({ videos, title }) => {
    return (
        <ContentRow title={title || "Content"}>
            {videos.map((video, index) => (
                <SingleCard key={`card-${index}`} video={video} />
            ))}
        </ContentRow>
    );
}