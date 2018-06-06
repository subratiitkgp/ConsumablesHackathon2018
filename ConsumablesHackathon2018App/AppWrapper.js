'use strict';

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';
import App from './App';

export const AppWrapper = createStackNavigator({
  HomePage: { screen: App },
});
