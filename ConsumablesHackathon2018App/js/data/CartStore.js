'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';

export class CartStore {
  static saveCartItem(id) {
    let tmpCustomerId = StringUtil.cloneObject(id);
    Store.save(this.getCartSchema().name, tmpCustomerId);
  }

  static saveAllCartItems(ids) {
    ids.forEach((id) => this.saveCartItem(id));
  }

  static getCartItem(id) {
    let tmpid = Store.getSingle(this.getCartSchema().name, 'asin = "' + id + '"');
    return this.cloneAndParseAsin(tmpid);
  }

  static getAllCartItems() {
    let ids = Store.getAll(this.getCartSchema().name);
    return ids.map(id => this.cloneAndParseAsin(id));
  }

  static deleteAllCartItems() {
    Store.deleteAll(this.getCartSchema().name);
  }

  static cloneAndParseCartItem(id) {
    let tmpId = StringUtil.cloneObject(barcode);
    return tmpId;
  }

  static getCartSchema() {
    return {
      name: "CartItem",
      primaryKey: "asin",
      properties: {
        asin: 'string',
        quantity: 'int',
        customerId: 'int',
        fromBarcode: 'string',
        source: 'string',
        appliedOffer: 'string',
        externalPrice: 'float'
      }
    }
  }
}