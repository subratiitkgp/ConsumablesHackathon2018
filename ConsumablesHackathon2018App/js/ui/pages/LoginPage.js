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
  }

  resetData() {
    DataInitializer.initializeData();
    Alert.alert("Data Reset", "Loaded " + DataInitializer.getAllAmazonAsins().length + " asins");
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: 'center'}}>
        <Button
          title="Pulkit"
          onPress={() => {
            Alert.alert("Option", "Please Select Shopping Mode",
            [{text: 'Compare with Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("CompareAndSavePage", {customerId: 1});
            }},  
            {text: 'Shop from Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("SearchPage", {customerId: 1});
            }},
            {text: 'Amazon Kitchen', onPress: () => {
              this.props.navigation.navigate("AmazonKitchenScanner", {customerId: 1});
            }}
            ])
          }}
        />
        <Button
          title="Anand"
          onPress={() => {
            Alert.alert("Option", "Please Select Shopping Mode",
            [{text: 'Compare with Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("CompareAndSavePage", {customerId: 2});
            }},  
            {text: 'Shop from Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("SearchPage", {customerId: 2});
            }},
            {text: 'Amazon Kitchen', onPress: () => {
              this.props.navigation.navigate("AmazonKitchenScanner", {customerId: 2});
            }}
            ])
          }}
        />
        <Button
          title="Kalyan"
          onPress={() => {
            Alert.alert("Option", "Please Select Shopping Mode",
            [{text: 'Compare with Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("CompareAndSavePage", {customerId: 3});
            }},  
            {text: 'Shop from Amazon Pantry', onPress: () => {
              this.props.navigation.navigate("SearchPage", {customerId: 3});
            }},
            {text: 'Amazon Kitchen', onPress: () => {
              this.props.navigation.navigate("AmazonKitchenScanner", {customerId: 3});
            }}
            ])
          }}
        />
        <Button
          title="Reset Data"
          onPress={() => this.resetData()}
        />
      </View>
    )
  }
}