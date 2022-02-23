import { Repository } from './interfaces';
import { CouchbaseConnectionFactory } from './couchbase.connection.factory';
import { CouchbaseRepositoryMixin } from './couchbase.repository.mixin';
import { getEntityMetadata } from './couchbase.utils';
import { Bucket, Collection } from 'couchbase';
import { min } from 'rxjs';

export class CouchbaseRepositoryFactory {

  static async connectToCollection<T>(
    conn: CouchbaseConnectionFactory
  ): Promise<Collection> {

    const bucket = await conn.openBucket(conn.connectionConfig.bucketName);
    if (conn.connectionConfig.collectionName) {
      return await bucket.collection(conn.connectionConfig.collectionName)
    }
    return bucket.defaultCollection()
  }


}
