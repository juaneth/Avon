// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env::set_var;

use std::path::PathBuf;

use tauri::{api::path, Manager, Window};

#[tauri::command]
async fn add_shadows(window: Window) {
 let _ = window_shadows::set_shadow(&window, true);
}

#[tauri::command]
async fn get_config(input_path: String) -> String {
  let contents = std::fs::read_to_string(input_path + "/avon.json")
        .expect("Should have been able to read the file");
    contents
}

#[tauri::command]
async fn get_dir(input_path: String) -> (Vec<String>, PathBuf) {
    let mut dir = std::path::PathBuf::new();
    if input_path.len() == 0 {
        dir.push(path::home_dir().unwrap())
    } else {
        dir.push(input_path)
    }
    

    let mut file_list = Vec::new();
    for entry in std::fs::read_dir(dir.clone()).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        file_list.push(
            std::path::Path::new(&path.display().to_string())
                .file_name()
                .unwrap()
                .to_os_string()
                .into_string()
                .unwrap(),
        );
    }
    (file_list, dir)
}

#[tauri::command]
async fn select_proj(input_path: String) -> (Vec<String>, PathBuf) {
    let mut dir = std::path::PathBuf::new();

    dir.push(input_path);

    let mut file_list = Vec::new();
    for entry in std::fs::read_dir(dir.clone()).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        file_list.push(
            std::path::Path::new(&path.display().to_string())
                .file_name()
                .unwrap()
                .to_os_string()
                .into_string()
                .unwrap(),
        );
    }
    (file_list, dir)
}
fn main() {
#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "dragonfly", target_os = "openbsd", target_os = "netbsd" ))]
  set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");

    tauri::Builder::default()
  .setup(|app| {
            let _window = app.get_window(&"main").unwrap();
            //let _ = window_shadows::set_shadow(&window, true);
            Ok(())
        }).invoke_handler(tauri::generate_handler![add_shadows, get_dir, select_proj, get_config])
  .run(tauri::generate_context!())
  .expect("error while running app");
}
