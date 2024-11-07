const path = require('path');

module.exports = {
  'packagerConfig': {
    'asar': true,
    'executableName': 'youtube-desktop',
    'productName': 'YouTube Desktop',
    'icon': path.resolve(__dirname, 'images', 'icon'),
  },
  'rebuildConfig': {},
  'makers': [
    {
      'name': '@electron-forge/maker-squirrel',
      'config': {
        'iconUrl': 'https://raw.githubusercontent.com/lakto/youtube-desktop/refs/heads/main/images/YouTube.ico',
        'setupIcon': './images/icon.ico'
      },
    },
    {
      'name': '@electron-forge/maker-deb',
      'config': {
        'options': {
          'productName': 'YouTube Desktop',
          'icon': path.resolve(__dirname, 'images', 'icon.png')
        }
      }
    },
    {
      'name': '@electron-forge/maker-zip',
      'platforms': ['darwin'],
    }
  ],
  'publishers': [
    {
      'name': '@electron-forge/publisher-github',
      'config': {
        'repository': {
          'owner': 'lakto',
          'name': 'youtube-desktop'
        }
      }
    }
  ],
  'plugins': [
    {
      'name': '@electron-forge/plugin-auto-unpack-natives',
      'config': {},
    },
  ],
};
