"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type CarouselProps = {
  images: { src: string; title: string }[];
  variant?: string;
  showIndicators?: boolean;
};

const Carousel = ({ images, variant, showIndicators }: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut: any = null;

  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 2500);
    return () => clearTimeout(timeOut);
  }, [autoPlay, current]);

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className={`relative ${variant} h-[300px] w-[calc(5/12*100vw)]`}>
      <div
        className="flex h-full w-full p-4"
        onMouseEnter={() => {
          setAutoPlay(false);
          clearTimeout(timeOut);
        }}
        onMouseLeave={() => {
          setAutoPlay(true);
        }}
      >
        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                className="w-full h-full object-cover"
                src={image.src}
                alt={image.title}
                width={1312}
                height={405}
              />
            </div>
          ))}
          {showIndicators && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full cursor-pointer transition-transform duration-300 ${
                    index === current ? 'bg-white scale-150 shadow-md' : 'bg-gray-500'
                  }`}
                  onClick={() => setCurrent(index)}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
