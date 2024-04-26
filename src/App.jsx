import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

import LoadWallpaper from "./libs/LoadWallpaper";

function App() {
  LoadWallpaper();

  return (
    <>
      <div className="flex h-screen flex-col text-white">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      {/* Background effects*/}
      <div className="dim fixed -left-10 -top-10 -z-10  h-[110vh] w-[110vw]"></div>
      <div className="blur-bg fixed -left-10 -top-10 -z-20  h-[110vh] w-[110vw]"></div>
    </>
  );
}

export default App;
