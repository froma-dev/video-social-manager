import { classNamesBuilder } from "../../utils/utils";
import CarouselItem, { type CarouselItemProps } from "./CarouselItem";
import "./Carousel.css";
import { useEffect, useRef, useState } from "react";
import BasicNavigator, { Direction } from "../Navigator/BasicNavigator";

interface CarouselConfig {
  interactiveItems?: number; // Number of items to be interacted with (doesn't take into account the next partial item seen)
}

interface CarouselProps {
  data: CarouselItemProps[];
  title?: string;
  className?: string;
  children?: React.ReactNode;
  config?: CarouselConfig;
}

interface CarouselSection {
  start: number;
  end: number;
}

interface CarouselComputedValues {
  carouselStripWidth: number;
  carouselItemWidth: number;
  carouselSections: CarouselSection[];
}

const ITEM_GAP_PX = 16;
const DEFAULT_CONFIG: CarouselConfig = { interactiveItems: 4 };
const Carousel = ({
  className = "",
  data,
  title,
  config = DEFAULT_CONFIG,
}: CarouselProps) => {
  const classNames = classNamesBuilder("carousel", className);
  const refCarousel = useRef<HTMLDivElement>(null);
  const refCarouselContent = useRef<HTMLDivElement>(null);
  const [carouselComputedValues, setCarouselComputedValues] =
    useState<CarouselComputedValues>({
      carouselStripWidth: 0,
      carouselItemWidth: 0,
      carouselSections: [{ start: 0, end: 0 }],
    });
  const [currentSection, setCurrentSection] = useState(0);

  const handleCarouselStripPosition = (dir: Direction) => {
    if (dir === "previous") {
      const newSection = currentSection - 1;

      if (newSection < 0) return;
      setCurrentSection(newSection);
    } else if (dir === "next") {
      const newSection = currentSection + 1;

      if (newSection >= carouselComputedValues.carouselSections.length) return;
      setCurrentSection(newSection);
    }
  };

  // Resize Observer
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setCarouselComputedValues((prev) => {
        const carouselWidth = entry.contentRect.width;
        const interactiveItems = config?.interactiveItems || 1;
        const computedGap = ITEM_GAP_PX + ITEM_GAP_PX / 2;
        const carouselItemWidth =
          carouselWidth / interactiveItems - computedGap;
        const carouselItemWidthWithGap = carouselItemWidth + ITEM_GAP_PX;

        const sectionSize = interactiveItems * carouselItemWidthWithGap;
        const sections: CarouselSection[] = [];
        const numberOfSections = Math.ceil(data.length / interactiveItems);

        if (data.length <= interactiveItems)
          sections.push({ start: 0, end: sectionSize });
        else {
          let i = 0;
          for (; i < numberOfSections; i++) {
            const sectionStart = i * sectionSize;
            const sectionEnd = (i + 1) * sectionSize;

            sections.push({ start: sectionStart, end: sectionEnd });
          }
        }
        return {
          ...prev,
          carouselWidth: carouselWidth,
          carouselItemWidth: carouselItemWidth,
          carouselSections: sections,
        };
      });
    });

    if (refCarousel.current) observer.observe(refCarousel.current);

    return () => observer.disconnect();
  }, [refCarousel, refCarouselContent, data, config?.interactiveItems]);

  return (
    <div className={classNames} ref={refCarousel}>
      <div className="carousel__header">
        {title && <h2 className="carousel__title">{title}</h2>}
        <BasicNavigator
          onClick={handleCarouselStripPosition}
          onKeyDown={handleCarouselStripPosition}
        />
      </div>
      <div
        className="carousel__content"
        style={{
          transform: `translateX(-${carouselComputedValues.carouselSections[currentSection].start}px)`,
        }}
        ref={refCarouselContent}
      >
        {data.map((carouselItem, index) => (
          <CarouselItem
            key={carouselItem.id}
            {...carouselItem}
            className={
              index % (config?.interactiveItems || 1) === 0 ? "origin-left" : ""
            }
            style={{
              flex: `1 0 ${carouselComputedValues.carouselItemWidth}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
export { type CarouselProps, type CarouselItemProps };
