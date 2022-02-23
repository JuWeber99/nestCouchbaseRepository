import { CouchbaseConnection } from "../../src";

export const config: CouchbaseConnection = {
  url: 'couchbase://127.0.0.1',
  config: {
    username: 'Administrator',
    password: 'password',
  },
  bucketName: "e2etest"
};

export const bucketOptions = { bucketType: 'ephemeral', replicaNumber: 0 };
