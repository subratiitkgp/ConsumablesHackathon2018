import { StringUtil } from '../util/StringUtil';

'use strict';

const Realm = require('realm');
const realm = {};

export class Store {
  // Initialize the datastore
  static init(schemas) {
    realm = new Realm({schema: schemas});
    return realm;
  }

  static getAll(entity) {
    const objects = realm.objects(entity);
    if (objects === undefined || objects.length == 0) return [];
    return objects.map(object => this.copyFromRealm(object));
  }

  static getSingle(entity, filter) {
    const objects = realm.objects(entity).filtered(filter);
    if (objects === undefined || objects.length == 0) return {};
    return this.copyFromRealm(objects[0]);
  }

  static get(entity, filter) {
    const objects = realm.objects(entity).filtered(filter);
    if (objects === undefined || objects.length == 0) return [];
    return objects.map(object => this.copyFromRealm(object));
  }

  // Note: This can update the entity if the entity has primary key and it matches the same field in value.
  static save(entity, value) {
    realm.write(() => realm.create(entity, value, true));
  }

  static delete(entity, filter) {
    realm.write(() => {
      const objects = realm.objects(entity).filtered(filter);
      if (objects === undefined || objects.length == 0) return;
      realm.delete(objects);
    })
  }

  static deleteAll(entity) {
    realm.write(() => {
      const allObjects = realm.objects(entity);
      if (allObjects === undefined || allObjects.length == 0) return;
      realm.delete(allObjects);
    });
  }

  static copyFromRealm(realmObject) {
    return StringUtil.cloneObject(realmObject);
  }
}
