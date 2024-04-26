{
  /* Layout file for project page*/
}

import { useState, useEffect } from "react";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/gridstack-extra.min.css";

import * as Widgets from "./widgets/import";

export default function MainLayout({ config, path }) {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    let grids = GridStack.initAll({
      acceptWidgets: true,
      column: "auto",
      columnOpts: {
        columnWidth: 300,
        columnMax: 6,
        layout: "compact",
      },
    });

    let mainArea = document.querySelector(".grid-stack-main-area").gridstack;
  });

  return (
    <>
      <div className="flex w-full flex-col">
        {/* Toolbar */}
        <div className="bordered-b shadow-panel flex h-12 w-full items-center bg-white/5 px-3.5">
          {config && path && (
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-lg font-bold">{config.name}</h1>
              <h2 className="text-sm">{config.version}</h2>
              <h2 className="text-sm">{config.type}</h2>
              <h2 className="text-sm">{path}</h2>
            </div>
          )}
        </div>
        {/* Main Area */}
        <div className="flex grow flex-row">
          {/* Widget Bar */}
          <div className="shadow-panel bordered-r h-full w-16 w-full bg-white/5">
            <div className="grid-stack min-h-full" gs-column={1}>
              <Widgets.Example></Widgets.Example>
              <Widgets.Example></Widgets.Example>
            </div>
          </div>

          <div className="grid-stack grid-stack-main-area min-h-full w-full">
            {widgets.map((Widget, index) => (
              <Widget key={index}></Widget>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
