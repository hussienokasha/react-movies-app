import { useEffect, useState } from "react";

export function useSlidesPerPage() {
  const [slidesPerPage, setSlidesPerPage] = useState(6);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) {
        setSlidesPerPage(2);
      } else if (window.innerWidth < 768) {
        setSlidesPerPage(3);
      } else if (window.innerWidth < 1024) {
        setSlidesPerPage(4);
      } else if (window.innerWidth < 1280) {
        setSlidesPerPage(5);
      } else {
        setSlidesPerPage(6);
      }
    };

    updateSlides();

    window.addEventListener("resize", updateSlides);

    return () => {
      window.removeEventListener("resize", updateSlides);
    };
  }, []);

  return slidesPerPage;
}