import { useState, useRef, useEffect } from "react";

export default function VideoSlider() {
    const videos = ["./video1.mp4", "./video2.mp4", "./video3.mp4"];
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.src = videos[currentVideo];
        video.currentTime = 0;
        video.play().catch(() => { });
    }, [currentVideo]);

    const handleEnded = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    return (
        <div className="video-slider">
            <div className="video-slide">
                <video
                    key={0}
                    ref={videoRef}
                    className="slider-video"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleEnded}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
