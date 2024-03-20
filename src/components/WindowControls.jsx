import { appWindow } from "@tauri-apps/api/window";

import CloseIcon from "@mui/icons-material/Close";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export function WindowControls() {
  return (
    <div className='absolute top-0 right-0 h-8 w-32 flex flex-row bg-neutral-950 bordered-b bordered-l rounded-bl-lg overflow-hidden'>
      <div
        onClick={() => {
          appWindow.minimize();
        }}
        className='grow h-full hover:bg-white/5 text-white/90 active:bg-white/10 transition-all flex justify-center items-center'
      >
        <HorizontalRuleIcon fontSize='extrasmall'></HorizontalRuleIcon>
      </div>
      <div
        onClick={() => {
          appWindow.toggleMaximize();
        }}
        className='grow h-full hover:bg-white/5 text-white/90 active:bg-white/10 transition-all flex justify-center items-center'
      >
        <CropSquareIcon fontSize='extrasmall'></CropSquareIcon>
      </div>
      <div
        onClick={() => {
          appWindow.close();
        }}
        className='grow h-full hover:bg-red-500/75 text-white/90 active:bg-white/10 transition-all flex justify-center items-center'
      >
        <CloseIcon fontSize='small'></CloseIcon>
      </div>
    </div>
  );
}
