import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Home from "./sections/Home";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Certification from "./sections/Certification";
import Navbar from "./components/Navbar";
import Education from "./sections/Education";

const App = () => (
  <>
    <Navbar />
    <Home />
    <Education/>
    <Experience />
    <ShowcaseSection />
    <LogoShowcase />
    <TechStack />
    <Certification />
    <FeatureCards />
    <Contact />
    <Footer />
  </>
);

export default App;
