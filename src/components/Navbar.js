"use client";

import { blurBase64 } from "@/data/image";
import { navData } from "@/data/navbar";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/logo/CodeMatrix.webp";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  return (
    <header className="w-full bg-black px-[40px] py-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={Logo}
            height={45}
            alt="codematrics"
            blurDataURL={blurBase64}
            placeholder="blur"
          />
          <p className="text-xl font-bold ml-1">CodeMatrics</p>
        </div>
        <div>
          <ul className="flex gap-6">
            {navData.map((data, _) => {
              return (
                <li key={_} className="group/main">
                  {data.subCategories ? (
                    <>
                      <p className="cursor-pointer flex items-center relative">
                        {data.label}
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="8"
                            viewBox="0 0 8 5"
                            fill="none"
                            className="ml-1 group-hover:rotate-180 transition-all duration-300"
                          >
                            <path
                              d="M1 1.396L4.03773 3.99976L7.07546 1.396"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/main:w-full"></span>
                      </p>
                      <ul className="hidden group-hover/main:block absolute p-2 shadow-lg py-6 bg-black px-5">
                        {data.subCategories.map((category, _) => (
                          <li key={_} className="group/sub py-1 relative">
                            {category.subCategories?.length ? (
                              <p className="relative font-bold cursor-pointer">
                                {category.label}
                                <ul className="hidden group-hover/sub:block absolute left-0 p-2 shadow-lg py-6 bg-black px-5">
                                  {category.subCategories.map(
                                    (subCategory, _) => (
                                      <li key={_} className="group py-1">
                                        <a
                                          href={subCategory.link}
                                          className="font-bold"
                                        >
                                          {subCategory.label}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/sub:w-full"></span>
                              </p>
                            ) : (
                              <a
                                href={category.link}
                                className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 font-bold"
                              >
                                {category.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={data.link}
                      className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300"
                    >
                      {data.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div>
            <div>
              <div></div>
            </div>
          </div>
          <div>
            <button>Contact Us</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
