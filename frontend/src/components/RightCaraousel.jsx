import { useEffect, useRef, useState } from "react";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import pic4 from "../assets/pic4.png"; 
import pic5 from "../assets/pic5.png";
import pic6 from "../assets/pic6.png";
const imageUrls = [pic1,pic2,pic3,pic4,pic5,pic6
]; 

export default function RightCarousel() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0); // persistent angle
  const speed = 0.02; // rotation speed in radians per frame

  useEffect(() => {
    const rotate = () => {
      angleRef.current += speed;
      if (containerRef.current) {
        containerRef.current.style.transform = `rotate(${angleRef.current}rad)`;
      }
      animationRef.current = requestAnimationFrame(rotate);
    };

    animationRef.current = requestAnimationFrame(rotate);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const radius = 280;
  const containerSize = 520;
  const imageSize = 150;
  const center = containerSize / 2;

  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/3 w-[420px] h-[420px] z-50">
      <div
        ref={containerRef}
        className="relative w-full h-full will-change-transform"
      >
        {imageUrls.map((url, i) => {
          const angle = (i / imageUrls.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle) + center - imageSize / 2;
          const y = radius * Math.sin(angle) + center - imageSize / 2;

          return (
            <img
              key={i}
              src={url}
              alt={`petal-${i}`}
              className="absolute rounded-full object-cover shadow-lg border-2 border-[#7D3D50]"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                top: y,
                left: x,
              }}
            />
          );
        })}

        {/* Center Circle */}
        <div
          className="absolute bg-[#7D3D50] rounded-full shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            width: "110px",
            height: "110px",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}