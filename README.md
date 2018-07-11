# ConsumablesHackathon2018
Consumables Hackathon 2018

# Setup Instructions (MAC)
Install android studio with sdk from https://developer.android.com/studio/

Add following export commands to your bashrc / zshrc:

export ANDROID_HOME=$HOME/Library/Android/sdk

export PATH=$PATH:$ANDROID_HOME/tools

export PATH=$PATH:$ANDROID_HOME/platform-tools

brew unlink node

brew uninstall node

brew install node@8

brew link node@8 --force

brew install watchman

npm install -g react-native-cli

Open Android Studio and start the emulator / Connect your android mobile with usb debugging enabled.

Clone the project ( git clone https://github.com/subratiitkgp/ConsumablesHackathon2018.git )

Go inside ConsumablesHackathon2018App folder

npm install

react-native run-android

Open the project in Visual Studio Code and happy coding :)

# Other Links

https://facebook.github.io/react-native/docs/getting-started.html
