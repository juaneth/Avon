{
  /* Layout file for project page*/
}

import AltRouteIcon from "@mui/icons-material/AltRoute";

export default function MainLayout({ config, path }) {
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
        <div className='grow'>
          {/* Widget Bar */}
          <div className='shadow-panel h-full w-min p-2 bordered-r bg-white/5 flex flex-col gap-3'>
            <div className='btn btn-square btn-ghost bordered-all'>
              <AltRouteIcon></AltRouteIcon>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
