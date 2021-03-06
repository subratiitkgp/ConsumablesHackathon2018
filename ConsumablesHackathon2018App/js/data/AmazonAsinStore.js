'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';

export class AmazonAsinStore {
  static saveAsin(asin) {
    let tmpAsin = StringUtil.cloneObject(asin);
    Store.save(this.getAsinSchema().name, tmpAsin);
  }

  static saveAllAsins(asins) {
    asins.forEach((asin) => this.saveAsin(asin));
  }

  static getAsin(id) {
    let asin = Store.getSingle(this.getAsinSchema().name, 'asin = "' + id + '"');
    return this.cloneAndParseAsin(asin);
  }

  static getAsinFromExternalBarcode(externalBarcode) {
    let asin = Store.getSingle(this.getAsinSchema().name, 'externalBarcode = "' + externalBarcode + '"');
    return this.cloneAndParseAsin(asin);
  }

  static getVariationsForVarationGroup(variationgroup) {
    const asins = this.getAsinsForVariationGroup(variationgroup);
    return asins.map(asin => asin.variation);
  }

  static getAsinsForVariationGroup(variationgroup) {
    let asins = Store.get(this.getAsinSchema().name, 'variationgroup = "' + variationgroup + '"');
    return asins.map(asin => this.cloneAndParseAsin(asin));
  }

  static getAllAsins() {
    let asins = Store.getAll(this.getAsinSchema().name);
    return asins.map(asin => this.cloneAndParseAsin(asin));
  }

  static deleteAllAsins() {
    Store.deleteAll(this.getAsinSchema().name);
  }

  static cloneAndParseAsin(asin) {
    let tmpAsin = StringUtil.cloneObject(asin);
    return tmpAsin;
  }

  static getAsinSchema() {
    return {
      name: "AmazonAsin",
      primaryKey: "asin",
      properties: {
        asin: 'string', 
        imageURL: 'string',
        available: 'int',
        title : 'string',
        price: 'float',
        actualprice: 'float',
        asingroup: 'string',
        type: 'string',
        variationgroup: 'string',
        variation: 'string',
        externalBarcode: 'string'
      }
    }
  }
}