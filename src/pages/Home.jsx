import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { OpenFilePicker } from "../libs/FilePicker";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [nav, setNav] = useState(0);

  return (
    <div className="grow">
      {nav ? (
        <Navigate to={"/project"} state={{ path: `${nav}` }}></Navigate>
      ) : (
        <></>
      )}
      <div className="flex h-full items-center justify-center text-center">
        <div className="bordered-all flex flex-col gap-4 rounded-lg bg-black/80 p-8">
          <h1 className="text-lg text-white/50">No Project Opened</h1>
          <button
            onClick={() => {
              OpenFilePicker(nav, setNav);
            }}
            className="btn bg-white/5"
          >
            <FolderOpenIcon></FolderOpenIcon>
            Open a project
          </button>
        </div>
      </div>
    </div>
  );
}
