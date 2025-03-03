"use client";

import Image from "next/image";
import { technologies } from "@/data/technology";
import { useState } from "react";

const SelectionCard = ({ imageUrl, label, handleClick }) => {
  return <Image src="/assets/svgs/front-end.svg" />;
};

const Technology = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12 flex justify-center bg-black relative text-white">
      <div className="w-[70%] max-1500:w-[75%] max-1200:w-[80%] max-768:w-full">
        <p className="text-[52px] leading-[57px] max-1200:text-[48px] max-1200:leading-[53px] max-1030:text-[40px] max-1030:leading-[45px] max-600:text-[35px] max-600:leading-[40px] max-420:text-[27px] max-420:leading-[32px] text-center font-bold">
          Trending Technologies
        </p>
        <p className="text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-5 md:mt-6">
          We work on the best Technologies and frameworks to deliver world-class
          solutions to our clients.
        </p>
        <div className="relative flex pt-4">
          <div className="w-[30%]">
            {technologies.map((tech, _) => (
              <div
                key={_}
                onClick={() => setActive(_)}
                className={`w-full border ${
                  active === _ ? "border-white" : "border-transparent"
                } my-3 py-[25px] cursor-pointer rounded-[10px] px-3 flex items-center justify-start gap-4 relative`}
              >
                <Image
                  src={tech.icon}
                  height={70}
                  width={70}
                  alt={tech.title}
                />
                <p
                  className={`font-bold text-[20px] leading-[25px] max-1200:text-[16px] max-1200:leading-[21px] max-1030:text-[18px] before:content-['${
                    _ + 1
                  }'] before:absolute before:right-0 before:top-0 before:text-[30px]`}
                >
                  {tech.title}
                </p>
              </div>
            ))}
          </div>
          <div className="sticky py-4 bg-[#0254a9] w-[70%] my-3 ml-3 tecnology-righ-item-main">
            <div className="">
              <p className="">{technologies[active].title}</p>
              <p>{technologies[active].subText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
