'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text } from 'react-native';
import { Store } from '../data/Store';
import { AsinStore } from '../data/AsinStore';

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
  }

  printAsins() {
    console.log(AsinStore.getAllAsins());
  }

  deleteAllAsins() {
    AsinStore.deleteAllAsins();
    this.setState({asins: AsinStore.getAllAsins()});
    this.asinCount = 1;
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
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
        <View style={{flex: 1, margin: 10, borderWidth: 1}}>
          <FlatList
            removeClippedSubviews={true}
            data={this.state.asins.reverse()}
            keyExtractor={(asin) => asin.key}
            initialNumToRender={3}
            renderItem={(asin) => this.renderAsin(asin.item)}
          />
        </View>
      </View>
    )
  }

  renderAsin(asin) {
    return (
      <View style={{borderWidth: 1, margin: 5, alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>{asin.id}</Text>
      </View>
    )
  }
}
