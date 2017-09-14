const electron = require('electron');
const path = require('path');
const TimerTray = require(./app/timer_tray);

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath);
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();

    if(mainWindow.isVisible()){
      mainWindow.hide();
    } else {
      const yPosition  = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: x - width/2,
        y: yPosition,
        height: height,
        width: width
      });
      mainWindow.show();
    }
  });
});
