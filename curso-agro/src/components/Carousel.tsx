"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-56 overflow-hidden">
      <Image
        src={images[current]}
        alt="Imagem do curso"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full">
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Carousel;
