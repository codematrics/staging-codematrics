import Link from "next/link";
import { TaglineBottomArrow } from "../../assets/svgs/svg";
import React from "react";

interface Props {
  label: string;
  classes?: string;
  href?: string;
  type: "link" | "btn";
  onClick?: () => void;
  showArrow: boolean;
}

const Button: React.FC<Props> = ({
  label,
  classes,
  href,
  showArrow,
  type,
  onClick,
}) => {
  if (type === "btn") {
    return (
      <button
        onClick={onClick}
        className={`bg-white text-black border-[1.5px] hover:text-white border-white overflow-hidden py-2.5 px-6 rounded-full transition-colors duration-1000 flex items-center gap-2 relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before:left-0 before:rounded-full before:pointer-events-none before:origin-[100%_50%] before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-100 hover:before:origin-[0%_50%] max-1200:py-2 max-1030:py-[10px] ${
          classes || ""
        }`}
      >
        <span className="z-50 font-[700] flex items-center gap-2 text-[18px] max-1200:text-[16px] max-1030:text-[15px]">
          {label}
          {showArrow && <TaglineBottomArrow />}
        </span>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`bg-white text-black border-[1.5px] hover:text-white border-white overflow-hidden py-2.5 px-6 rounded-full transition-colors duration-1000 flex items-center gap-2 relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before:left-0 before:rounded-full before:pointer-events-none before:origin-[100%_50%] before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-100 hover:before:origin-[0%_50%] max-1200:py-2 max-1030:py-[10px] ${
        classes || ""
      }`}
    >
      <span className="z-50 font-[700] flex items-center gap-2 text-[18px] max-1200:text-[16px] max-1030:text-[15px]">
        {label}
        {showArrow && <TaglineBottomArrow />}
      </span>
    </Link>
  );
};

export default Button;
