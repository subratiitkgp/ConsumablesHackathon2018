'use strict';

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';
import App from './App';
import { WelcomePage } from './js/ui/WelcomePage';
import codePush from "react-native-code-push";

const AppWrapper = createStackNavigator({
  HomePage: { screen: WelcomePage },
});

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE };
AppWrapper = codePush(codePushOptions)(AppWrapper);
export {AppWrapper}
