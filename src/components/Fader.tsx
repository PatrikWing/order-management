import { Fade } from "@mui/material";
import { ReactElement, useEffect, useRef, useState } from "react";

interface IFader {
  children: ReactElement;
  delay?: number;
  fadeDuration?: number;
}

const Fader = ({ children, delay = 0, fadeDuration = 1000 }: IFader) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <Fade in={isVisible} timeout={fadeDuration} ref={ref}>
      {children}
    </Fade>
  );
};

export default Fader;
