import { useEffect, useRef, useState } from "react";

function Reveal({ children }: { children: React.ReactNode }) {

    const ref = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);


    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setVisible(true);

                    observer.disconnect();
                }

            },
            {
                threshold: 0.15,
            }
        );


        if (ref.current) {
            observer.observe(ref.current);
        }


        return () => observer.disconnect();

    }, []);


    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "visible" : ""}`}
        >
            {children}
        </div>
    );
}

export default Reveal;