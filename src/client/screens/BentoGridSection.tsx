import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { toggleGameStarted, resetGame } from "../redux/gameSlice";
import activityData from "../../data/activity.json";
import type { ActivityData } from "../../types/ActivityData";
import {
  LuFolderGit2,
  LuExternalLink,
  LuSparkles,
  LuBookOpen,
  LuCpu,
  LuGamepad2,
  LuDatabase,
  LuGlobe,
  LuCloud,
  LuTrophy,
  LuBraces,
  LuBrain,
} from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/Card";

export default function BentoGridSection() {
  const dispatch = useDispatch();
  const highScore = useSelector((state: RootState) => state.game.highScore);
  const isGameStarted = useSelector((state: RootState) => state.game.isGameStarted);

  const skillCategories = [
    {
      title: "Languages",
      subtitle: "Type-safe backends & systems scripting",
      icon: LuBraces,
      skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "C++"],
    },
    {
      title: "Cloud & DevOps (AWS)",
      subtitle: "Serverless pipelines & infrastructure as code",
      icon: LuCloud,
      skills: [
        "Lambda",
        "ECS",
        "Terraform",
        "Docker",
        "API Gateway",
        "Cognito",
        "Kinesis Firehose",
        "S3",
        "SQS",
        "AWS Glue",
        "AWS Athena",
        "GitHub Actions",
        "Localstack",
        "Datadog",
      ],
    },
    {
      title: "Databases, Caches & Search",
      subtitle: "Distributed storage, vector engines & telemetry",
      icon: LuDatabase,
      skills: [
        "Weaviate",
        "Redis",
        "PostgreSQL & RDS",
        "DynamoDB",
        "AWS Aurora",
        "MongoDB",
      ],
    },
    {
      title: "AI, LLM & Agentic Systems",
      subtitle: "Context-aware intelligence & tool calling",
      icon: LuBrain,
      skills: [
        "RAG",
        "Vector Search & Embeddings",
        "MCP (Model Context Protocol)",
        "Bedrock AgentCore",
        "Langchain",
        "Harness",
        "Context Engineering",
        "Prompt Engineering",
      ],
    },
    {
      title: "Frameworks & Full Stack",
      subtitle: "Component architecture & performant APIs",
      icon: LuCpu,
      skills: [
        "React",
        "Express.js",
        "FastAPI",
        "Redux",
        "FastMCP",
        "Tailwind CSS",
        "Three.js",
      ],
    },
  ];

  return (
    <div className="w-full space-y-12 pb-12 pt-2 font-sans">
      <section id="activity" className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <LuBookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Recent Activity
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Articles, open source contributions, and recent technical updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activityData as ActivityData[]).map((activity) => {
            return (
              <Card
                key={activity.id}
                className="flex flex-col justify-between space-y-4 group"
              >
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center justify-end gap-2">
                    {activity.links.map((linkObj) =>
                      Object.entries(linkObj).map(([platform, url]) => {
                        let Icon = LuGlobe;
                        let colorClass =
                          "text-amber-400 hover:text-amber-300 hover:border-amber-400/50";
                        if (platform === "github") {
                          Icon = FaGithub;
                          colorClass =
                            "text-slate-300 hover:text-white hover:border-white/30";
                        } else if (platform === "linkedin") {
                          Icon = FaLinkedin;
                          colorClass =
                            "text-sky-400 hover:text-sky-300 hover:border-sky-400/50";
                        } else if (platform === "Hashnode") {
                          Icon = LuGlobe;
                          colorClass =
                            "text-amber-400 hover:text-amber-300 hover:border-amber-400/50";
                        }

                        return (
                          <a
                            key={platform + url}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-xl bg-slate-900/90 border border-white/10 transition-all ${colorClass}`}
                            title={`View on ${platform}`}
                            aria-label={`View on ${platform}`}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      }),
                    )}
                  </div>

                  <p className="text-slate-200 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="projects" className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <LuFolderGit2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Key engineering projects, AI RAG systems, and dev tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-8 flex flex-col justify-between space-y-6">
            <CardHeader className="space-y-4 p-0">
              <div className="flex items-center justify-between">
                <Badge variant="amber">
                  <LuSparkles className="w-3.5 h-3.5" /> Production-Grade RAG System
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Node.js · AWS · Weaviate
                </span>
              </div>
              <CardTitle className="text-2xl font-bold">
                Paralegal — Legal Document Intelligence
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm leading-relaxed">
                Production-grade RAG system enabling legal professionals to query large
                document sets in natural language. Features a serverless ingestion
                pipeline (S3 → SQS → Lambda), a self-healing chunk-level feedback engine
                across 10 scoring categories, and full environment parity between AWS and
                local dev via Terraform + Localstack.
              </CardDescription>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Node.js",
                  "AWS Lambda",
                  "SQS",
                  "S3",
                  "Weaviate",
                  "OpenAI",
                  "Terraform",
                  "Localstack",
                  "Langchain.js",
                  "Docker",
                  "Bash",
                ].map((tag) => (
                  <Badge key={tag} variant="slate">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardFooter className="mt-2 pt-6">
              <a
                href="https://github.com/Calladrus2001/paralegal"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="amber" size="md">
                  <FaGithub className="w-4 h-4" /> View on GitHub
                </Button>
              </a>
              <a
                href="http://vishesh-dugar.hashnode.dev/dev-diaries-1-how-to-take-rag-and-aws-too-far"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary" size="md">
                  Read Article <LuExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </CardFooter>
          </Card>

          <Card
            hoverEffect={false}
            className="p-6 border-amber-500/30 bg-slate-950/80 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <LuGamepad2 className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="font-extrabold text-white text-base tracking-wide font-mono">
                    BUG HUNT ARCADE
                  </span>
                </div>
                <Badge variant="amber" className="gap-1">
                  <LuTrophy className="w-3 h-3 text-amber-400" />
                  HIGH SCORE
                </Badge>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                Test your reaction speed! Bugs spawn across your screen. Click them fast
                to squash them before they drain your health.
              </p>

              <div className="bg-slate-900/90 rounded-xl p-4 border border-amber-500/20 space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">All-Time High Score:</span>
                  <span className="font-extrabold text-amber-400 text-base">
                    {highScore} PTS
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-slate-400 font-sans text-[11px]">
                    System Status:
                  </span>
                  <span className="text-emerald-400 text-[11px] font-mono font-semibold">
                    READY TO PLAY
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Button
                variant={isGameStarted ? "danger" : "primary"}
                size="md"
                className="w-full font-mono text-xs"
                onClick={() => {
                  if (!isGameStarted) {
                    dispatch(resetGame());
                  }
                  dispatch(toggleGameStarted());
                }}
              >
                {isGameStarted ? "PAUSE BUG HUNT" : "START BUG HUNT MINIGAME 🎮"}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section id="skills" className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <LuCpu className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Technical Arsenal & Architecture
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Comprehensive skill set spanning distributed systems, cloud infrastructure, AI
            pipelines, and database optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.title}
                className="p-6 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base tracking-tight">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-normal">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skillName) => (
                      <Badge
                        key={skillName}
                        variant="slate"
                        className="transition-transform hover:scale-105 duration-150"
                      >
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
