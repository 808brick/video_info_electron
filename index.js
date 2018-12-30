const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; //Declares the variable, becomes global

app.on('ready', () => {
  // console.log("App is now ready");
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`)
});

ipcMain.on('video_submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // console.log('Video Duration is: ', metadata.format.duration);
    mainWindow.webContents.send('video_duration', metadata.format.duration);
  });
});
