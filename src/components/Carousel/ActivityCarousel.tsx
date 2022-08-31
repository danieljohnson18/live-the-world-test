import { ReactChild, ReactNode } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

interface CarouselProps {
  SliderContent?: any;
}
const ActivityCarousel = ({ SliderContent }: CarouselProps) => {
  return (
    <div>
      <Carousel>{SliderContent}</Carousel>
    </div>
  );
};

export default ActivityCarousel;
