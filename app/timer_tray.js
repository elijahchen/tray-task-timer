const electron = require('electron');
const { Tray } = electron;

class TimerTray = extends Tray {
  construcrtor(iconPath) {
    super(iconPath);
    
  }
}

module.exports = TimerTray;
