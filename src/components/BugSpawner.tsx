import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { increasePoints, loseLife, resetGame, setGameStarted } from "../redux/gameSlice";

function getRandomPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const size = 36; // bug size in px
  const x = Math.random() * (vw - size);
  const y = Math.random() * (vh - size);
  return { x, y };
}

function getRandomTransform(x: number, y: number) {
  // Random translation for animation with minimum distance and increased speed
  const minDistance = 300; // px, minimum distance bug will travel
  const maxDistance = 500; // px, maximum distance bug will travel (increased speed)
  const size = 36;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let dx, dy, nx, ny, angle, distance;
  let tries = 0;
  do {
    angle = Math.random() * 2 * Math.PI;
    distance = minDistance + Math.random() * (maxDistance - minDistance);
    dx = Math.cos(angle) * distance;
    dy = Math.sin(angle) * distance;
    nx = x + dx;
    ny = y + dy;
    tries++;
    // Try up to 10 times to find a valid position
    if (tries > 10) break;
  } while (nx < 0 || nx > vw - size || ny < 0 || ny > vh - size);
  return `translate(${dx}px, ${dy}px)`;
}

export default function BugSpawner() {
  const dispatch = useDispatch();
  // Add timeoutId to each bug for cleanup
  const [bugList, setBugList] = useState<
    Array<{ x: number; y: number; key: number; transform: string; timeoutId: number }>
  >([]);
  const isGameStarted = useSelector((state: RootState) => state.game.isGameStarted);
  const health = useSelector((state: RootState) => state.game.health);
  const healthRef = useRef(health);
  const spawnBugRef = useRef<() => void>(() => {});
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Keep healthRef updated with latest health
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
          dispatch(loseLife());
          dispatch(resetGame());
          dispatch(setGameStarted());
        } else {
          dispatch(loseLife());
        }
        if (running) setTimeout(spawnBug, 200);
      }, 1600);
      setBugList((bugs) => [
        ...bugs,
        { x: pos.x, y: pos.y, key, transform: "none", timeoutId },
      ]);
      setTimeout(() => {
        setBugList((bugs) =>
          bugs.map((bug) =>
            bug.key === key
              ? { ...bug, transform: getRandomTransform(pos.x, pos.y) }
              : bug
          )
        );
      }, 100);
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

  // Handler for clicking a bug: remove bug and clear its timeout
  const handleBugClick = (bugKey: number) => {
    setBugList((bugs) => {
      const bug = bugs.find((b) => b.key === bugKey);
      if (bug) clearTimeout(bug.timeoutId);
      return bugs.filter((b) => b.key !== bugKey);
    });
    dispatch(increasePoints());
    setTimeout(() => {
      if (isGameStarted && spawnBugRef.current) spawnBugRef.current();
    }, 200);
  };

  return (
    <>
      {isGameStarted && isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999, // less than bug zIndex
            background: "transparent",
            pointerEvents: "auto",
            touchAction: "none", // disables scrolling/touch
          }}
        />
      )}
      {bugList.map((bug) => (
        <div
          key={bug.key}
          className="p-1"
          onClick={(e) => {
            e.stopPropagation();
            handleBugClick(bug.key);
          }}
          style={{
            position: "fixed",
            left: bug.x,
            top: bug.y,
            zIndex: 1001, // above overlay
            cursor: "pointer",
            pointerEvents: "auto",
            transition: "transform 1.5s linear",
            transform: bug.transform,
          }}
        >
          <img
            src="/bug.png"
            alt="bug"
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </>
  );
}
