import { ChevronUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {showScrollButton && (
        <button
          className="fixed bottom-5 right-5 p-3 bg-zinc-800 text-white rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none"
          onClick={scrollToTop}
        >
          <ChevronUpIcon size={24} />
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
