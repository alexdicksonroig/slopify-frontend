import { createNameSpacedComponent } from "../../lib/helpers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Dialog } from "./dialog";
import { Select } from "./select";
import { Popover } from "./popover";

const CarouselHOC = createNameSpacedComponent(Carousel, {
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
});

export { CarouselHOC as Carousel, Dialog, Select, Popover };
