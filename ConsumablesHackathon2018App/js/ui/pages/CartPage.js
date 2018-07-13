'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import {CartStore} from '../../data/CartStore';
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
      <View style={{flex: 1, justifyContent: "space-between"}}>
        {this.renderPageHeader()}
        {this.renderCartItems()}
        {this.renderFooter()}
      </View>
    )
  }

  renderFooter() {
    return (
      <Button
        title="Checkout"
        onPress={() => {
          const source = this.props.navigation.getParam('source');
          if (source === "Internal") {
            this.props.navigation.navigate("ModifySticker");
          } else {
            CartStore.deleteAllCartItems();
            this.props.navigation.navigate("HomePage");
          }
        }}
      />
    );
  }

  renderPageHeader() {
    return null;
  }

  renderCartItem(cartItem, index) {
    return (
      <CartItem cartItem={cartItem} renderSecondRow={true} />
    );
  }

  renderCartItems() {
    const cartItems = CartStore.getAllCartItems();
    if (cartItems === undefined) return null;
    return (
      <View>
        <FlatList
          removeClippedSubviews={true}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.cartItemId.toString()}
          initialNumToRender={3}
          renderItem={(cartItem) => this.renderCartItem(cartItem.item, cartItem.index)}
        />
      </View>
    )
  }
}