import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { OpenFilePicker } from "../libs/FilePicker";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [nav, setNav] = useState(0);

  return (
    <div className='grow'>
      {nav ? (
        <Navigate to={"/project"} state={{ path: `${nav}` }}></Navigate>
      ) : (
        <></>
      )}
      <div className='flex flex-col gap-4 h-full justify-center items-center text-center'>
        <h1 className='text-white/50'>No Project Selected</h1>
        <button
          onClick={() => {
            OpenFilePicker(nav, setNav);
          }}
          className='btn bg-white/5'
        >
          <FolderOpenIcon></FolderOpenIcon>
          Open a project
        </button>
      </div>
    </div>
  );
}
