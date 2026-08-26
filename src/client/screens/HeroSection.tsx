import {
  LuDownload,
  LuArrowDownRight,
  LuSparkles,
  LuBrain,
  LuServer,
  LuCode,
  LuAward,
} from "react-icons/lu";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";

export default function HeroSection() {
  return (
    <section id="about" className="relative pt-6 pb-2 w-full">
      <Card hoverEffect={false} className="p-8 sm:p-12 border-white/10 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="amber">
                <LuSparkles className="w-3.5 h-3.5 text-amber-400" /> Software Engineer @
                ION Group
              </Badge>
              <Badge variant="slate">
                <LuBrain className="w-3.5 h-3.5 text-amber-400" /> Distributed Systems &
                RAG
              </Badge>
              <Badge variant="slate">
                <LuServer className="w-3.5 h-3.5 text-amber-400" /> AWS & Event-Driven
                Architecture
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-amber-400 font-mono text-sm font-semibold tracking-wider uppercase">
                Hello World, I'm Vishesh Dugar 👋
              </h4>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Building <span className="text-gradient-amber">Production Systems</span>{" "}
                That Scale.
              </h1>
            </div>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Software Engineer at ION Group with a track record of high-impact,
              production-grade work — from scaling Redis clusters to save $64.5K/yr and
              migrating monolithic platforms to AWS with zero downtime, to shipping a
              serverless RAG pipeline, a full RBAC system covering 80K+ users, and winning
              5 hackathons. I build systems that are fast, fault-tolerant, and built to
              last.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href={__HAS_RESUME_PDF__ ? "/Vishesh_Resume.pdf" : "/Vishesh_Resume.docx"} 
                download={__HAS_RESUME_PDF__ ? "Vishesh_Resume.pdf" : "Vishesh_Resume.docx"}
              >
                <Button variant="primary" size="lg">
                  <LuDownload className="w-4 h-4 stroke-[2.5]" />
                  Download Resume
                </Button>
              </a>

              <a href="#projects">
                <Button variant="ghost" size="lg">
                  Explore Projects <LuArrowDownRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-xl">
              <div>
                <p className="text-2xl font-extrabold text-amber-400 font-mono">$64.5K</p>
                <p className="text-xs text-slate-400 font-sans">
                  Annual infra savings (Redis)
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white font-mono">80K+</p>
                <p className="text-xs text-slate-400 font-sans">Users on RBAC system</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white font-mono">5x</p>
                <p className="text-xs text-slate-400 font-sans">MLH Hackathon Winner</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <Card
              hoverEffect={false}
              className="p-6 border-amber-500/20 bg-slate-950/70 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-amber-400/90 flex items-center gap-1">
                  <LuCode className="w-3.5 h-3.5" /> vishesh.config.ts
                </span>
              </div>

              <div className="font-mono text-xs text-slate-300 space-y-2.5 leading-relaxed">
                <p className="text-slate-500">// Engineering Profile</p>
                <p>
                  <span className="text-amber-400">const</span> engineer = &#123;
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-400">"Vishesh Dugar"</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-emerald-400">"Software Engineer"</span>,
                </p>
                <p className="pl-4">
                  company: <span className="text-emerald-400">"ION Group"</span>,
                </p>
                <p className="pl-4">stack: [</p>
                <p className="pl-8 text-yellow-300">"TypeScript", "Node.js",</p>
                <p className="pl-8 text-yellow-300">"AWS", "Python", "React"</p>
                <p className="pl-4">],</p>
                <p className="pl-4">certs: [</p>
                <p className="pl-8 text-sky-300">"AWS Solutions Architect",</p>
                <p className="pl-8 text-sky-300">"AWS Cloud Practitioner"</p>
                <p className="pl-4">],</p>
                <p className="pl-4">
                  status:{" "}
                  <span className="text-emerald-400">"Open to Opportunities"</span>
                </p>
                <p>&#125;;</p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <LuAward className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <p className="text-[11px] font-mono text-slate-400">
                  2× AWS Certified · Valid through May 2027
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </section>
  );
}
