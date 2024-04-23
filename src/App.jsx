import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

import LoadWallpaper from "./libs/LoadWallpaper";

function App() {
  useEffect(() => {
    LoadWallpaper();
  }, []);

  return (
    <>
      <div className='flex flex-col h-screen text-white'>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      {/* Background effects*/}
      <div className='dim fixed -top-10 -left-10 -z-10  h-[110vh] w-[110vw]'></div>
      <div className='blur-bg fixed -top-10 -left-10 -z-20  h-[110vh] w-[110vw]'></div>
    </>
  );
}

export default App;
