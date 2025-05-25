import Footer from "./components/Footer";
import Intro from "./components/Intro";

function Layout() {
  return (
    <div className="min-h-screen w-full p-2 flex flex-col justify-between gap-4 bg-stone-800 text-stone-200">
      <div className="w-full flex">
        <p className="mx-auto font-semibold">viz_dugs</p>
      </div>
      <Intro />
      <Footer />
    </div>
  );
}

export default Layout;
