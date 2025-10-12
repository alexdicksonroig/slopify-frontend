import { createNameSpacedComponent } from "@/lib/helpers";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./carousel";

const CarouselHOC = createNameSpacedComponent(Carousel, {
	Content: CarouselContent,
	Item: CarouselItem,
	Previous: CarouselPrevious,
	Next: CarouselNext,
});

export { CarouselHOC as Carousel };
