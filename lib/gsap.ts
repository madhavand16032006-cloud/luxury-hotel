import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, in one place, so every animation module shares the same setup.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
