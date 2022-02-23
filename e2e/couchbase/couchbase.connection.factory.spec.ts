import { CouchbaseConnectionFactory } from '../../src/couchbase/couchbase.connection.factory';
import { sleep } from '../../src/utils';
import { config, bucketOptions } from '../__stubs__';

describe('#couchbase', () => {
  describe('#CouchbaseConnectionFactory', () => {
    it('should be defined', () => {
      expect(CouchbaseConnectionFactory).toBeDefined();
    });

    describe('#create', () => {
      it('should be defined', () => {
        expect(CouchbaseConnectionFactory.create).toBeDefined();
      });
      it('should create an instance', async () => {
        const conn = await CouchbaseConnectionFactory.create(config);
        expect(conn).toBeInstanceOf(CouchbaseConnectionFactory);
      });
      it('should create an instance with mock', async () => {
        const conn = await CouchbaseConnectionFactory.create({ ...config, mock: true });
        expect(conn).toBeInstanceOf(CouchbaseConnectionFactory);
      });
    });

    describe('#methods', () => {
      let conn: CouchbaseConnectionFactory;
      let mocked: CouchbaseConnectionFactory;

      async function removeBuckets() {
        const buckets = await conn.listBuckets();
        if (buckets && buckets.length) {
          for (let i = 0; i < buckets.length; i++) {
            await conn.removeBucket(buckets[0].name);
          }
        }
      }

      beforeAll(async () => {
        conn = await CouchbaseConnectionFactory.create(config);
        mocked = await CouchbaseConnectionFactory.create({ ...config, mock: true });
        await removeBuckets();
      });

      afterAll(async () => {
        await removeBuckets();
      });

      describe('#createBucket', () => {
        it('should create a bucket', async () => {
          const [err, ok] = await conn.createBucket(
            config.bucketName,
            bucketOptions,
          );
          expect(err).toBeUndefined();
          expect(ok).toBe(true);
          await sleep(3500);
        });
        it('should return an error', async () => {
          const [err, _] = await conn.createBucket(
            config.bucketName,
            bucketOptions,
          );
          expect(err).toBeInstanceOf(Error);
        });
      });

      describe('#listBuckets', () => {
        it('should return an array of buckets', async () => {
          const [_, buckets] = await conn.listBuckets();
          expect(Array.isArray(buckets)).toBe(true);
        });
      });

      describe('#getBucket', () => {
        it('should return an error', async () => {
          const err = await conn.openBucket('invalid');
          expect(err).toBeInstanceOf(Error);
        });
        it('should return a bucket', async () => {
          const bucket = await conn.openBucket(config.bucketName);
          expect(bucket).toBeDefined();
          bucket.conn.close(undefined)
        });
        it('should return a bucket with mock', async () => {
          const bucket = await mocked.openBucket(config.bucketName);
          expect(bucket).toBeDefined();
        });
      });

      describe('#removeBucket', () => {
        it('should return an error', async () => {
          const err = await conn.removeBucket('invalid');
          expect(err).toBeInstanceOf(Error);
        });
        it('should remove a bucket', async () => {
          const ok = await conn.removeBucket(config.bucketName);
          expect(ok).toBe(true);
        });
      });
    });
  });
});
