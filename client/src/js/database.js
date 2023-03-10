import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ id: 1, value: content });
  const result = await request;
}

export const getDb = async () => {
  // open the db
  const todosDb = await openDB('jate', 1);
  // create transaction that specifies its readonly
  const tx = todosDb.transaction('jate', 'readonly');
  // create the store object
  const store = tx.objectStore('jate');
  // create the request
  const request = store.getAll();
  // wait for promise to complete with the data from jate db
  const result = await request;
  return result.value;

}

initdb();
