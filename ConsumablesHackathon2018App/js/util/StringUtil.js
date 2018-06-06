'use strict';

export class StringUtil {
  static getUpperCase(input) {
    return input.toUpperCase();
  }

  static cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
