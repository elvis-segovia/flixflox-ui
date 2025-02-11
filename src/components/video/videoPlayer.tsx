import Hls from "hls.js/dist/hls.min";
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const hls = new Hls({
            debug: true,
        });

        if (Hls.isSupported()) {
            hls.loadSource(src);
            if (videoRef.current) {
                hls.attachMedia(videoRef.current);
            }
            hls.on(Hls.Events.ERROR, (err: any) => {
                console.log(err)
            });

        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // Fallback for native HLS support (e.g., Safari)
            videoRef.current.src = src;
        }

        // Clean up Hls.js on component unmount
        return () => {
            if (hls) {
                hls.destroy();
            }
        };

    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            // fit the container size
            style={{ width: "100%", height: "100%" }}
        />
    )
}