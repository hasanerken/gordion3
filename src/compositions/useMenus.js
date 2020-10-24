import { reactive, onMounted } from "vue";
// import { huid } from "@/compositions/useFunctions";
import { db } from "./useFunctions";

const menus = reactive({});

export default function useMenu() {
  db.changes({ since: "now", live: true, include_docs: true }).on(
    "change",
    function(change) {
      // yo, something changed!
      console.log("db changes", change.deleted);
      db.allDocs({
        startkey: "menu_",
        endkey: "menu_\uffff",
        include_docs: true
      }).then(function(items) {
        console.log("db changes", change.deleted);
        if (change.deleted) {
          console.log("delelelelelelele");
          delete menus[change.id];
        }
        items.rows.forEach(item => (menus[item.id] = item.doc.menu));
      });
    }
  );
  onMounted(() => {
    console.log("usemenus on mounted hook");
    db.allDocs({
      startkey: "menu_",
      endkey: "menu_\uffff",
      include_docs: true
    })
      .then(function(items) {
        items.rows.forEach(item => (menus[item.doc._id] = item.doc.menu));
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  function addMenu(payload) {
    db.put(payload).then(function() {
      menus[payload._id] = payload.menu;
    });
  }

  function updateMenu(payload) {
    db.get(payload._id)
      .then(function(doc) {
        return db.put({
          _id: doc._id,
          _rev: doc._rev,
          menu: payload.menu
        });
      })
      .then(function() {
        // handle response
        menus[payload._id] = payload.menu;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function deleteMenu(menuId) {
    db.get(menuId)
      .then(function(doc) {
        return db.remove(doc);
      })
      .then(() => delete menus[menuId]);
  }

  function getMenu(menuId) {
    return menus[menuId];
  }

  function getMenusLength() {
    return Object.keys(menus).length;
  }
  return { menus, addMenu, updateMenu, deleteMenu, getMenu, getMenusLength };
}
