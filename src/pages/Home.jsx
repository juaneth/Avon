import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [nav, setNav] = useState(0);

  async function OpenFilePicker() {
    const webview = new WebviewWindow("filePicker", {
      label: "filePicker",
      url: "/#/filePicker",
      title: "Project Selector",
      decorations: false,
      width: 500,
      center: true,
      alwaysOnTop: true,
      resizable: false,
    });

    webview.once("tauri://created", function () {
      webview.setDecorations(false);
    });

    webview.once("tauri://error", function (e) {
      webview.close();
    });

    webview.once("openProject", (e) => {
      setNav(e.payload.projPath);
    });
  }

  return (
    <div className='grow bg-neutral-950'>
      {nav ? (
        <Navigate to={"/project"} state={{ path: `${nav}` }}></Navigate>
      ) : (
        <></>
      )}
      <div className='flex flex-col gap-4 h-full justify-center items-center text-center'>
        <h1 className='text-white/50'>No Project Selected</h1>
        <button
          onClick={() => {
            OpenFilePicker();
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
