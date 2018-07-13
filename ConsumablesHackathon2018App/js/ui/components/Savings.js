'use strict';

import React, { Component } from 'react';
import { CartStore } from '../../data/CartStore';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { View, Button, FlatList, Text, Image, ToastAndroid, TouchableWithoutFeedback, Alert } from 'react-native';

export class Savings extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            savings: 0.00
          }

    }

    computeSavings() {
        const cartItems = CartStore.getAllCartItems();
        let savings = 0.0;
        let price = 0.0;
        for(let cartItem of cartItems) {
            if(cartItem.source === 'Internal' || cartItem.source === 'internal'){
               const asin = AmazonAsinStore.getAsin(cartItem.asin);
               const quantity = cartItem.quantity;
               savings = savings + ((asin.actualprice - asin.price) * quantity);
               price = price + asin.price * quantity;
            } else {
                const asin = AmazonAsinStore.getAsin(cartItem.asin);
                if(cartItem.externalPrice > 0) {
                    savings = savings + ((cartItem.externalPrice-asin.price) * cartItem.quantity);
                }
                price = price + asin.price * cartItem.quantity;
            }
        }

        if (price >= 2000) {
            savings = savings + 0.15 * price;
        } else if (price >= 1000) {
            savings = savings + 0.10 * price;
        }

        this.state.savings = savings;
        return this.state.savings.toFixed(2);
    }

    render() {
        const savings = this.computeSavings();
        return (
          <View style={{margin:5, flexDirection: 'row'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Savings: </Text>
          <Text style={{fontSize: 15, color: 'red'}}>₹{savings}</Text>             
      </View>
        )
      }
}
