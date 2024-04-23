import { WebviewWindow, appWindow } from "@tauri-apps/api/window";

export async function OpenFilePicker(nav, setNav) {
    const webview = new WebviewWindow("filePicker", {
        label: "filePicker",
        url: "/#/filePicker",
        title: "Project Selector",
        decorations: false,
        width: 500,
        center: true,
        alwaysOnTop: true,
        resizable: false,
    });

    webview.once("tauri://created", function() {
        webview.setDecorations(false);
    });

    webview.once("tauri://error", function(e) {
        webview.close();
    });

    webview.once("openProject", (e) => {
        setNav(e.payload.projPath);
    });
}