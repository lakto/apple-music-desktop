const path = require('path');

module.exports = {
  'packagerConfig': {
    'asar': true,
    'executableName': 'apple-music-desktop',
    'productName': 'Apple Music Desktop',
    'icon': path.resolve(__dirname, 'images', 'icon'),
  },
  'rebuildConfig': {},
  'makers': [
    {
      'name': '@electron-forge/maker-squirrel',
      'config': {
        'iconUrl': 'https://raw.githubusercontent.com/lakto/apple-music-desktop/refs/heads/main/images/AppleMusic.ico',
        'setupIcon': './images/icon.ico'
      },
    },
    {
      'name': '@electron-forge/maker-deb',
      'config': {
        'options': {
          'productName': 'Apple Music Desktop',
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
          'name': 'apple-music-desktop'
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
