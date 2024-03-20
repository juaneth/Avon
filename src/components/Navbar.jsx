import { WindowControls } from "./WindowControls";

export function Navbar() {
  return (
    <div data-tauri-drag-region className='navbar bg-neutral-900'>
      <div data-tauri-drag-region className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 rounded-box w-52'
          >
            <li>
              <a>New Project</a>
            </li>
            <li>
              <a>Open Project</a>
            </li>
            <li>
              <a>Recent Projects</a>
            </li>
          </ul>
        </div>
      </div>
      <div data-tauri-drag-region className='navbar-center'>
        <a data-tauri-drag-region className='text-xl font-bold'>
          AVON
        </a>
      </div>
      <div data-tauri-drag-region className='navbar-end'>
        <WindowControls></WindowControls>
      </div>
    </div>
  );
}
