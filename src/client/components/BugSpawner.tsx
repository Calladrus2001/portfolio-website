import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  increasePoints,
  loseLife,
  resetGame,
  toggleGameStarted,
} from "../redux/gameSlice";
import { openModal } from "../redux/modalSlice";
import { LuCrosshair, LuGamepad2, LuX } from "react-icons/lu";
import { FaHeart, FaHeartCrack } from "react-icons/fa6";
import { Button } from "./ui/Button";

function getRandomPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const size = 60;
  const x = Math.random() * (vw - size);
  const y = Math.random() * (vh - size);
  return { x, y };
}

function getRandomDelta(x: number, y: number) {
  const minDistance = 250;
  const maxDistance = 450;
  const size = 60;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let dx = 0;
  let dy = 0;
  let nx = 0;
  let ny = 0;
  let tries = 0;

  do {
    const angle = Math.random() * 2 * Math.PI;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    dx = Math.cos(angle) * distance;
    dy = Math.sin(angle) * distance;
    nx = x + dx;
    ny = y + dy;
    tries++;
    if (tries > 10) break;
  } while (nx < 0 || nx > vw - size || ny < 0 || ny > vh - size);

  return { dx, dy };
}

interface BugItem {
  key: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  timeoutId: number;
}

interface FloatingPopup {
  id: number;
  x: number;
  y: number;
  text: string;
}

export default function BugSpawner() {
  const dispatch = useDispatch();
  const [bugList, setBugList] = useState<BugItem[]>([]);
  const [popups, setPopups] = useState<FloatingPopup[]>([]);

  const { isGameStarted, health, points } = useSelector((state: RootState) => state.game);
  const healthRef = useRef(health);
  const spawnBugRef = useRef<() => void>(() => {});

  useEffect(() => {
    healthRef.current = health;
  }, [health]);

  useEffect(() => {
    let running = true;
    function spawnBug() {
      if (!running) return;
      const pos = getRandomPosition();
      const key = Date.now() + Math.random();

      const timeoutId = window.setTimeout(() => {
        setBugList((bugs) => bugs.filter((bug) => bug.key !== key));
        const remainingLives = healthRef.current;
        if (remainingLives <= 1) {
          dispatch(
            openModal({
              header: "Game Over!",
              content: `Bugs got away! You ran out of lives. Click start to try again!`,
              isDismissible: true,
            })
          );
          dispatch(resetGame());
          dispatch(toggleGameStarted());
        } else {
          dispatch(loseLife());
        }
        if (running) setTimeout(spawnBug, 300);
      }, 1800);

      setBugList((bugs) => [
        ...bugs,
        { key, x: pos.x, y: pos.y, dx: 0, dy: 0, timeoutId },
      ]);

      setTimeout(() => {
        const delta = getRandomDelta(pos.x, pos.y);
        setBugList((bugs) =>
          bugs.map((bug) =>
            bug.key === key ? { ...bug, dx: delta.dx, dy: delta.dy } : bug
          )
        );
      }, 80);
    }

    spawnBugRef.current = spawnBug;

    if (!isGameStarted) {
      bugList.forEach((bug) => clearTimeout(bug.timeoutId));
      setBugList([]);
      return;
    }

    spawnBug();
    return () => {
      running = false;
      bugList.forEach((bug) => clearTimeout(bug.timeoutId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStarted]);

  const handleBugClick = (bugKey: number, clientX: number, clientY: number) => {
    setBugList((bugs) => {
      const bug = bugs.find((b) => b.key === bugKey);
      if (bug) clearTimeout(bug.timeoutId);
      return bugs.filter((b) => b.key !== bugKey);
    });

    const popupId = Date.now() + Math.random();
    setPopups((prev) => [...prev, { id: popupId, x: clientX, y: clientY, text: "+10 PTS!" }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 800);

    if (typeof window !== "undefined" && "vibrate" in window.navigator) {
      window.navigator.vibrate(40);
    }

    dispatch(increasePoints());

    setTimeout(() => {
      if (isGameStarted && spawnBugRef.current) spawnBugRef.current();
    }, 250);
  };

  return (
    <>
      {isGameStarted && (
        <div className="fixed inset-0 z-[999] bg-[#0b0d13]/30 backdrop-blur-[3px] pointer-events-auto touch-none" />
      )}

      {isGameStarted && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[1002] pointer-events-auto">
          <div className="glass-card rounded-2xl px-6 py-3 border border-amber-500/40 bg-slate-950/90 shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center gap-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
              <LuGamepad2 className="w-4 h-4 animate-bounce text-amber-400" />
              <span className="hidden sm:inline">BUG HUNT</span>
            </div>

            <div className="flex items-center gap-1.5 border-x border-white/10 px-4">
              {Array.from({ length: health }).map((_, i) => (
                <FaHeart key={i} className="text-red-500 w-4 h-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
              ))}
              {Array.from({ length: 3 - health }).map((_, i) => (
                <FaHeartCrack key={i} className="text-slate-600 w-4 h-4" />
              ))}
            </div>

            <div className="font-mono text-sm font-extrabold text-amber-400 tracking-wider">
              {points} <span className="text-xs text-slate-400 font-normal">PTS</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
              onClick={() => dispatch(toggleGameStarted())}
              title="Pause Game"
            >
              <LuX className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {popups.map((popup) => (
        <div
          key={popup.id}
          className="fixed font-mono font-extrabold text-amber-400 text-lg pointer-events-none z-[1005] animate-bounce drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] left-[var(--px)] top-[var(--py)]"
          style={{ "--px": `${popup.x - 20}px`, "--py": `${popup.y - 30}px` } as CSSProperties}
        >
          {popup.text}
        </div>
      ))}

      {bugList.map((bug) => (
        <div
          key={bug.key}
          className="fixed z-[1001] cursor-crosshair pointer-events-auto transition-transform duration-[1800ms] ease-linear group left-[var(--bx)] top-[var(--by)] translate-x-[var(--bdx)] translate-y-[var(--bdy)]"
          style={
            {
              "--bx": `${bug.x}px`,
              "--by": `${bug.y}px`,
              "--bdx": `${bug.dx}px`,
              "--bdy": `${bug.dy}px`,
            } as CSSProperties
          }
          onClick={(e) => {
            e.stopPropagation();
            handleBugClick(bug.key, e.clientX, e.clientY);
          }}
        >
          <div className="relative p-2 rounded-full hover:scale-125 transition-transform duration-200">
            <LuCrosshair className="absolute inset-0 m-auto w-12 h-12 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity animate-spin-slow pointer-events-none" />
            <img
              src="/bug.png"
              alt="bug"
              className="min-w-[52px] min-h-[40px] w-[56px] h-[42px] pointer-events-none select-none block drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </>
  );
}
