'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import { CompareAndSaveDP } from '../components/CompareAndSaveDP';
import { CartStore } from '../../data/CartStore';
import {CartItem} from '../components/CartItem';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { Savings } from '../components/Savings';
import {LogoTitleCompareAndSearch} from '../components/LogoTitleCompareAndSearch';

export class CompareAndSavePage extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitleCompareAndSearch />,
  };

  constructor(props) {
    super(props);
    const asins = AmazonAsinStore.getAllAsins();
    this.state = { 
      asins,
      displayMode: "asinlist",
      totalSaving: 0,
      scannedAsin: "",
      cartItems: CartStore.getAllCartItems()
    };
    this.asinCount = asins.length + 1;
    this.scanProcessing = 0;
    this.startTime = new Date();
    this.customerID = 1;
  }

  onBarCodeRead(data, type) {
    if (this.scanProcessing === 1) return;
    this.scanProcessing = 1;
    const barcode = data.data;
    const scannedAsin = AmazonAsinStore.getAsinFromExternalBarcode(barcode);

    if (scannedAsin === undefined || Object.keys(scannedAsin).length === 0) {
      Alert.alert("Invalid code", "Could not identify asin for barcode: " + barcode,
      [{text: 'Ok', onPress: () => {
        setTimeout(() => this.scanProcessing = 0, 1500);
        }}
      ]);
      return;
    }

    const cartItems = this.state.cartItems;

    const alreadyInCart = cartItems.filter(cartItem => {
      const cartAsin = AmazonAsinStore.getAsin(cartItem.asin);
      if (cartAsin.asin === scannedAsin.asin || 
          cartAsin.variationgroup === scannedAsin.variationgroup) {
          return true;
      }
    });

    if (alreadyInCart != undefined && alreadyInCart.length > 0) {
      Alert.alert("Already Added", "Already added",
      [{text: 'Ok', onPress: () => {
        setTimeout(() => this.scanProcessing = 0, 1500);
        }}
      ]);
      return;
    }

    this.addAsinToCart(scannedAsin, barcode);
    this.setState({displayMode: "asinDetail", scannedAsin});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderCamera()}
        {this.renderCartOrDp()}
        {this.renderFooter()}
      </View>
    )
  }

  renderCamera() {
    return (
      <View style={{margin: 5, borderWidth: 1, width: "97%", height: 150}}>
        <RNCamera
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={(data, type) => this.onBarCodeRead(data, type)}
        />
      </View>
    )
  }

  onDpBackPress() {
    this.setState({displayMode: "asinlist"});
    this.scanProcessing = 0;
  }

  renderCartOrDp() {
    if (this.state.displayMode === "asinDetail") {
      return (
        <CompareAndSaveDP pageMode={"External"} asin={this.state.scannedAsin} 
                          navigation={this.props.navigation} 
                          onBack={() => this.onDpBackPress()}/>
      )
    } else {
      return this.renderAsinList();
    }
  }

  renderFooter() {
    return (
      <View style={{margin: 5, width: '97%', flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between'}}>
          <View style={{margin: 5}}>
          <Button
              title="Checkout"
              onPress={() => {
                if (this.state.dpModalVisible === true) this.setState({dpModalVisible: false});
                this.props.navigation.navigate("CartPage", { source: "External"})
              }}
          />
          </View>

          <View style={{margin: 5}}>
          <Savings />
          </View>
      </View>
    );
  }

  addAsinToCart(scannedAsin, barcode) {
    let size = CartStore.getAllCartItems().length;
    const cartItem = {
      cartItemId: size + 1,
      asin: scannedAsin.asin,
      quantity: 1,
      customerId: this.customerID, 
      fromBarcode: barcode,
      source: "External",
      appliedOffer: "",
      externalPrice: 0
    }
    CartStore.saveCartItem(cartItem);
    this.setState({cartItems: CartStore.getAllCartItems()})
  }

  renderAsinList() {
    const cartItems = this.state.cartItems;
    return (
        <FlatList
          removeClippedSubviews={true}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.asin + cartItem.quantity.toString()}
          initialNumToRender={3}
          extraData={this.state}
          renderItem={(cartItems) => this.renderCartItem(cartItems.item, cartItems.index)}
        />
    )
  }

  renderCartItem(cartItem, index) {
    return (
      <CartItem cartItem={cartItem} renderSecondRow={false} 
      onQuantityChange={(cartItem) => this.onQuantityChange(cartItem.asin, cartItem.quantity)}
      onItemClick={(cartItem) => this.onDetailPage(cartItem)}
      />
    );
  }
  
  onQuantityChange(cartItem) {
    this.setState({cartItems: CartStore.getAllCartItems()});
  }

  onDetailPage(cartItem) {
    this.setState({currentCartItemForDp: cartItem, dpModalVisible: true});
  }  
}
