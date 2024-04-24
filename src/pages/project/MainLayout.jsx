{
  /* Layout file for project page*/
}

import { useState, useEffect } from "react";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";

import * as Widgets from "./widgets/import";

export default function MainLayout({ config, path }) {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    let grid = GridStack.init();
  }, [widgets]);

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
          <div className='shadow-panel h-full w-min p-2 bordered-r bg-white/5 flex flex-col gap-3'>
            <Widgets.ExampleButton
              widgets={widgets}
              setWidgets={setWidgets}
            ></Widgets.ExampleButton>
          </div>

          <div className='grid-stack h-full w-full'>
            {widgets.map((Widget, index) => (
              <Widget key={index}></Widget>
            ))}

            <div className='grid-stack-item'>
              <div className='grid-stack-item-content'>Item 1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
