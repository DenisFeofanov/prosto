import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/shared/constants";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Image from "next/image";

import { useRef } from "react";

interface Props {
  photos: string[];
}

export default function BouquetCarousel({ photos }: Props) {
  const carouselRef = useRef<CarouselRef>(null);

  function goToNext() {
    carouselRef.current?.next();
  }

  function goToPrevious() {
    carouselRef.current?.prev();
  }

  const isMultiplePhotos = photos.length > 1;

  return (
    <div className="relative">
      <Carousel ref={carouselRef}>
        {photos.map(photo => (
          <Image
            key={photo}
            className="rounded-md fine-pointer:group-hover:shadow-2xl"
            src={photo}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            alt="Фото букета"
          />
        ))}
      </Carousel>

      {isMultiplePhotos && (
        <button
          className="absolute top-0 left-0 bottom-0 w-[15%] hover:bg-gradient-to-r hover:from-black/15 hover:to-transparent"
          onClick={goToPrevious}
        >
          <span className="absolute left-2 top-1/2 -translate-y-1/2">
            <LeftOutlined
              style={{
                color: "white",
                fontSize: "1.5rem",
              }}
            />
          </span>
        </button>
      )}

      {isMultiplePhotos && (
        <button
          className="absolute top-0 right-0 bottom-0 w-[15%] hover:bg-gradient-to-l hover:from-black/15 hover:to-transparent"
          onClick={goToNext}
        >
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <RightOutlined
              style={{
                color: "white",
                fontSize: "1.5rem",
              }}
            />
          </span>
        </button>
      )}
    </div>
  );
}
