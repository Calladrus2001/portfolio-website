import BugSpawner from "./components/BugSpawner";
import Footer from "./components/Footer";
import Intro from "./screens/Intro";
import StatsTracker from "./components/StatsTracker";
import Modal from "./components/Modal";

function Layout() {
  return (
    <div className="min-h-screen w-full p-2 flex flex-col justify-between gap-4 bg-stone-800 text-stone-200 select-none">
      <div className="w-full flex">
        <BugSpawner />
        <div className="mx-auto">
          <StatsTracker />
        </div>
      </div>
      <Intro />
      <Modal />
      <Footer />
    </div>
  );
}

export default Layout;
