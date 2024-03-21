import { useEffect, useState } from "react";
import { WindowControls } from "../components/WindowControls";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LaunchIcon from "@mui/icons-material/Launch";

import { invoke } from "@tauri-apps/api/tauri";

import { open } from "@tauri-apps/api/dialog";

function OpenProject(projectPath) {
  const webview = new WebviewWindow("filePicker", {
    url: "/#/project",
    title: "Project Selector",
    label: "projectSelector",
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
}

export default function FilePicker() {
  const [paths, setPaths] = useState([[], ""]);

  useEffect(() => {
    invoke("add_shadows");

    invoke("get_dir", { inputPath: "" }).then((out) => {
      setPaths(out);
    });
  }, []);

  function moveDir(path) {
    invoke("get_dir", { inputPath: path }).then((out) => {
      document.getElementById("openBtn").classList.add("hidden");

      setPaths(out);

      if (out[0].includes("avon.json")) {
        console.log("Avon Config Found!");

        document.getElementById("openBtn").classList.remove("hidden");
      }
    });
  }

  return (
    <div className='bg-neutral-950 min-h-screen max-w-screen text-white/90'>
      <div className='fixed bottom-4 right-4'>
        <div
          id='openBtn'
          className='btn bg-neutral-900 hover:bg-white/10 rounded-md hover:bordered-all bordered-all text-white/80 transition-all hidden'
          onClick={() => {}}
        >
          <LaunchIcon></LaunchIcon> Select
        </div>
      </div>

      <div
        data-tauri-drag-region
        className='navbar shadow-lg shadow-black/30 sticky top-0 bordered-b bg-neutral-900'
      >
        <div data-tauri-drag-region className='navbar-start'>
          <button
            onClick={async () => {
              const selected = await open({
                directory: true,
                multiple: false,
              });

              if (selected === null) {
                // user cancelled the selection
              } else {
                moveDir(selected);
              }
            }}
            className='btn p-3 bg-neutral-900 hover:bg-white/5 rounded-md hover:bordered-all bordered-all text-white/80'
          >
            <FolderOpenIcon></FolderOpenIcon>
          </button>
        </div>
        <div data-tauri-drag-region className='navbar-center'>
          <a
            data-tauri-drag-region
            className='text-lg font-normal text-center flex flex-col'
          >
            Open Project:
            <div className='text-sm opacity-75 italic w-full text-center'>
              {paths[1]}
            </div>
          </a>
        </div>
        <div data-tauri-drag-region className='navbar-end'>
          <WindowControls></WindowControls>
        </div>
      </div>

      <div className='p-0'>
        <div className='p-2 flex flex-col gap-1'>
          <div
            onClick={() => {
              let path = paths[1].replaceAll("\\", "/").split("/");

              path.pop();

              if (path.length == 1) {
                path = path.concat("/").join("");
              } else {
                path = path.join("/");
              }

              moveDir(path);
            }}
            className='flex flex-row max-w-screen overflow-hidden btn btn-sm justify-start bg-transparent hover:bg-white/5 text-white/80 text-sm  border-none text-start word-wrap'
          >
            {".."}
          </div>
          {paths[0].map((file, index) => (
            <div
              key={index}
              onClick={() => {
                let path = paths[1].replaceAll("\\", "/").split("/");
                path = path.concat(`${file}`).join("/");

                moveDir(path);
              }}
              className='flex flex-row max-w-screen overflow-hidden btn btn-sm justify-start bg-transparent hover:bg-white/5 text-white/80 text-sm  border-none text-start word-wrap'
            >
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
