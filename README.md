# admin_gui_gen

Code generator for VueJs implementing basic CRUD use cases.

## Usage

From the command line prompt

````
 admin_gui_gen -h

  Usage: admin_gui_gen [options] <directory>


  Options:

    --baseUrl <URL>                                                                                       The URL to the backend server, e.g. http://my.service.org:3000
    --name <modelName>                                                                                    The name of the model as provided to 'sequelize model:create'.
    --attributes <model_attributes>                                                                       The model attributes as provided to 'sequelize model:create'.
    --belongsTos <ModelName1:foreignKey:id:label:subLabel, ModelName2:foreignKey:id:label:subLabel, ...>  ModelName as instantiated in Sequelize, foreignKey name of the column holding the belongsTo foreignKey, id name of the primaryKey column in the target model, label name of the column to be used as a display name, subLabel optional name of the column in the target model to be used as a sub-label
    -h, --help                                                                                            output usage information
````
