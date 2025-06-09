import GridItem from "../components/GridItem";
import { LuFolderGit2 } from "react-icons/lu";
import { BsMedium } from "react-icons/bs";
import { FaChessKing } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";

const downloadResumeHandler = () => {
  const link = document.createElement("a");
  link.href = "/Vishesh-resume.pdf";
  link.download = "Vishesh-resume.pdf";
  link.click();
};

function Intro() {
  return (
    <div className="my-auto px-16 w-full flex flex-col lg:flex-row gap-16 justify-between align-middle">
      <div className="lg:max-w-1/2 flex flex-col space-y-4">
        <h4 className="font-semibold text-yellow-400">Hello 👋</h4>
        <h2 className="text-lg font-semibold tracking-wider">I'm Vishesh Dugar</h2>
        <p className="text-sm max-w-96">
          I'm a full-stack developer with a passion for building scalable, user-focused
          web applications. From crafting polished frontends to architecting efficient
          backends, I enjoy working across the stack to bring ideas to life. I focus on
          clean code, seamless user experiences, and thoughtful design in everything I
          build.
        </p>
        <button
          className="p-2 w-40 text-stone-800 font-semibold bg-yellow-100 cursor-pointer hover:bg-yellow-200"
          onClick={downloadResumeHandler}
        >
          Download Resume
        </button>
      </div>
      <div className="max-w-70 mx-auto grid grid-rows-2 grid-flow-col space-x-4 space-y-4 lg:space-x-6 lg:space-y-6 lg:mx-0">
        <GridItem
          IconProp={LuFolderGit2}
          text="My Projects"
          url="https://devpost.com/dugarvishesh"
        />
        <GridItem
          IconProp={FaChessKing}
          text="About Me"
          url="https://www.linkedin.com/in/vishesh-dugar-8464341b7/"
        />
        <GridItem
          IconProp={BsMedium}
          text="My Blog"
          url="https://medium.com/@dugarvishesh"
        />
        <GridItem
          IconProp={TiContacts}
          text="Contact Me"
          url="mailto:vdugar.official@gmail.com"
        />
      </div>
    </div>
  );
}

export default Intro;
