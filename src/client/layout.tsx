import { lazy, Suspense } from "react";
import BugSpawner from "./components/BugSpawner";
import Navbar from "./components/Navbar";
import HeroSection from "./screens/HeroSection";
import BentoGridSection from "./screens/BentoGridSection";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

const Background3D = lazy(() => import("./components/Background3D"));

function Layout() {
  return (
    <div className="relative min-h-screen w-full bg-[#0b0d13] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      <BugSpawner />

      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex-grow space-y-6">
          <HeroSection />
          <BentoGridSection />
        </main>
        <Footer />
      </div>

      <Modal />
    </div>
  );
}

export default Layout;
