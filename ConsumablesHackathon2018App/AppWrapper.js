'use strict';

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';
import codePush from "react-native-code-push";
import App from './App';
import { WelcomePage } from './js/ui/WelcomePage';
import { LoginPage } from './js/ui/pages/LoginPage';
import {CartPage} from './js/ui/pages/CartPage';
import {CompareAndSavePage} from './js/ui/pages/CompareAndSavePage'
import { AmazonKitchenScanner } from './js/ui/pages/AmazonKitchenScanner';

const AppWrapper = createStackNavigator({
  HomePage: { screen: LoginPage },
  CompareAndSavePage: { screen: CompareAndSavePage }
});

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE };
AppWrapper = codePush(codePushOptions)(AppWrapper);
export {AppWrapper}
