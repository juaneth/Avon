import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { invoke } from "@tauri-apps/api";

import MainLayout from "./MainLayout";

export default function Project() {
  const location = useLocation();

  const [path, setPath] = useState("");
  const [config, setConfig] = useState({
    name: "",
    version: "",
    type: "",
    id: "",
    actions: [],
  });

  useEffect(() => {
    console.log("Opening...", location.state.path);
    setPath(location.state.path);

    invoke("get_config", { inputPath: location.state.path }).then((out) => {
      setConfig(JSON.parse(out));
    });
  }, []);

  return (
    <div className='h-screen flex flex-row'>
      <MainLayout config={config} path={path}></MainLayout>
    </div>
  );
}
