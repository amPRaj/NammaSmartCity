import {
  AboutUs,
  Brands,
  Feeds,
  Team,
  Testimonial,
} from "../components/common/page-componets";

const About = () => {
  return (
    <div className="pt-24 sm:pt-28 max-w-7xl mx-auto px-4">
     
     <Team />
      <AboutUs />
     
      {/* <Testimonial />
      <Brands />
      <Feeds /> */}
    </div>
  );
};

export default About;
