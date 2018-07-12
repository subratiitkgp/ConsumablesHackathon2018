'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, TextInput } from 'react-native';
import { Store } from '../../data/Store';
import { AsinStore } from '../../data/AsinStore';
import { RNCamera } from 'react-native-camera';
import {QuantitySlider} from './QuantitySlider';
import {GrammageSelector} from './GrammageSelector';

export class CompareAndSaveDP extends Component {

  constructor(props) {
    super(props);
    Store.init([AsinStore.getAsinSchema()]);
    const asins = AsinStore.getAllAsins();
    this.state = { asins };

    this.asinName = "Madhur Sugar";
    this.imageUri = "https://images-eu.ssl-images-amazon.com/images/I/51Kt7nFLqEL._AC_UL492_SR380,492_FMwebp_QL65_.jpg";
    this.ourPrice = 399;
    this.defaultGrammage = "10";
    this.grammageValues = ["10", "20"];

    this.offer1Price = this.ourPrice * 0.9;
    this.offer2Price = this.ourPrice * 0.85;
    this.state = { text:  this.ourPrice.toString()};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderATF()}
        {this.renderBTF()}
      </View>
    )
  }

  renderATF() {
    return (
      <View style={{flex: 1, flexDirection: 'row', borderWidth: 0.5}}>
      {this.renderImage()}
      {this.renderDetail()}
    </View>
    )
  }
  
  renderImage() {
    return (
      <View style={{flex: 1, margin: 5}}>
      <Image source={{uri: this.imageUri}} style={{width: 150 , height: 150}} />
      </View>
    )
  }

  renderDetail() {
    return (
      <View style={{flex: 1, margin: 5}}>
      {this.renderName()}
      {this.renderOurPrice()}
      {this.renderYourPrice()}    
      {this.renderPicker()}
      {this.renderATCButton()}
    </View>
    )
  }

  renderName() {
    return (
      <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>{this.asinName}</Text>
      </View>
    )
  }

  renderOurPrice() {
    return (
      <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>Our Price: </Text>
      <Text style={{fontSize: 15, color: 'red'}}> ₹{this.ourPrice} </Text>
      </View>
    )
  }

  renderYourPrice() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Your Price: </Text>
        <Text style={{fontSize: 15}}>₹</Text>
        <TextInput
          style={{fontSize: 15}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    )
  }

  renderPicker() {
    return (
      <View style={{ flexDirection: 'row'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Weight: </Text>
        <GrammageSelector defaultGrammage={this.defaultGrammage} grammageValues={this.grammageValues} />              
      </View>
    )
  }

  renderATCButton() {
    return (
      <QuantitySlider />
    )
  }

  renderBTF() {
    return (
      <View style={{height:100, borderWidth: 0.5, backgroundColor: 'yellow', margin: 5 , padding: 5}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Offers: </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15}}>1. Effective Price on Cart >= 1000: </Text>
          <Text style={{fontSize: 15, color: 'red'}}>₹{this.offer1Price.toFixed(2)}</Text>             
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15}}>2. Effective Price on Cart >= 2000: </Text>
          <Text style={{fontSize: 15, color: 'red'}}>₹{this.offer2Price.toFixed(2)}</Text>             
        </View>

        <Text style={{fontSize: 15}}>3. Buy 2 and Get 1 FREE</Text>
    </View>
    )
  }

  addAsin() {
    return;
  }
}
