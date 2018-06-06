'use strict';

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';
import App from './App';
import { WelcomePage } from './js/ui/WelcomePage';

export const AppWrapper = createStackNavigator({
  HomePage: { screen: WelcomePage },
});
