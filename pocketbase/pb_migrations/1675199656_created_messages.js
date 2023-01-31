migrate((db) => {
  const collection = new Collection({
    "id": "kktiyaqaajgvjwt",
    "created": "2023-01-31 21:14:16.890Z",
    "updated": "2023-01-31 21:14:16.890Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ogijvb5i",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 160,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "aja2q96o",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kktiyaqaajgvjwt");

  return dao.deleteCollection(collection);
})
