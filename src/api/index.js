import { classTypes } from './data/classTypes';
import { subjects } from './data/subjects';
import products from './data/products';
import { teachers } from './data/teachers';

export default class Api {
  constructor(entities) {
    this.entities = entities;

    this.urls = {
      classTypes,
      subjects,
      products,
      teachers,
    };
  }

  getUrl(entity) {
    return this.urls[entity];
  }

  getPromise(entity) {
    const delay = Math.floor(Math.random() * 1000);

    return new Promise((resolve) => {
      setTimeout(() => resolve(this.getUrl(entity)), delay);
    });
  }

  async get() {
    const promises = [];

    this.entities.forEach((entity) => {
      const promise = this.getPromise(entity);
      promises.push(promise);
    });

    return Promise.all(promises);
  }
}
