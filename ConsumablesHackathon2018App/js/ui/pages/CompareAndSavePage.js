'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import { CompareAndSaveDP } from '../components/CompareAndSaveDP';

export class CompareAndSavePage extends Component {
  static navigationOptions = {
    title: "Compare & Save"
  };

  constructor(props) {
    super(props);
    const asins = AmazonAsinStore.getAllAsins();
    this.state = { 
      asins,
      displayMode: "asinlist",
      totalSaving: 0,
      scannedAsin: ""
    };
    this.asinCount = asins.length + 1;
    this.scanProcessing = 0;
    this.startTime = new Date();
  }

  onBarCodeRead(data, type) {
    if (this.scanProcessing === 1) return;
    this.scanProcessing = 1;
    const barcode = data.data;
    // const barcode = "ext1";
    const scannedAsin = AmazonAsinStore.getAsinFromExternalBarcode(barcode);
    this.setState({displayMode: "asinDetail", scannedAsin});
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
                        [{text: "OK", onPress: () => this.deleteAllAsins()}]
                       );
          }}
        />
        </View>

      <View style={{margin:5, flexDirection: 'row'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Saving: </Text>
          <Text style={{fontSize: 20, color: 'red'}}>₹{this.state.totalSaving.toFixed(2)}</Text>             
      </View>
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

  renderAsinList() {
    return (
      <View style={{flex: 1, width: "97%", margin : 5, borderWidth: 1}}>
        <Text style={{fontSize: 20}}>Cart</Text>
      </View>
    )
  }
}
