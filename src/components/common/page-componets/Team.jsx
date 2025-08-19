import { CardCarousel } from "../../ui/card-carousel";

const Team = () => {

  const teamMembers = [
    {
      src: "/images/Shiv Pf pic.jpg",
      alt: "Shivu A",
      name: "Shivu A",
      designation: "Chief Executive Officer (CEO)"
    },
    {
      src: "/images/Prof-Pic.png",
      alt: "Sofia M",
      name: "Sofia M",
      designation: "Head of People, Admin & Creative Strategy",
      className: "sofia-image"
    },
    {
      src: "/images/AKASH.png",
      alt: "Akash KM",
      name: "Akash KM",
      designation: "Head of Property Onboarding & Inventory Strategy"
    },
    {
      src: "/images/RAVI.png",
      alt: "Ravi Lingangoudru",
      name: "Ravi Lingangoudru",
      designation: "Head of Client Engagement & Lead Management"
    },
    {
      src: "/images/raj.png",
      alt: "Praveen D",
      name: "Praveen Raj",
      designation: "Head of Brand Experience & Digital Production"
    }
  ]


  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">our team</h1>
        <h1 className="heading">meet with our experienced team</h1>
      </div>
      <br />
      <div>
        <CardCarousel
          images={teamMembers}
          autoplayDelay={1000}
          showPagination={false}
          showNavigation={true}
        />
      </div>


    </div>
  );
};

export default Team;
