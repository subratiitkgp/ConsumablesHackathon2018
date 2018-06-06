'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../data/Store';
import { AsinStore } from '../data/AsinStore';
import { RNCamera } from 'react-native-camera';

export class WelcomePage extends Component {
  static navigationOptions = {
    title: "Welcome"
  };

  constructor(props) {
    super(props);
    Store.init([AsinStore.getAsinSchema()]);
    const asins = AsinStore.getAllAsins();
    this.state = { asins };
    this.asinCount = asins.length + 1;
    this.scanProcessing = 0;
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

  printAsins() {
    console.log(AsinStore.getAllAsins());
  }

  deleteAllAsins() {
    AsinStore.deleteAllAsins();
    this.setState({asins: AsinStore.getAllAsins()});
    this.asinCount = 1;
    this.scanProcessing = 0;
  }

  addAsin() {
    AsinStore.saveAsin(this.getAsin("ASIN" + this.asinCount));
    this.setState({asins: AsinStore.getAllAsins()});
    this.asinCount = this.asinCount + 1;
  }

  getAsin(id) {
    return {
      key: id,
      id,
      type: "asin"
    }
  }

  onBarCodeRead(data, type) {
    if (this.scanProcessing === 1) return;
    this.scanProcessing = 1;
    console.log(data);
    console.log(type);
    Alert.alert("Scanned code: ", 
                data.data, 
                [{text: 'Accept', onPress: () => {
                  this.addAsin();
                  setTimeout(() => this.scanProcessing = 0, 1500);
                }},
                {text: 'Ignore', onPress: () => {
                  setTimeout(() => this.scanProcessing = 0, 1500);
                }}
                ]
              );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderButtons()}
        {this.renderAsinList()}
        {this.renderCamera()}
      </View>
    )
  }

  renderCamera() {
    return (
      <View style={{margin: 10, borderWidth: 1, width: "95%", height: 250}}>
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

  renderButtons() {
    return (
      <View style={{margin: 10, width: '95%', flexDirection: 'row', borderWidth: 1, justifyContent: "space-evenly"}}>
      <View style={{margin: 10}}>
        <Button
          title="Add"
          onPress={() => {
            this.addAsin();
            this.printAsins();
          }}
        />
      </View>
      <View style={{margin: 10}}>
        <Button
          title="Reset"
          onPress={() => {
            this.deleteAllAsins();
            this.printAsins();
          }}
        />
      </View>
    </View>
    )
  }

  renderAsinList() {
    return (
      <View style={{flex: 1, margin : 10, borderWidth: 1}}>
        <FlatList
          removeClippedSubviews={true}
          data={this.state.asins.reverse()}
          keyExtractor={(asin) => asin.key}
          initialNumToRender={3}
          renderItem={(asin) => this.renderAsin(asin.item, asin.index)}
        />
      </View>
    )
  }

  renderAsin(asin, index) {
    const asinSize = this.state.asins.length;
    const asinId = asinSize - 1 - index;
    const imageUri = this.imageUrls[asinId % this.imageUrls.length];
    return (
      <View style={{flexDirection: 'row', width: '95%', borderWidth: 1, margin: 5, alignItems: 'center', justifyContent: "flex-start"}}>
        <Image source={{uri: imageUri}} style={{width: 30 , height: 40, marginRight: 50}} />
        <Text style={{fontSize: 30}}>{asin.id}</Text>
      </View>
    )
  }
}
