import { useState } from "react";

export default function BackgroundModal() {
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  function setBackground(url, file) {
    var body = document.querySelector("body");

    if (url) {
      localStorage.setItem("backgroundURL", `url(${url})`);

      body.style.setProperty("--wallpaper", `url(${url})`);
    } else if (file) {
      getBase64(file).then((base64) => {
        try {
          localStorage.setItem("backgroundURL", `url(${base64})`);

          body.style.setProperty("--wallpaper", `url(${base64})`);
        } catch {
          alert(
            "Either image file size is too large or image is corrupted.\nTry again with another image"
          );
        }
      });
    }
  }

  function setBlur(blur) {
    var body = document.querySelector("body");

    body.style.setProperty("--blur-amount", `${blur}px`);
  }

  function setDim(dim) {
    var body = document.querySelector("body");

    body.style.setProperty("--dim-amount", `${dim}%`);
  }

  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedURL, setSelectedURL] = useState(0);

  const [blurAmount, setBlurAmount] = useState(0);
  const [dimAmount, setDimAmount] = useState(0);

  return (
    <dialog id='backgroundModal' className='modal'>
      <div className='modal-box rounded-md bg-white/10 bordered-all'>
        <h1 className='text-xl font-bold'>Change Background</h1>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text text-lg'>From your files</span>
          </div>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              console.log("BBB");
            }}
            className='file:bg-white/0 file:pr-6 file:border-none file-input hover:bg-white/10 transition-all flex flex-row w-full bg-white/5 bordered-all'
          />
        </label>

        <div className='divider mb-0 mt-4'>OR</div>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text text-lg'>From URL</span>
          </div>
          <input
            placeholder='https://images.com/blah_blah_blah'
            className='input w-full bg-white/5 bordered-all'
            onChange={(e) => {
              setSelectedURL(e.target.value);
            }}
          />
        </label>
        <div className='divider mb-0 mt-4'></div>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text text-lg'>Blur</span>
            <span className='label-text-alt text-lg'>{blurAmount}px</span>
          </div>
          <input
            type='range'
            min='0'
            max='48'
            className='range'
            step='4'
            onChange={(e) => {
              setBlurAmount(e.target.value);
              setBlur(e.target.value);
            }}
          />
        </label>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text text-lg'>Dim</span>
            <span className='label-text-alt text-lg'>{dimAmount}%</span>
          </div>
          <input
            type='range'
            min='0'
            max='100'
            className='range'
            onChange={(e) => {
              setDimAmount(e.target.value);
              setDim(e.target.value);
            }}
          />
        </label>

        <div className='modal-action justify-center'>
          <form method='dialog' className='flex flex-row gap-3'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn bg-white/5 hover:bg-white/20 bordered-all hover:bordered-all'>
              Cancel
            </button>

            <button
              onClick={() => {
                setBackground(selectedURL, selectedFile);
              }}
              className='btn bg-white/5 hover:bg-white/20 bordered-all hover:bordered-all'
            >
              Set Background
            </button>
          </form>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}
