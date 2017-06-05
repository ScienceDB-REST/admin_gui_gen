# admin_gui_gen

`sequelize/cli` code generation of associations. Disclaiming in all honesty, that it's done in a somewhat quick and dirty way.

See this [`sequelize/cli` Issue](https://github.com/sequelize/cli/issues/435) for more details.

## Usage

    admin_gui_gen --modelFile ./my_project/server/models/todo.js --migrationFile ./my_project/server/migrations/<date>-create-todo.js --name Todo --associations 'User:belongsTo'

## What it's meant for

The goal is simple, I wanted to extend the task `model:create`  to accept another argument `associations`, e.g. 
    
    sequelize model:create --name User --attributes 'name:string, email:string' --associations 'Todo: hasMany'
    sequelize model:create --name Todo --attributes 'name:string, description:string, urgency:integer' --associations 'User:belongsTo'

The desired outcome in the generated model and migration files should be the usual, with the following extensions:

    // user.js
    classMethods: {
       associate: function(models) {
         User.hasMany(models.Todo);
       }
     }


    // todo.js
    classMethods: {
      associate: function(models) {
        Todo.belongsTo(models.User);
      }
    }

... and, of course in the migration of `Todo`:

    // <date>-create-todo.js
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    }
