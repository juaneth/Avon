import { useEffect, useState } from "react";
import { WindowControls } from "../components/WindowControls";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LaunchIcon from "@mui/icons-material/Launch";

import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { appWindow } from "@tauri-apps/api/window";
import { emit, listen } from "@tauri-apps/api/event";

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

  async function selectProject(path) {
    emit("openProject", { projPath: `${path}` });

    appWindow.close();
  }

  return (
    <div className="max-w-screen min-h-screen bg-neutral-950 text-white/90">
      <div className="fixed bottom-4 right-4">
        <div
          id="openBtn"
          className="hover:bordered-all bordered-all btn hidden rounded-md bg-neutral-900 text-white/80 transition-all hover:bg-white/10"
          onClick={() => {
            selectProject(paths[1]);
          }}
        >
          <LaunchIcon></LaunchIcon> Select
        </div>
      </div>

      <div
        data-tauri-drag-region
        className="bordered-b navbar sticky top-0 bg-neutral-900 shadow-lg shadow-black/30"
      >
        <div data-tauri-drag-region className="navbar-start">
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
            className="hover:bordered-all bordered-all btn rounded-md bg-neutral-900 p-3 text-white/80 hover:bg-white/5"
          >
            <FolderOpenIcon></FolderOpenIcon>
          </button>
        </div>
        <div data-tauri-drag-region className="navbar-center">
          <a
            data-tauri-drag-region
            className="flex flex-col text-center text-lg font-normal"
          >
            Open Project:
            <div className="w-full text-center text-sm italic opacity-75">
              {paths[1]}
            </div>
          </a>
        </div>
        <div data-tauri-drag-region className="navbar-end">
          <WindowControls></WindowControls>
        </div>
      </div>

      <div className="p-0">
        <div className="flex flex-col gap-1 p-2">
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
            className="max-w-screen word-wrap btn btn-sm flex flex-row justify-start overflow-hidden border-none bg-transparent text-start  text-sm text-white/80 hover:bg-white/5"
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
              className="max-w-screen word-wrap btn btn-sm flex flex-row justify-start overflow-hidden border-none bg-transparent text-start  text-sm text-white/80 hover:bg-white/5"
            >
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
