import Nav from "../../components/landing/nav";
import Hero from "../../components/landing/hero";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Nav />
        <Hero />
      </div>
    </>
  );
};

export default Landing;
