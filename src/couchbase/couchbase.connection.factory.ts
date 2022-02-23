import { Bucket, BucketManager, BucketSettings, Cluster, connect } from 'couchbase';
import { CouchbaseConnection } from './interfaces/connection-config.interface';



export class CouchbaseConnectionFactory {
  serverLoc: string
  connectionConfig: CouchbaseConnection;
  cluster: Cluster;
  manager: BucketManager;
  buckets: { [key: string]: Bucket } = {};

  constructor(config: CouchbaseConnection) {
    this.connectionConfig = config;
  }

  static async create(
    config: CouchbaseConnection
  ): Promise<CouchbaseConnectionFactory> {
    const conn = new CouchbaseConnectionFactory(config);
    await conn.initCluster();
    await conn.createBucketManager();
    if (conn.connectionConfig.bucketName) {
      await conn.openBucket(conn.connectionConfig.bucketName)
    }
    console.log("CONNECTION CREATED")
    console.log(JSON.stringify(
      conn
    ))
    console.log("==========================")
    return conn;
  }


  async createBucket(
    bucketSettings: any,
    name: string,
    /* istanbul ignore next */ options: any = {},
  ): Promise<void> {
    return await this.manager.createBucket(
      bucketSettings,
      options
    )
  }

  async listBuckets(): Promise<BucketSettings[]> {
    return await this.manager.getAllBuckets()
  }

  async removeBucket(name: string): Promise<void> {
    return await this.manager.dropBucket(name)
  }

  private async initCluster(): Promise<void> {
    if (!this.cluster) {
      this.cluster = await connect(this.connectionConfig.url, this.connectionConfig.config)
    }
  }

  private async createBucketManager(): Promise<void> {
    /* istanbul ignore next */
    if (!this.manager) {
      this.manager = this.cluster.buckets();
    }
  }

  async openBucket(name: string): Promise<Bucket> {
    /* istanbul ignore if */
    const result = await this.cluster.bucket(name)
    return result
  }
}
