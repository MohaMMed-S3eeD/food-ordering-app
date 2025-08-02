import MainHeading from "@/components/Main_Heading";
import React from "react";

const About = () => {
  return (
    <main className="section-gap">
      <div className="container">
        <MainHeading />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </div>
    </main>
  );
};

export default About;
