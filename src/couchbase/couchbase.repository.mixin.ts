import { Bucket } from 'couchbase';
import { type } from 'os';

import { promisify, flattenPromise } from '../utils';
import { Repository } from './interfaces';

export function CouchbaseRepositoryMixin<T>(bucket: Bucket, entity: T): Repository<T> {
  class CouchbaseRepository {
    entity: T;

    constructor() {
      this.entity = entity;
    }
  }
  Object.assign(CouchbaseRepository, JSON.parse(JSON.stringify(Bucket.prototype)))
  Object.getOwnPropertyNames(Bucket.prototype).forEach((name: string) => {
    console.log("name: " + name)
    console.log("type: " + typeof Bucket.prototype[name])
    if (
      name !== 'constructor' &&
      typeof CouchbaseRepository.prototype[name] === 'function'
    ) {
      const method = promisify(Bucket.prototype[name], bucket);
      CouchbaseRepository.prototype[name] = method;
      CouchbaseRepository.prototype[`${name}Flat`] = flattenPromise(method);
    }
  });
  Object.defineProperty(CouchbaseRepository, 'name', {
    writable: true,
    value: `Generated${(entity as any).name}CouchbaseRepository`,
  });


  return CouchbaseRepository as any;
}
