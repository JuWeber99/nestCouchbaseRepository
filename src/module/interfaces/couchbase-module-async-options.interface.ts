import { ConnectOptions } from "couchbase";

export interface CouchbaseModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<ConnectOptions> | ConnectOptions;
  inject?: any[];
}
