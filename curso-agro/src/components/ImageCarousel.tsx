"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ImageCarousel = ({ images = [] }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return <p className="text-gray-500 text-center">Nenhuma imagem disponível.</p>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      loop
      className="rounded-lg overflow-hidden"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Imagem ${index + 1}`}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
