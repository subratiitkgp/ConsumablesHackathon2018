'use strict';

import { Store } from './Store';
import { StringUtil } from '../util/StringUtil';

export class OfferStore {
  static saveOffer(id) {
    let tmpCustomerId = StringUtil.cloneObject(id);
    Store.save(this.getOfferSchema().name, tmpCustomerId);
  }

  static saveAllOffers(ids) {
    ids.forEach((id) => this.saveOffer(id));
  }

  static getOffer(id) {
    let tmpid = Store.getSingle(this.getOfferSchema().name, 'id = "' + id + '"');
    return this.cloneAndParseAsin(tmpid);
  }

  static getOffers() {
    let ids = Store.getAll(this.getOfferSchema().name);
    return ids.map(id => this.cloneAndParseAsin(id));
  }

  static deleteAllOffers() {
    Store.deleteAll(this.getOfferSchema().name);
  }

  static cloneAndParseOffer(id) {
    let tmpId = StringUtil.cloneObject(barcode);
    return tmpId;
  }

  static getOfferSchema() {
    return {
      name: "Offer",
      primaryKey: "id",
      properties: {
        id: 'string',
        displayString: 'string',
      }
    }
  }
}