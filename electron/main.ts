import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Démarrer le serveur Django en local (port 8000)
  const backendPath = path.join(__dirname, "..", "backend");
  const djangoProcess = spawn("python3", ["manage.py", "runserver"], {
    cwd: backendPath,
    shell: true,
  });

  djangoProcess.stdout.on("data", (data) => {
    console.log(`Django: ${data}`);
  });

  djangoProcess.stderr.on("data", (data) => {
    console.error(`Django Error: ${data}`);
  });

  // Attendre quelques secondes pour que le serveur soit prêt
  setTimeout(() => {
    win.loadURL("http://localhost:8000");
  }, 5000);
}

app.whenReady().then(createWindow);