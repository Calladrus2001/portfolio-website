import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa6";
import { SiLeetcode, SiDevpost } from "react-icons/si";
import { LuTerminal } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 border-t border-white/10 mt-12 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <LuTerminal className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-white text-sm">VISHESH DUGAR</p>
            <p className="text-[11px] font-mono text-slate-400">
              Built with React 19, TypeScript, Three.js & Tailwind CSS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <a
            href="https://www.linkedin.com/in/vishesh-dugar-8464341b7/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-white/10 hover:border-amber-400"
            title="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Calladrus2001"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-white/10 hover:border-amber-400"
            title="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://medium.com/@dugarvishesh"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-white/10 hover:border-amber-400"
            title="Medium"
          >
            <FaMedium className="w-4 h-4" />
          </a>
          <a
            href="https://leetcode.com/u/Calladrus_2001/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-white/10 hover:border-amber-400"
            title="LeetCode"
          >
            <SiLeetcode className="w-4 h-4" />
          </a>
          <a
            href="https://devpost.com/dugarvishesh"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-white/10 hover:border-amber-400"
            title="Devpost"
          >
            <SiDevpost className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} Vishesh Dugar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
