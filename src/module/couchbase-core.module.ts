import {
  Global,
  Module,
  DynamicModule,
  Provider,
  OnApplicationShutdown,
} from '@nestjs/common';

import { CouchbaseConnection, CouchbaseConnectionFactory } from '../couchbase';
import { CouchbaseModuleAsyncOptions } from './interfaces';
import {
  createCouchbaseConnectionProviders,
  createCouchbaseAsyncConnectionProviders,
} from './providers';
import { InjectConnection } from './couchbase.decorators';

@Global()
@Module({})
export class CouchbaseCoreModule implements OnApplicationShutdown {
  constructor(@InjectConnection() private conn: CouchbaseConnectionFactory) { }

  onApplicationShutdown() {
    Object.keys(this.conn.buckets).forEach((bucket) =>
      this.conn.buckets[bucket].conn.close(undefined),
    );
  }

  static forRoot(config: CouchbaseConnection): DynamicModule {
    const providers = createCouchbaseConnectionProviders(config);
    return CouchbaseCoreModule.outputDynamicModule(providers);
  }

  static forRootAsync(options: CouchbaseModuleAsyncOptions): DynamicModule {
    const providers = createCouchbaseAsyncConnectionProviders(options);
    return CouchbaseCoreModule.outputDynamicModule(providers);
  }

  private static outputDynamicModule(providers: Provider[]): DynamicModule {
    return {
      module: CouchbaseCoreModule,
      providers,
      exports: providers,
    };
  }
}
