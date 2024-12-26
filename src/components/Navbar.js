"use client";

import { blurBase64 } from "@/data/image";
import { navData } from "@/data/navbar";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/logo/CodeMatrix.webp";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  return (
    <header className="w-full bg-black p-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={Logo}
            height={45}
            alt="codematrics"
            blurDataURL={blurBase64}
            placeholder="blur"
          />
          {/* <p>
            <span>Code</span>
            <span>Matrics</span>
          </p> */}
          <p className="text-xl font-bold ml-1">CodeMatrics</p>
        </div>
        <div>
          <ul className="flex">
            {navData.map((data, _) => {
              return (
                <li key={_}>
                  <a href={data.link}>{data.label}</a>
                  {data.subCategories && (
                    <ul className="ml-2 hidden">
                      {data.subCategories.map((subCategory, _) => (
                        <li key={_}>
                          <a href={subCategory.link}>{subCategory.label}</a>
                        </li>
                      ))}
                    </ul>
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
