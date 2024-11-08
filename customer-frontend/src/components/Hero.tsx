"use client";

import Image from "next/image";

// import  Button  from "@/components/ui/Button";

const Hero = () => {

  return (
    <div className="hero w-full">
      <div className="flex-1 pt-16 pb-16 ">
        <h1 className="hero__title">
          Find, book, rent a car—quick and super easy!
        </h1>

        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <p className="">

        </p>
      </div>
      <div className="hero__image-container ">
        <div className="hero__image">
          <Image src="/assets/images/hero.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="hero__image-overlay " />
      </div>
    </div>
  );
};

export default Hero;