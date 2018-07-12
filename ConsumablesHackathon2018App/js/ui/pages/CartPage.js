'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../../data/Store';
import { AsinStore } from '../../data/AsinStore';

export class CartPage extends Component {
  static navigationOptions = {
    title: "Grocery Shopping In Seconds"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderPageHeader()}
        {this.renderCartItems()}
      </View>
    )
  }
}