'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../../data/Store';
import { AsinStore } from '../../data/AsinStore';
import { RNCamera } from 'react-native-camera';
import { CompareAndSaveDP } from '../components/CompareAndSaveDP';

export class CompareAndSavePage extends Component {
  static navigationOptions = {
    title: "Compare & Save"
  };

  constructor(props) {
    super(props);
    Store.init([AsinStore.getAsinSchema()]);
    const asins = AsinStore.getAllAsins();
    this.state = { 
      asins,
      displayMode: "asinDetail"
    };
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

  printAsins() {
    console.log(AsinStore.getAllAsins());
  }

  deleteAllAsins() {
    AsinStore.deleteAllAsins();
    this.setState({asins: AsinStore.getAllAsins()});
    this.asinCount = 1;
    this.scanProcessing = 0;
    this.startTime = new Date();
    // this.printAsins();
  }

  addAsin() {
    AsinStore.saveAsin(this.getAsin("ASIN" + this.asinCount));
    this.setState({asins: AsinStore.getAllAsins()});
    this.asinCount = this.asinCount + 1;
    // this.printAsins();
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
    this.setState({displayMode: "asinDetail"});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderCamera()}
        {this.renderCartOrDp()}
        {this.renderButtons()}
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

  renderButtons() {
    return (
      <View style={{margin: 5, width: '97%', flexDirection: 'row', borderWidth: 1, justifyContent: "space-evenly"}}>
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
                        [{text: "OK", onPress: () => this.deleteAllAsins()}]
                       );
          }}
        />
      </View>
      <View style={{margin: 5}}>
        <Button
          title="Reset"
          onPress={() => this.deleteAllAsins()}
        />
      </View>
    </View>
    )
  }

  onDpBackPress() {
    this.setState({displayMode: "asinlist"});
  }

  renderCartOrDp() {
    if (this.state.displayMode === "asinDetail") {
      return (
        <CompareAndSaveDP navigation={this.props.navigation} onBack={() => this.onDpBackPress()}/>
      )
    } else {
      return this.renderAsinList();
    }
  }

  renderAsinList() {
    return (
      <View style={{flex: 1, width: "97%", margin : 5, borderWidth: 1}}>
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
      <View style={{flexDirection: 'row', width: '97%', borderWidth: 1, margin: 5, alignItems: 'center', justifyContent: "flex-start"}}>
        <Image source={{uri: imageUri}} style={{width: 30 , height: 40, margin: 2, marginRight: 50}} />
        <Text style={{fontSize: 30}}>{asin.id}</Text>
      </View>
    )
  }
}
