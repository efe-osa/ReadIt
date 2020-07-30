import { PostResponse } from 'app/types';
import * as idb from 'idb';

const cacheName = 'readItPosts';
const version = 1;
const tableName = 'reddit';

async function initialiseCache() {
  const cacheDB = await idb.openDB<PostResponse>(cacheName, version, {
    upgrade(db) {
      db.createObjectStore(tableName);
      // const tx = db.transaction(tableName, 'readwrite');
      // return tx;
    },
  });
  return cacheDB;
}

export async function IDBService() {
  let idbCache = await initialiseCache();

  const get = (key: string) => {
    return idbCache.transaction(tableName, 'readonly').objectStore(tableName).get(key);
  };
  const put = (value: string) => {
    const redditTable = idbCache.transaction(tableName, 'readwrite').objectStore(tableName);
    return redditTable.put(value, 'posts').catch((err) => err.message);
  };
  const remove = (key: string) => {
    return idbCache.transaction(tableName, 'readwrite').objectStore(tableName).delete(key);
  };
  return { get, put, remove };
}
