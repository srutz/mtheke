# MTheke

MTheke is a mobile app that allows you to search and watch videos from various media libraries. The libraries are provided by public broadcasters and other media companies in Germany mostly.

## MediathekWeb

The app uses the [MediathekWeb](https://mediathekviewweb.de/) for accessing the list
of available videos. The MediathekWeb is a web-based application that provides a list of available videos from various media libraries in Germany.

So most of the work is done by the MediathekWeb. The app is just a convenient way to play the content on a mobile device.


## Features

- Search and watch videos from various media libraries.
- Add videos to your favorites.
- Open-source and free to use.

## How to develop

1. **Install Dependencies**:
    ```sh
    npm install
    ```

2. **Start the Metro Bundler**:
    ```sh
    npm start
    ```

## Build locally using the Android SDK

1. **Install Dependencies**:
    ```sh
    npm install
    ```
2. **Generate the android build folder **:
    ```sh
    npm run prebuild

3. **Build the APK**:

    ```sh
    cd android
    ./gradlew assembleDebug
    ```
4. **Install the APK**:
    ```sh
    adb install -r android/app/build/outputs/apk/debug/app-debug.apk
    ```
5. **Start the app**:
    ```sh
    adb shell am start -n com.mtheke/com.mtheke.MainActivity
    ```
Alternatively just start the app on the device.

6. **Uninstall the APK**:
    ```sh
    adb uninstall com.mtheke
    ```



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Copyright Notice

© 2023 Stepan Rutz. All rights reserved.

## Contact

For any inquiries, please contact Stepan Rutz at stepan.rutz@stepanrutz.com.

