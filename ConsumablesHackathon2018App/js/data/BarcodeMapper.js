'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';

export class BarcodeMapper {
  static saveBarcode(barcode) {
    let tmpBarcode = StringUtil.cloneObject(barcode);
    Store.save(this.getBarcodeSchema().name, tmpBarcode);
  }

  static saveAllBarcodes(barcodes) {
    barcodes.forEach((barcode) => this.saveBarcode(barcode));
  }

  static getBarcode(id) {
    let asin = Store.getSingle(this.getBarcodeSchema().name, 'id = "' + id + '"');
    return this.cloneAndParseAsin(asin);
  }

  static getAllBarcodes() {
    let barcodes = Store.getAll(this.getBarcodeSchema().name);
    return barcodes.map(barcode => this.cloneAndParseAsin(barcode));
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