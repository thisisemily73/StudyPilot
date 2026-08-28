import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import ProductPreview from "./components/ProductPreview";
import EarlyAccess from "./components/EarlyAccess";
import Footer from "./components/Footer";
import { createElement, Fragment } from "react";

function App() {
    return createElement(
        Fragment,
        null,
        createElement(Navbar),
        createElement(
            "main",
            null,
            createElement(Hero),
            createElement(Problem),
            createElement(HowItWorks),
            createElement(ProductPreview),
            createElement(EarlyAccess),
        ),
        createElement(Footer),
    );
}

export default App;