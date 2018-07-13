'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, Switch } from 'react-native';
import { Store } from '../../data/Store';
import { AsinStore } from '../../data/AsinStore';
import {DataInitializer} from '../../data/DataInitializer';
import { AmazonAsinList } from '../../stub/AmazonAsin';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { BarcodeMapper } from '../../data/BarcodeMapper';
import { CustomerStore } from '../../data/CustomerStore';
import { CartStore } from '../../data/CartStore';
import { StringUtil } from '../../util/StringUtil';

export class ModifySticker extends Component {
  static navigationOptions = {
    title: "Modify Sticker"
  };

  constructor(props) {
    super(props);

    this.state = {
      switchValues: {}
    }

    this.modifiedCartItems = this.getModifiedCartItems();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        {this.renderStickerList()}
        {this.renderFooter()}
      </View>
    );
  }

  renderHeader() {
    return null;
  }

  renderFooter() {
    return (
      <Button
        title="Submit"
        onPress={() => this.onSubmit()}
      />
    );
  }

  renderStickerList() {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={this.modifiedCartItems}
        keyExtractor={(cartItem) => cartItem.asin}
        initialNumToRender={3}
        extraData={this.state}
        renderItem={(cartItem) => this.renderSingleCartItem(cartItem.item)}
      /> 
    )
  }

  renderSingleCartItem(cartItem) {
    const originalBarcodeDetails = BarcodeMapper.getBarcode(cartItem.fromBarcode);
    const originalAsin = BarcodeMapper.getAsinFromBarcode(cartItem.fromBarcode);
    const modifiedAsin = AmazonAsinStore.getAsin(cartItem.asin);
    const originalText = "Variation - " + originalAsin.variation +
                         ", Quantity - " + originalBarcodeDetails.quantity;
    const modifiedText = "Variation - " + modifiedAsin.variation +
                         ", Quantity - " + cartItem.quantity;
    const oriText = "Original: ";
    const modText = "Your Choice: ";

    const asin = AmazonAsinStore.getAsin(cartItem.asin);                     
    const switchValue = this.state.switchValues[cartItem.asin] === undefined ? false : 
                        this.state.switchValues[cartItem.asin];
    return (
      <View key={cartItem.cartItemId} style={{borderWidth: 0.5, margin: 20, alignItems: 'center'}}>
        <View style={{width: "97%", flexDirection: 'row', alignItems: 'center',
                      justifyContent: 'space-between'}}>
          <Image source={{uri: asin.imageURL}} style={{width: 50 , height: 60, margin: 5}} />
          <View style={{width: 280}}>
             <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>{oriText}</Text>
              <Text style={{fontSize: 13}}>{originalText}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>{modText}</Text>
              <Text style={{fontSize: 13}}>{modifiedText}</Text>
             </View>
          </View>

        </View>  
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Accept</Text>
          <Switch value={switchValue} onValueChange={(value) => this.onSwitch(cartItem, value)}/>
        </View>
      </View>      
    );
  }

  onSubmit() {
    const asins = Object.keys(this.state.switchValues);

    for (let i = 0; i < asins.length; ++i) {
      const asin = asins[i];
      const switchValue = this.state.switchValues[asin];
      const cartItem = this.modifiedCartItems.filter(tmp => tmp.asin === asin)[0];

      if (switchValue === true) {
        const originalBarcodeDetails = BarcodeMapper.getBarcode(cartItem.fromBarcode);
        console.log(originalBarcodeDetails);
        const modifiedAsin = AmazonAsinStore.getAsin(cartItem.asin);
        originalBarcodeDetails.asin = modifiedAsin.asin;
        originalBarcodeDetails.quantity = cartItem.quantity;
        originalBarcodeDetails.customerIdList = Object.values(originalBarcodeDetails.customerIdList);
        BarcodeMapper.saveBarcode(originalBarcodeDetails);
      }
    }
    this.props.navigation.navigate("HomePage");
  }

  onSwitch(cartItem, value) {
    let newSwitchValues = StringUtil.cloneObject(this.state.switchValues);
    newSwitchValues[cartItem.asin] = value;
    this.setState({switchValues: newSwitchValues});
  }

  getModifiedCartItems() {
    const cartItems = CartStore.getAllCartItems();
    const modifiedCartItems = [];
    for (let i = 0; i < cartItems.length; ++i) {
      if (this.checkIfModified(cartItems[i]) === true) {
        modifiedCartItems.push(cartItems[i]);
      }
    }

    return modifiedCartItems;
  }

  checkIfModified(cartItem) {
    if (cartItem.fromBarcode === "") return false;
    if (cartItem.source != "Internal") return false;
    const barcodeItem = BarcodeMapper.getBarcode(cartItem.fromBarcode);

    if (cartItem.asin != barcodeItem.asin) return true;
    if (cartItem.quantity != barcodeItem.quantity) return true;
    return false;
  }
}