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
      <div className='w-full flex flex-col'>
        {/* Toolbar */}
        <div className='bordered-b w-full h-12 bg-white/5 flex items-center px-3.5 shadow-panel'>
          {config && path && (
            <div className='flex flex-row items-center gap-3'>
              <h1 className='text-lg font-bold'>{config.name}</h1>
              <h2 className='text-sm'>{config.version}</h2>
              <h2 className='text-sm'>{config.type}</h2>
              <h2 className='text-sm'>{path}</h2>
            </div>
          )}
        </div>
        {/* Main Area */}
        <div className='grow flex flex-row'>
          {/* Widget Bar */}
          <div className='shadow-panel h-full w-full w-16 bordered-r bg-white/5'>
            <div className='grid-stack min-h-full' gs-column={1}>
              <Widgets.Example></Widgets.Example>
              <Widgets.Example></Widgets.Example>
            </div>
          </div>

          <div className='grid-stack grid-stack-main-area w-full min-h-full'>
            {widgets.map((Widget, index) => (
              <Widget key={index}></Widget>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
