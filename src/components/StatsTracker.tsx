import { FaHeart, FaHeartCrack } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { MAX_LIVES, setGameStarted } from "../redux/gameSlice";
import { IoGameController } from "react-icons/io5";
import clsx from "clsx";

function StatsTracker() {
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.game.points);
  const currentLives = useSelector((state: RootState) => state.game.health);
  const isGameStarted = useSelector((state: RootState) => state.game.isGameStarted);
  const maxLives = MAX_LIVES;
  return (
    <div
      className={clsx(
        "relative min-w-36 h-10 px-4 py-2 -mt-2 flex gap-4 justify-between items-center rounded-b-lg bg-yellow-100 text-stone-800",
        { "cursor-pointer": !isGameStarted }
      )}
      onClick={() => {
        if (!isGameStarted) {
          dispatch(setGameStarted());
        }
      }}
    >
      {isGameStarted ? (
        <>
          <div className="flex gap-1 items-center">
            {Array.from({ length: currentLives }).map((_, i) => (
              <FaHeart key={"heart-" + i} />
            ))}
            {Array.from({ length: maxLives - currentLives }).map((_, i) => (
              <FaHeartCrack key={"crack-" + i} />
            ))}
          </div>
          <p className="font-semibold">
            {points} <span className="font-light text-xs">pts</span>
          </p>
        </>
      ) : (
        <div className="m-auto flex gap-2 items-center justify-between font-semibold text-stone-800">
          <IoGameController />
          <p>viz_dugs</p>
          <IoGameController />
        </div>
      )}
    </div>
  );
}

export default StatsTracker;
