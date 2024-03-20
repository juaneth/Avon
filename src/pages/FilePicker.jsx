import { useEffect, useState } from "react";
import { WindowControls } from "../components/WindowControls";

import { invoke } from "@tauri-apps/api/tauri";

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
      setPaths(out);
    });
  }

  return (
    <div className='bg-neutral-950 min-h-screen max-w-screen text-white/90'>
      <div
        data-tauri-drag-region
        className='navbar shadow-lg shadow-black/30 sticky top-0 bordered-b bg-neutral-900'
      >
        <div data-tauri-drag-region className='navbar-start'></div>
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
