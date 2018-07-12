'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import {CartItem} from '../components/CartItem';

export class CartPage extends Component {
  static navigationOptions = {
    title: "View Cart"
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

  renderPageHeader() {
    return undefined;
  }

  renderCartItems() {
    return (
      <View>
        <CartItem />
      </View>
    )
  }
}