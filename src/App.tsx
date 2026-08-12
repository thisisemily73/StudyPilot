import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import ProductPreview from "./components/ProductPreview";
import EarlyAccess from "./components/EarlyAccess";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <Problem />
                <HowItWorks />
                <ProductPreview />
                <EarlyAccess />
            </main>

            <Footer />
        </>
    );
}

export default App;