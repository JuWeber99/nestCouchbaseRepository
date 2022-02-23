import { ConnectOptions } from 'couchbase';

export interface CouchbaseConnection {
    url: string
    config: ConnectOptions
    bucketName?: string,
    collectionName?: string
    mock?: boolean
}

