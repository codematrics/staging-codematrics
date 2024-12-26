"use client";

import Button from "@/components/common/Button";
import { services } from "./../data/services";
import React, { useState } from "react";
const Services = () => {
  const [currentService, setCurrentService] = useState(services[0]);
  return (
    <section className="w-full border-b border-t border-red py-12 px-4 sm:px-8 md:px-12">
      <p className="text-3xl sm:text-4xl md:text-5xl text-center font-bold">
        Delivering Seamless Digital Experiences with Innovation at the Core
      </p>
      <p className="text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-5 md:mt-6">
        We partner with businesses to design, develop, and deliver innovative
        web, mobile, and software solutions. <br />
        Together, we craft tailored approaches to drive growth, overcome
        challenges, and shape a sustainable digital future
      </p>

      <div className="flex flex-wrap justify-center gap-[60px] mt-10 sm:mt-12 md:mt-14">
        {services?.map((service, serviceIndex) => (
          <p
            key={serviceIndex}
            onClick={() => setCurrentService(service)}
            className="font-bold relative cursor-pointer pb-1 group transition-all duration-300"
          >
            <span className="z-10">{service?.shortName ?? ""}</span>

            <span
              className={`absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full ${
                currentService === service ? "w-full" : ""
              }`}
            ></span>
          </p>
        ))}
      </div>
      <div className="mt-10 sm:mt-12 md:mt-14"></div>
    </section>
  );
};

export default Services;
