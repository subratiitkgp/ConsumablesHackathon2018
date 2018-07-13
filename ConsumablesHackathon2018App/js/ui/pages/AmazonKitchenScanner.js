'use strict';

import React, { Component } from 'react';
import { View, Button, FlatList, Text, Image, ToastAndroid, TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import {LogoTitle} from '../components/LogoTitle';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { CartStore } from '../../data/CartStore';
import {CartItem} from '../components/CartItem';
import { CompareAndSaveDP } from '../components/CompareAndSaveDP';
import { Savings } from '../components/Savings';
//import {Footer} from '../components/Footer';

export class AmazonKitchenScanner extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props) {
    super(props);
    this.state = { 
      totalSaving: 0,
      dpModalVisible: false,
      currentCartItemForDp: undefined,
      cartItems: CartStore.getAllCartItems()
    };
    this.scanProcessing = 0;
    this.startTime = new Date();
    this.customerID = 1;
  }

  addAsinToCart(scannedAsin, barcode) {
    let size = CartStore.getAllCartItems().length;
    const barcodeDetails = BarcodeMapper.getBarcode(barcode);
    const cartItem = {
      cartItemId: size + 1,
      asin: scannedAsin.asin,
      quantity: barcodeDetails.quantity,
      customerId: this.customerID, 
      fromBarcode: barcode,
      source: "Internal",
      appliedOffer: "",
      externalPrice: 0
    }
    CartStore.saveCartItem(cartItem);
    this.setState({cartItems: CartStore.getAllCartItems()})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderCamera()}
        {this.renderAsinList()}
        {this.renderDpModal(this.state.currentCartItemForDp)}
        {this.renderFooter()}
      </View>
    )
  }

  renderCamera() {
    return (
      <View style={{margin: 5, borderWidth: 1, width: "97%", height: 200}}>
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

  onBarCodeRead(data, type) {
    if (this.scanProcessing === 1) return;
    this.scanProcessing = 1;
    let barcode = data.data;
    const scannedAsin = BarcodeMapper.getAsinFromBarcode(barcode);
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
    ToastAndroid.showWithGravity(
      'Added To Cart',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setTimeout(() => this.scanProcessing = 0, 2000);
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
    this.scanProcessing = 1;
    this.setState({currentCartItemForDp: cartItem, dpModalVisible: true});
  }

  renderFooter() {
    return (
      <View style={{margin: 5, width: '97%', flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between'}}>
          <View style={{margin: 5}}>
          <Button
              title="Checkout"
              onPress={() => {
                if (this.state.dpModalVisible === true) this.setState({dpModalVisible: false});
                this.props.navigation.navigate("CartPage")
              }}
          />
          </View>

          <View style={{margin: 5}}>
          <Savings />
          </View>
      </View>
    );
  }

  renderDpModal(currentCartItemForDp) {
    if (currentCartItemForDp === undefined) return null;
    const asin = AmazonAsinStore.getAsin(currentCartItemForDp.asin);

    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Modal
            transparent={false}
            visible={this.state.dpModalVisible}
            onRequestClose={() => {
              this.scanProcessing = 1;
              this.setState({cartItems: CartStore.getAllCartItems(), dpModalVisible: false});
            }}>
            <CompareAndSaveDP pageMode={"Internal"} cartItem={currentCartItemForDp} asin={asin} 
                    navigation={this.props.navigation}
                    onQuantityChange={(cartItem) => this.onQuantityChange(cartItem)}
                    onBack={() => {
                      this.setState({cartItems: CartStore.getAllCartItems(), dpModalVisible: false});
                    }}
                    />
            {this.renderFooter()}
        </Modal>  
      </View>
    );
  }
}

/*
            <CompareAndSaveDP pageMode={"Internal"} cartItem={currentCartItemForDp} asin={asin} 
                                navigation={this.props.navigation}
                                onQuantityChange={(cartItem) => this.onQuantityChange(cartItem)}
                                />

          <View style={{margin:5, flexDirection: 'row'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Saving: </Text>
              <Text style={{fontSize: 20, color: 'red'}}>₹{this.state.totalSaving.toFixed(2)}</Text>             
          </View>
          */