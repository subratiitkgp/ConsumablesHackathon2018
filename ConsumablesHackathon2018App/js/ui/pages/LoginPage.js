'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../../data/Store';
import { AsinStore } from '../../data/AsinStore';
import {DataInitializer} from '../../data/DataInitializer';
import { AmazonAsinList } from '../../stub/AmazonAsin';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { CustomerStore } from '../../data/CustomerStore';
import { CartStore } from '../../data/CartStore';

export class LoginPage extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    Store.init([
      AsinStore.getAsinSchema(), 
      AmazonAsinStore.getAsinSchema(),
      BarcodeMapper.getBarcodeSchema(),
      CustomerStore.getCustomerSchema(),
      CartStore.getCartSchema()
    ]);
    const asins = AsinStore.getAllAsins();
    console.log(asins);
  }

  resetData() {
    DataInitializer.initializeData();
    Alert.alert("Data Reset", "Loaded " + DataInitializer.getAllAmazonAsins().length + " asins");
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: 'center'}}>
        <Button
          title="Customer 1"
          onPress={() => this.props.navigation.navigate("AmazonKitchenScanner")}
        />
        <Button
          title="Customer 2"
          onPress={() => this.props.navigation.navigate("CompareAndSavePage")}
        />
        <Button
          title="Customer 3"
          onPress={() => this.props.navigation.navigate("CompareAndSavePage")}
        />
        <Button
          title="Reset Data"
          onPress={() => this.resetData()}
        />
      </View>
    )
  }
}