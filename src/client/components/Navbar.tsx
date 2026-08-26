import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { toggleGameStarted, resetGame } from "../redux/gameSlice";
import { FaGamepad, FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuTerminal, LuFileText } from "react-icons/lu";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export default function Navbar() {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: RootState) => state.game.isGameStarted);

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl border border-white/10">
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-extrabold shadow-lg shadow-amber-500/20">
            <LuTerminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wide text-white font-sans">
                VISHESH DUGAR
              </span>
              <Badge variant="emerald" ping>
                Available
              </Badge>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-wider hidden sm:block">
              FULL STACK & SYSTEM ARCHITECT
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md px-1">
            About
          </a>
          <a href="#activity" className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md px-1">
            Activity
          </a>
          <a href="#projects" className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md px-1">
            Projects
          </a>
          <a href="#skills" className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md px-1">
            Skills
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant={isGameStarted ? "amber" : "outline"}
            size="sm"
            onClick={() => {
              if (!isGameStarted) {
                dispatch(resetGame());
              }
              dispatch(toggleGameStarted());
            }}
            title={isGameStarted ? "Click to Pause Game" : "Click to Start Bug Squashing Game!"}
          >
            <FaGamepad className={`w-4 h-4 ${isGameStarted ? "animate-bounce" : "text-amber-400"}`} />
            <span className="hidden sm:inline">
              {isGameStarted ? "Pause Game" : "Bug Hunt Minigame"}
            </span>
          </Button>

          <a 
            href={__HAS_RESUME_PDF__ ? "/Vishesh_Resume.pdf" : "/Vishesh_Resume.docx"} 
            download={__HAS_RESUME_PDF__ ? "Vishesh_Resume.pdf" : "Vishesh_Resume.docx"}
          >
            <Button variant="primary" size="sm">
              <LuFileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </a>

          <div className="hidden lg:flex items-center gap-2 text-slate-400 border-l border-white/10 pl-3">
            <a
              href="https://github.com/Calladrus2001"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400 outline-none"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/vishesh-dugar-8464341b7/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400 outline-none"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
