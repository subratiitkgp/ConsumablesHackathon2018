'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';

export class CustomerStore {
  static saveCustomer(id) {
    let tmpCustomerId = StringUtil.cloneObject(id);
    Store.save(this.getCustomerSchema().name, tmpCustomerId);
  }

  static saveAllCustomers(ids) {
    ids.forEach((id) => this.saveCustomer(id));
  }

  static getCustomerId(id) {
    let tmpid = Store.getSingle(this.getCustomerSchema().name, 'id = "' + id + '"');
    return this.cloneAndParseAsin(tmpid);
  }

  static getAllCustomers() {
    let ids = Store.getAll(this.getCustomerSchema().name);
    return ids.map(id => this.cloneAndParseAsin(id));
  }

  static deleteAllCustomers() {
    Store.deleteAll(this.getCustomerSchema().name);
  }

  static cloneAndParseCustomer(id) {
    let tmpId = StringUtil.cloneObject(barcode);
    return tmpId;
  }

  static getCustomerSchema() {
    return {
      name: "Customer",
      primaryKey: "id",
      properties: {
        id: 'int', 
        name: 'string',
        address: 'string'
      }
    }
  }
}