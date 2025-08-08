import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import path from 'path';

let backend: any;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(() => {
  // Lancer le backend (si ton venv est dans backend/env/)
  const script = process.platform === 'win32' ? 'backend/env/Scripts/python' : 'backend/env/bin/python';
  backend = spawn(script, ['manage.py', 'runserver', '127.0.0.1:8000']);

  backend.stdout.on('data', data => {
    console.log(`Backend: ${data}`);
  });

  backend.stderr.on('data', data => {
    console.error(`Backend Error: ${data}`);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (backend) backend.kill();
  if (process.platform !== 'darwin') app.quit();
});