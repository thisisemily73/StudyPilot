import { useEffect, useState } from "react";

function Navbar() {

    const [activeSection, setActiveSection] = useState("");


    useEffect(() => {

        const sections = document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


        sections.forEach((section) => {
            observer.observe(section);
        });


        return () => observer.disconnect();

    }, []);


    return (
        <nav className="navbar">

            <a href="#" className="logo">
                StudyPilot
            </a>


            <div className="nav-links">

                <a
                    href="#problem"
                    className={activeSection === "problem" ? "active" : ""}
                >
                    Problem
                </a>

                <a
                    href="#how-it-works"
                    className={activeSection === "how-it-works" ? "active" : ""}
                >
                    How It Works
                </a>

                <a
                    href="#early-access"
                    className={activeSection === "early-access" ? "active" : ""}
                >
                    Early Access
                </a>

            </div>

        </nav>
    );
}

export default Navbar;