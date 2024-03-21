import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { WebviewWindow } from "@tauri-apps/api/window";

function OpenFilePicker() {
  const webview = new WebviewWindow("filePicker", {
    url: "/#/filePicker",
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

export default function Home() {
  return (
    <div className='grow bg-neutral-950'>
      <div className='flex flex-col gap-4 h-full justify-center items-center text-center'>
        <h1 className='text-white/50'>Project Selected!</h1>
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
