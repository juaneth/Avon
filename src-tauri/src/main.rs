// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

use tauri::{api::path, Manager, Window};

#[tauri::command]
async fn add_shadows(window: Window) {
  window_shadows::set_shadow(&window, true).expect("Unsupported platform!");
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

fn main() {
    tauri::Builder::default()
  .setup(|app| {
            let window = app.get_window(&"main").unwrap();
            window_shadows::set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        }).invoke_handler(tauri::generate_handler![add_shadows, get_dir])
  .run(tauri::generate_context!())
  .expect("error while running app");
}
