<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
X-Ray Analizer </h1>

## Requirements

- [React Native dev environment ](https://reactnative.dev/docs/environment-setup)
- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall), required only for macOS or Linux users
- [Pnpm](https://pnpm.io/installation)
- [VS Code Editor](https://code.visualstudio.com/download) ⚠️ Make sure to install all recommended extension from `.vscode/extensions.json`

## 👋 Quick start

Clone the repo to your machine and install deps :

```sh
git clone https://github.com/user/repo-name

cd ./repo-name

pnpm install
```

To run the app on ios

```sh
pnpm ios
```

To run the app on Android

```sh
pnpm android
```

## 👨🏼‍🔧 Troubleshooting

-np versions above "^8.0.4" do not support only version param, they require patch | minor | major | prepatch | preminor | premajor | prerelease |
-expo-blur issue causes a crash in the app: https://github.com/expo/expo/issues/34499, I fixed it by using react-native-community/blur instead
-images from assets should be added in the app.config file+ run pnpm prebuild and they can pe used with import (like Image source="icon_transparent"/>). Ref: https://docs.expo.dev/develop/user-interface/assets/
