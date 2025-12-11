import { useEffect, useState } from "react";

function ScrollTopButton({ scrollOffset = 50 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(window.scrollY > scrollOffset);
        };

        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed btn circle-sm fs-bold z-1000 right-20 bottom-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2" width="20"
                    height="20"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </button>
        )
    );
}

export default ScrollTopButton;