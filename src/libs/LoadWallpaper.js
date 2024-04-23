export default function LoadWallpaper() {
    let body = document.querySelector("body");

    if (localStorage.getItem("backgroundURL")) {
        body.style.setProperty("--wallpaper", `${localStorage.getItem("backgroundURL")}`);
    }

    if (localStorage.getItem("backgroundBlur")) {
        body.style.setProperty("--blur-amount", `${localStorage.getItem("backgroundBlur")}px`);
    } else {
        localStorage.setItem("backgroundBlur", "20")

        body.style.setProperty("--blur-amount", `20px`);
    }

    if (localStorage.getItem("backgroundDim")) {
        body.style.setProperty("--dim-amount", `${localStorage.getItem("backgroundDim")}%`);
    } else {
        localStorage.setItem("backgroundDim", "75")

        body.style.setProperty("--dim-amount", `75`);
    }
}