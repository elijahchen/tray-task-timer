const electron = require('electron');
const { Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
  }

  onClick(event, bounds) {
   const { x, y } = bounds; //Click event bounds
   const { height, width } = this.mainWindow.getBounds(); //Window height and width

   if(this.mainWindow.isVisible()){
     this.mainWindow.hide();
   } else {
     const yPosition  = process.platform === 'darwin' ? y : y - height;
     this.mainWindow.setBounds({
       x: x - width/2,
       y: yPosition,
       height: height,
       width: width
     });
     this.mainWindow.show();
   }
  }
}

module.exports = TimerTray;
