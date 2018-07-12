'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';
import { AmazonAsinStore } from './AmazonAsinStore';

export class BarcodeMapper {
  static saveBarcode(barcode) {
    let tmpBarcode = StringUtil.cloneObject(barcode);
    Store.save(this.getBarcodeSchema().name, tmpBarcode);
  }

  static saveAllBarcodes(barcodes) {
    barcodes.forEach((barcode) => this.saveBarcode(barcode));
  }

  static getBarcode(barcode) {
    console.log(this.getAllBarcodes());
    console.log(barcode);
    let asin = Store.getSingle(this.getBarcodeSchema().name, 'barcode = "' + barcode + '"');
    console.log(asin);
    return this.cloneAndParseBarcode(asin);
  }

  static getAsinFromBarcode(barcode) {
    let barcodeDetails = this.getBarcode(barcode);
    return AmazonAsinStore.getAsin(barcodeDetails.asin);
  }
  static getAllBarcodes() {
    let barcodes = Store.getAll(this.getBarcodeSchema().name);
    return barcodes.map(barcode => this.cloneAndParseBarcode(barcode));
  }

  static deleteAllBarcodes() {
    Store.deleteAll(this.getBarcodeSchema().name);
  }

  static cloneAndParseBarcode(barcode) {
    let tmpBarcode = StringUtil.cloneObject(barcode);
    return tmpBarcode;
  }

  static getBarcodeSchema() {
    return {
      name: "Barcode",
      primaryKey: "barcode",
      properties: {
        barcode: 'string', 
        asin: 'string',
        quantity: 'int',
        customerIdList: 'int[]',
        barcodeType: 'string'
      }
    }
  }
}