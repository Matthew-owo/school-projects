"use client";
import { Button, Paper } from "@/components/@mui/material";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

function Item(props: { key: number, item: { src: string; alt: string } }) {
  return (
    <Image
      src={props.item.src}
      alt={props.item.alt}
      width={884}
      height={462}
    />
  );
}

const PromotionCarousel = () => {
  const promotions = [
    {
      src: "/promotion/01.jpg",
      alt: "Promotion 1"
    },
    {
      src: "/promotion/02.jpg",
      alt: "Promotion 2"
    },
    {
      src: "/promotion/03.jpg",
      alt: "Promotion 3"
    },
    {
      src: "/promotion/04.jpg",
      alt: "Promotion 4"
    },
    {
      src: "/promotion/05.jpg",
      alt: "Promotion 5"
    },
  ];
  return (
    <Carousel animation="slide" duration={900}>
      {promotions.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default PromotionCarousel;
