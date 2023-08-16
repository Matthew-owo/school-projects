import Image from "next/image";
import React from "react";

type CategoryImageProp = {
  src: string;
  alt: string;
};

const CategoryImage: React.FC<CategoryImageProp> = ({
  src,
  alt,
}) => {
  return <Image src={src} alt={alt} width={43} height={43} />;
};

export default CategoryImage;
