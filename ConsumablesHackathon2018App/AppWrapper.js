'use strict';

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';
import codePush from "react-native-code-push";

import App from './App';
import { WelcomePage } from './js/ui/WelcomePage';
import { CartPage } from './js/ui/pages/CartPage';
import { QuantitySlider } from './js/ui/components/QuantitySlider';

const AppWrapper = createStackNavigator({
  HomePage: { screen: QuantitySlider },
  CartPage: { screen: CartPage }
});

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE };
AppWrapper = codePush(codePushOptions)(AppWrapper);
export {AppWrapper}
