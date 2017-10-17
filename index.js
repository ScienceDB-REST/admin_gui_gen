#!/usr/bin/env node

// Required packages:
ejs = require('ejs');
inflection = require('inflection');
fs = require('fs-extra');
path = require('path');
jsb = require('js-beautify').js_beautify;
funks = require(path.resolve(__dirname, 'funks.js'));
program = require('commander');


// Parse command-line-arguments and execute:
program
  .arguments('<directory>')
  .option('--baseUrl <URL>', 'The URL to the backend server, e.g. http://my.service.org:3000')
  .option('--name <modelName>',
    'The name of the model as provided to \'sequelize model:create\'.')
  .option('--attributes <model_attributes>',
    'The model attributes as provided to \'sequelize model:create\'.')
  .option(
    '--belongsTos <ModelName1:foreignKey:id:label:subLabel, ModelName2:foreignKey:id:label:subLabel, ...>',
    'ModelName as instantiated in Sequelize, foreignKey name of the column holding the belongsTo foreignKey, id name of the primaryKey column in the target model, label name of the column to be used as a display name, subLabel optional name of the column in the target model to be used as a sub-label'
  ).parse(process.argv);

// Do your job:
var directory = program.args[0]
console.log('directory: %s name: %s attributes: %s belongsTos: %s',
  directory, program.name, program.attributes, program.belongsTos);
var ejbOpts = {
  baseUrl: program.baseUrl,
  name: program.name,
  nameLc: program.name.toLowerCase(),
  namePl: inflection.pluralize(program.name),
  namePlLc: inflection.pluralize(program.name).toLowerCase(),
  attributesArr: funks.attributesArray(program.attributes),
  typeAttributes: funks.typeAttributes(funks.attributesArray(program.attributes)),
  belongsTosArr: funks.parseBelongsTos(program.belongsTos),
}
var componentsDir = path.resolve(directory, "src", "components")
// table
var table = path.resolve(componentsDir, ejbOpts['namePl'] + '.vue')
funks.renderToFile(table, 'tableView', ejbOpts)
// custom actions
var customActions = path.resolve(componentsDir, program.name + 'CustomActions.vue')
funks.renderToFile(customActions, 'customActions', ejbOpts)
// details
var details = path.resolve(componentsDir, program.name + 'DetailRow.vue')
funks.renderToFile(details, 'detailView', ejbOpts)
// form elements
console.log("belongsToArr: " + JSON.stringify(ejbOpts.belongsTosArr));
var formElmns = path.resolve(componentsDir, program.name + 'FormElemns.vue')
funks.renderToFile(formElmns, 'formElements', ejbOpts)
// create form
var createForm = path.resolve(componentsDir, program.name + 'CreateForm.vue')
funks.renderToFile(createForm, 'createForm', ejbOpts)
// edit form
var editForm = path.resolve(componentsDir, program.name + 'EditForm.vue')
funks.renderToFile(editForm, 'editForm', ejbOpts)
// routes
var routesExt = path.resolve( directory, "src", "router", program.name + "Routes.js" )
funks.renderToFile(routesExt, 'routes', ejbOpts)
// Copy static (not to be rendered) code into target dir, if not already
// present:
var filtBarPath = path.resolve(directory, 'src', 'components', 'FilterBar.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'FilterBar.vue'), filtBarPath)
var forKeyPath = path.resolve(directory, 'src', 'components', 'foreignKeyFormElement.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'foreignKeyFormElement.vue'), forKeyPath)
// DONE
console.log("\nDONE");
