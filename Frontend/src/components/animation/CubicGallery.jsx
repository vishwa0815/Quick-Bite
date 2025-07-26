import { useEffect, useRef, useState } from "react";

// Constants
const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const CubicGallery = ({ imageData }) => {
    const galleryRef = useRef(null);
    const animationIdRef = useRef(0);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    let mouseX = 0, mouseY = 0;
    let angleX = 0, angleY = 0;

    useEffect(() => {
        if (imageData.length === 0) return;

        const items = galleryRef.current.children;
        const cellSize = ITEM_SIZE + ITEM_DISTANCE;
        const cubeSize = cellSize * FACE_SIZE;
        const origin = -cubeSize * 0.5 + cellSize * 0.5;
        let count = 0;

        const buildFace = (faceId) => {
            for (let i = 0; i < FACE_SIZE; i++) {
                for (let j = 0; j < FACE_SIZE; j++) {
                    const item = items[count++];
                    const x = j * cellSize + origin;
                    const y = i * cellSize + origin;
                    const z = cubeSize * 0.5;

                    let transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`;

                    switch (faceId) {
                        case 1: transform = `rotateY(180deg) ${transform}`; break;
                        case 2: transform = `rotateY(-90deg) ${transform}`; break;
                        case 3: transform = `rotateY(90deg) ${transform}`; break;
                        case 4: transform = `rotateX(90deg) ${transform}`; break;
                        case 5: transform = `rotateX(-90deg) ${transform}`; break;
                    }

                    item.style.transform = transform;
                }
            }
        };

        for (let i = 0; i < 6; i++) buildFace(i);

        angleX = angleY = mouseX = mouseY = 0;

        document.body.onmousemove = (e) => {
            mouseX = -((e.clientX / window.innerWidth) - 0.5) * 1.25;
            mouseY = ((e.clientY / window.innerHeight) - 0.5) * 1.25;
        };

        const animate = () => {
            angleX += mouseX;
            angleY += mouseY;
            galleryRef.current.style.transform = `translateZ(-1200px) rotateY(${angleX}deg) rotateX(${angleY}deg)`;
            animationIdRef.current = requestAnimationFrame(animate);
        };

        cancelAnimationFrame(animationIdRef.current);
        animate();

        return () => cancelAnimationFrame(animationIdRef.current);
    }, [imageData]);

    const openFullscreen = (url) => {
        setFullscreenImage(url);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen is open
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    return (
        <div className="container my-4 relative">
            {/* Colorful background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float2"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>
            </div>

            <div className="cubic-gallery" ref={galleryRef}>
                {imageData.map((url, idx) => (
                    <div
                        key={idx}
                        className="cubic-gallery-item transition-all duration-300 hover:scale-110 hover:shadow-xl hover:z-10 cursor-pointer"
                        style={{ 
                            backgroundImage: `url(${url})`,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                        onClick={() => openFullscreen(url)}
                    />
                ))}
            </div>
            
            {/* Fullscreen Image Viewer */}
            {fullscreenImage && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            src={fullscreenImage} 
                            alt="Fullscreen view" 
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={closeFullscreen}
                            className="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition-colors duration-200 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                            aria-label="Close fullscreen"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(20px, 20px) rotate(5deg); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-20px, -20px) rotate(-5deg); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(10px, -10px) rotate(3deg); }
                }
                .animate-float1 { animation: float1 8s ease-in-out infinite; }
                .animate-float2 { animation: float2 10s ease-in-out infinite; }
                .animate-float3 { animation: float3 12s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default CubicGallery;