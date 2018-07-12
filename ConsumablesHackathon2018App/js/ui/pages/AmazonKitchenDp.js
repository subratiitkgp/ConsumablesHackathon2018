'use strict';

import React, { Component } from 'react';
import { View, Button, FlatList, Text, Image, ToastAndroid, TouchableWithoutFeedback, Alert } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import {LogoTitle} from '../components/LogoTitle';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { CartStore } from '../../data/CartStore';
import {CartItem} from '../components/CartItem';
import { CompareAndSaveDP } from '../components/CompareAndSaveDP';
//import {Footer} from '../components/Footer';

export class AmazonKitchenDp extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props) {
    super(props);
  }

  render() {
      const cartItem = this.props.navigation.getParam("cartItem");
      const asin = AmazonAsinStore.getAsin(cartItem.asin);
      return (
        <View style={{flex: 1}}>
            <CompareAndSaveDP pageMode={"Internal"} cartItem={cartItem} asin={asin} 
                              navigation={this.props.navigation}
                              />
        </View>
      );
  }
}