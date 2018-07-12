'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image } from 'react-native';

export class LoginPage extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: 'center'}}>
        <Button
          title="Customer 1"
          onPress={() => this.props.navigation.navigate("CompareAndSavePage")}
        />
        <Button
          title="Customer 2"
          onPress={() => this.props.navigation.navigate("CompareAndSavePage")}
        />
                <Button
          title="Customer 3"
          onPress={() => this.props.navigation.navigate("CompareAndSavePage")}
        />
      </View>
    )
  }
}