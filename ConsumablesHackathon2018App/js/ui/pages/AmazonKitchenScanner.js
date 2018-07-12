'use strict';

import React, { Component } from 'react';
import { View, Button, FlatList, Text, Image, ToastAndroid, TouchableWithoutFeedback, Alert } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import {LogoTitle} from '../components/LogoTitle';
import {QuantitySlider} from '../components/QuantitySlider';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { CartStore } from '../../data/CartStore';
//import {Footer} from '../components/Footer';

export class AmazonKitchenScanner extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props) {
    super(props);
    const cartItems = CartStore.getAllCartItems();
    this.state = { 
      cartItems,
      totalSaving: 0,
    };
    this.asinQuantity = {
    };
    this.scanProcessing = 0;
    this.startTime = new Date();
    this.customerID = 1;
  }

  addAsinToCart(scannedAsin, barcode) {
    let size = CartStore.getAllCartItems().length;
    const cartItem = {
      cartItemId: size + 1,
      asin: scannedAsin.asin,
      quantity: this.asinQuantity[scannedAsin.asin] === undefined ? 1 : this.asinQuantity[scannedAsin.asin],
      customerId: this.customerID, 
      fromBarcode: barcode,
      source: "Internal",
      appliedOffer: "",
      externalPrice: 0
    }
    CartStore.saveCartItem(cartItem);
    this.setState({cartItems: CartStore.getAllCartItems()});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderCamera()}
        {this.renderAsinList()}
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
    this.addAsinToCart(scannedAsin, barcode);
    ToastAndroid.showWithGravity(
      'Added To Cart',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setTimeout(() => this.scanProcessing = 0, 2000);
  }

  renderAsinList() {
    return (
        <FlatList
          removeClippedSubviews={true}
          data={this.state.cartItems.reverse()}
          keyExtractor={(asin) => asin.key}
          initialNumToRender={3}
          renderItem={(cartItems) => this.renderAsin(cartItems.item, cartItems.index)}
        />
    )
  }

  renderAsin(cartItem, index) {
    let asin = AmazonAsinStore.getAsin(cartItem.asin);
    return (
      <View style={{flexDirection: 'row', width: '97%', borderWidth: 1, margin: 5, alignItems: 'center', justifyContent: "flex-start"}}>
        <Image source={{uri: asin.imageURL}} style={{width: 30 , height: 40, margin: 5, marginRight: 30}} />
        <TouchableWithoutFeedback onPress={() => this.onDetailPage()}>
          <View>
            <Text style={{fontSize: 10}}>{asin.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <QuantitySlider onQuantityChange={(quantity) => this.onQuantityChange(asin, quantity)}/>
      </View>
    )
  }

  onQuantityChange(asin, quantity) {
    this.asinQuantity[asin.asin] = quantity;
  }

  onDetailPage() {
    return
  }

  renderFooter() {
    return (
      <View style={{margin: 5, width: '97%', flexDirection: 'row', borderWidth: 1}}>
          <View style={{margin: 5}}>
          <Button
              title="Checkout"
              onPress={() => {
              if (this.state.asins.length == 0) {
                  Alert.alert("Warning", "Please add few products to checkout");
                  return;
              }
              const endTime = new Date();
              const timeDiff = (endTime - this.startTime) / 1000;
              Alert.alert("Congrats", "You have shopped for " + this.state.asins.length + " item(s) in " + timeDiff + " seconds",
                          [{text: "OK", onPress: () => this.onDetailPage()}]
                          );
              }}
          />
          </View>

          <View style={{margin:5, flexDirection: 'row'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Saving: </Text>
              <Text style={{fontSize: 20, color: 'red'}}>₹{this.state.totalSaving.toFixed(2)}</Text>             
          </View>
      </View>
    );
  }
}
