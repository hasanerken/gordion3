import PouchDB from "pouchdb";

export const huid = length => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
    ""
  );
  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }
  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

export const sortObject = unsortedItems => {
  let sortedItems = {};
  Object.keys(unsortedItems)
    .sort((a, b) => unsortedItems[a].position - unsortedItems[b].position)
    .forEach(key => (sortedItems[key] = unsortedItems[key]));
  return sortedItems;
};

export const db = new PouchDB("gordion");
export const remoteDB = new PouchDB("http://localhost:5984/gordion");
