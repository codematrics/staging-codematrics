import { blurBase64 } from "@/data/image";
import Image from "next/image";
import Logo from "../../public/logo/CodeMatrix.webp";
const Navbar = () => {
  return (
    <nav className="w-full bg-black p-2">
      <div>
        <Image
          src={Logo}
          alt="codematrics"
          blurDataURL={blurBase64}
          placeholder="blur"
        />
      </div>
      <div>
        <ul className="flex">
          <li className="mx-2"></li>
          <li className="mx-2"></li>
        </ul>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
