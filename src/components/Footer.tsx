import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiDevpost } from "react-icons/si";
import IconButton from "./IconButton";

function Footer() {
  return (
    <div className="w-full flex mt-8 lg:mt-0 justify-center space-x-5 text-lg">
      <IconButton
        url="https://www.linkedin.com/in/vishesh-dugar-8464341b7/"
        Icon={FaLinkedin}
      />
      <IconButton url="https://github.com/Calladrus2001" Icon={FaGithub} />
      <IconButton url="https://leetcode.com/u/Calladrus_2001/" Icon={SiLeetcode} />
      <IconButton url="https://devpost.com/dugarvishesh" Icon={SiDevpost} />
    </div>
  );
}

export default Footer;
