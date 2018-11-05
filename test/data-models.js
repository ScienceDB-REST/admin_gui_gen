module.exports.book = {
  "model" : "Book",
  "storageType" : "sql",
  "attributes" : {
    "title" : "String",
    "genre" : "String"
  },
  "associations":{

      "people" : {
          "type" : "sql_belongsToMany",
          "target" : "Person",
          "targetKey" : "personId",
          "sourceKey" : "bookId",
          "keysIn" : "books_to_people",
          "targetStorageType" : "sql",
          "label" : "firstName",
          "sublabel" : "email"
        },
      "publisher" : {
        "type" : "cross_belongsTo",
        "target" : "Publisher",
        "targetKey" : "publisherId",
        "targetStorageType" : "webservice",
        "label" : "name"
        }
  }
}
module.exports.dog = {
  "model" : "Dog",
  "storageType" : "Sql",
  "attributes" : {
    "name" : "String",
    "breed" : "String"
  },

  "associations" : {
    "person" : {
      "type" : "sql_belongsTo",
      "target" : "Person",
      "targetKey" : "personId",
      "targetStorageType" : "sql",
      "label": "firstName"
    },
    "researcher":{
      "type" : "sql_belongsTo",
      "target": "Researcher",
      "targetKey": "researcherId",
      "targetStorageType": "SQL",
      "label": "firstName"
    }
  }
}

module.exports.project = {
  "model" : "Project",
  "storageType" : "SQL",
  "attributes" : {
    "name" : "String",
    "description" : "String"
  },
  "associations":{
    "specie":{
      "type" : "cross_belongsTo",
      "target" : "Specie",
      "targetKey" : "specieId",
      "targetStorageType" : "webservice",
      "label" : "nombre",
      "sublabel" : "nombre_cientifico"
    },

    "researchers" : {
      "type" : "sql_belongsToMany",
      "target" : "Researcher",
      "targetKey" : "researcherId",
      "sourceKey" : "projectId",
      "keysIn" : "project_to_researcher",
      "targetStorageType" : "sql",
      "label" : "firstName",
      "sublabel" : "lastName"
    }
  }
}

module.exports.person = {
  "model" : "Person",
  "storageType" : "SQL",
  "attributes" : {
    "firstName" : "String",
    "lastName" : "String",
    "email" : "String"
  },
  "associations":{
    "dogs":{
      "type" : "sql_hasMany",
      "target" : "Dog",
      "targetKey" : "personId",
      "targetStorageType" : "sql",
      "label": "name"
    },

    "books":{
      "type" : "sql_belongsToMany",
      "target" : "Book",
      "targetKey" : "bookId",
      "sourceKey" : "personId",
      "keysIn" : "books_to_people",
      "targetStorageType" : "sql",
      "label" : "title"
    }
  }
}
