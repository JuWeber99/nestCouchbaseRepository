import { Module, DynamicModule } from '@nestjs/common';

import { CouchbaseModuleAsyncOptions } from './interfaces';
import { CouchbaseCoreModule } from './couchbase-core.module';
import { createCouchbaseProviders } from './providers';
import { CouchbaseConnection } from '../couchbase/interfaces/connection-config.interface';

@Module({})
export class CouchbaseModule {
  static forRoot(config: CouchbaseConnection): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCoreModule.forRoot(config)],
    };
  }

  static forRootAsync(options: CouchbaseModuleAsyncOptions): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCoreModule.forRootAsync(options)],
    };
  }

  static forEntity(entities: Function[] | any): DynamicModule {
    const providers = createCouchbaseProviders(entities);
    console.log("test:" + providers)
    return {
      module: CouchbaseModule,
      providers,
      exports: providers,
    };
  }
}
