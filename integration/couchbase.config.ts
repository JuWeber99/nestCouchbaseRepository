import { CouchbaseConnection } from "../src/couchbase/interfaces/connection-config.interface";

export const config: CouchbaseConnection = {
  url: 'couchbase://127.0.0.1',
  config: {
    username: "Administrator",
    password: "password",
  },
  bucketName: "test"

};
