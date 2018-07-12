'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, Text } from 'react-native';

export class Footer extends Component {
    render() {
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
        );
    }
}