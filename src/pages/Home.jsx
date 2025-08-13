import {
  Counter,
  Featured,
  Projects,
} from "../components/common/page-componets";
import {
  Hero,
  Invest,
  Speciality,
} from "../components/home/home-1";
import PropertiesShowcase from "../components/properties/PropertiesShowcase";
import MarketingAgency from "../components/marketing/MarketingAgency";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Invest />
      {/* <Speciality />
      <Featured />
      <Counter />
      <Projects /> */}
      <PropertiesShowcase />
      <MarketingAgency />
    </div>
  );
};

export default Home;
