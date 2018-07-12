'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../data/Store';
import { AsinStore } from '../data/AsinStore';
import { RNCamera } from 'react-native-camera';

export class AmazonKitchenScanner extends Component {
  static navigationOptions = {
    title: "Amazon Kitchen"
  };

  constructor(props) {
    super(props);
    Store.init([AsinStore.getAsinSchema()]);
    const asins = AsinStore.getAllAsins();
    this.state = { asins };
    this.asinCount = asins.length + 1;
    this.scanProcessing = 0;
    this.startTime = new Date();
    this.imageUrls = [
      "https://images-eu.ssl-images-amazon.com/images/I/51Kt7nFLqEL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/51dsI-aMgsL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/418HMs0w1YL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/41-9Bi%2BlgVL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/51rsCtqEPWL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/51DKt-v2uWL._SS140_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/51NGLOYEJjL._SS140_.jpg"
    ]
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderCamera()}
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
  
}
