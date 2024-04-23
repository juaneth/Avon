import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { invoke } from "@tauri-apps/api";

export default function Project() {
  const location = useLocation();

  const [path, setPath] = useState("");
  const [config, setConfig] = useState("");

  useEffect(() => {
    console.log("Opening...", location.state.path);
    setPath(location.state.path);

    invoke("get_config", { inputPath: location.state.path }).then((out) => {
      setConfig(JSON.parse(out));
    });
  }, []);

  return (
    <div className='grow bg-neutral-950'>
      <div className='p-5 w-72 h-full bordered-r bg-white/'></div>
    </div>
  );
}
