"use client";

import { blurBase64 } from "@/data/image";
import { navData } from "@/data/navbar";
import Image from "next/image";
import Logo from "../../public/logo/CodeMatrix.webp";

const Navbar = () => {
  return (
    <header className="w-full px-[40px] py-5">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={Logo}
            height={50}
            alt="codematrics"
            blurDataURL={blurBase64}
            placeholder="blur"
          />
          <p className="text-2xl font-bold ml-1">CodeMatrics</p>
        </div>
        <div>
          <ul className="flex gap-8">
            {navData.map((data, _) => {
              return (
                <li key={_} className="group/main">
                  {data.subCategories ? (
                    <>
                      <p className="cursor-pointer flex items-center relative font-bold">
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
                      <ul className="hidden group-hover/main:block absolute p-2 shadow-lg py-6 bg-black min-w-[250px] z-50">
                        {data.subCategories.map((category, _) => (
                          <li key={_} className="group/sub py-2">
                            {category.subCategories?.length ? (
                              <>
                                <p className="relative font-bold cursor-pointer mx-6">
                                  {category.label}
                                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/sub:w-full"></span>
                                </p>
                                <ul className="hidden group-hover/sub:block absolute left-full top-0 p-2 shadow-lg py-6 min-w-[250px] bg-black px-6 z-[51] min-h-full">
                                  {category.subCategories.map(
                                    (subCategory, _) => (
                                      <li key={_} className="py-1">
                                        <a
                                          href={subCategory.link}
                                          className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 font-bold"
                                        >
                                          {subCategory.label}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </>
                            ) : (
                              <div className="px-6">
                                <a
                                  href={category.link}
                                  className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 font-bold"
                                >
                                  {category.label}
                                </a>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={data.link}
                      className="font-bold after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300"
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
            <button className="bg-white font-semibold text-black border-[1.5px] border-white hover:bg-black hover:text-white py-3 px-6 rounded-full transition-colors duration-1000">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
