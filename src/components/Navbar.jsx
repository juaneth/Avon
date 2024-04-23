import { WindowControls } from "./WindowControls";

import { useState } from "react";

import BackgroundModal from "./Background";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { OpenFilePicker } from "../libs/FilePicker";
import { Navigate, useNavigate } from "react-router-dom";

export function Navbar() {
  const [nav, setNav] = useState(false);

  return (
    <div
      data-tauri-drag-region
      className='flex flex-row justify-center items-center bg-black/30 bordered-b'
    >
      {nav ? (
        <Navigate to={"/project"} state={{ path: `${nav}` }}></Navigate>
      ) : (
        <></>
      )}
      <BackgroundModal></BackgroundModal>

      <div
        data-tauri-drag-region
        className='navbar-start p-2 px-3.5 flex flex-row gap-4'
      >
        <a data-tauri-drag-region className='text-md jost font-bold'>
          AVON
        </a>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='text-sm text-white/60'>
            File
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content bg-neutral-900 bordered-all mt-3 z-[1] p-2 shadow backdrop-blur-sm rounded-md w-52'
          >
            <li>
              <a className='py-2 px-3'>New Project</a>
            </li>
            <li
              onClick={() => {
                OpenFilePicker(nav, setNav);
              }}
            >
              <a className='py-2 px-3'>Open Project</a>
            </li>

            <div className='divider py-0 my-0'></div>

            <li className='w-full'>
              <a className='py-2 px-3 flex flex-row justify-between w-full'>
                <p>Recent Projects</p>
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
              </a>
            </li>
            <div className='divider py-0 my-0'></div>
            <li
              onClick={() => {
                document.getElementById("backgroundModal").showModal();
              }}
            >
              <a className='py-2 px-3'>Change background</a>
            </li>
            <div className='divider py-0 my-0'></div>
            <li>
              <a className='py-2 px-3'>Exit</a>
            </li>
            <li>
              <a className='py-2 px-3'>About</a>
            </li>
          </ul>
        </div>

        <div className='dropdown'>
          <div tabIndex={0} role='button' className='text-sm text-white/60'>
            Settings
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content bg-neutral-900 bordered-all mt-3 z-[1] p-2 shadow backdrop-blur-sm rounded-md w-52'
          >
            <li>
              <a className='py-2 px-3'>New Project</a>
            </li>
            <li>
              <a className='py-2 px-3'>Open Project</a>
            </li>

            <div className='divider py-0 my-0'></div>

            <li className='w-full'>
              <a className='py-2 px-3 flex flex-row justify-between w-full'>
                <p>Recent Projects</p>
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
              </a>
            </li>
            <div className='divider py-0 my-0'></div>
            <li>
              <a className='py-2 px-3'>Exit</a>
            </li>
            <li>
              <a className='py-2 px-3'>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div data-tauri-drag-region className='navbar-center'></div>
      <div data-tauri-drag-region className='navbar-end'>
        <WindowControls></WindowControls>
      </div>
    </div>
  );
}
