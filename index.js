#!/usr/bin/env node

// Required packages:
ejs = require('ejs');
inflection = require('inflection');
fs = require('fs-extra');
path = require('path');
jsb = require('js-beautify').js_beautify;
funks = require(path.resolve(__dirname, 'funks.js'));
program = require('commander');

modelsCreated = require(path.resolve(__dirname, 'modelsNames.js'));


// Parse command-line-arguments and execute:
program
  .arguments('<directory>')
  .option('--baseUrl <URL>',
    'The URL to the backend server, e.g. http://my.service.org:3000')
  .option('--name <modelName>',
    'The name of the model as provided to \'sequelize model:create\'.')
  .option('--attributes <model_attributes>',
    'The model attributes as provided to \'sequelize model:create\'.')
  .option(
    '--belongsTos <ModelName1:foreignKey:id:label:subLabel, ModelName2:foreignKey:id:label:subLabel, ...>',
    'ModelName as instantiated in Sequelize, foreignKey name of the column holding the belongsTo foreignKey, id name of the primaryKey column in the target model, label name of the column to be used as a display name, subLabel optional name of the column in the target model to be used as a sub-label'
  ).option(
    '--hasManys <relationName1:targetModel:label:subLabel, relationName2:targetModel:label:subLabel, ...>',
    'Used for relations of type one-to-many or many-to-many. Will provide create or edit support for these relations. "detailView" will display relations scrollable.'
  ).parse(process.argv);

// Do your job:
var directory = program.args[0]
console.log('\nRender GUI components for arguments:\ndirectory: %s name: %s attributes: %s belongsTos: %s hasManys: %s',
  directory, program.name, program.attributes, program.belongsTos, program.hasManys);

var ejbOpts = {
  baseUrl: program.baseUrl,
  name: program.name,
  nameLc: program.name.toLowerCase(),
  namePl: inflection.pluralize(program.name),
  namePlLc: inflection.pluralize(program.name).toLowerCase(),
  attributesArr: funks.attributesArray(program.attributes),
  typeAttributes: funks.typeAttributes(funks.attributesArray(program.attributes)),
  belongsTosArr: funks.parseBelongsTos(program.belongsTos),
  hasManysArr: funks.parseHasManys(program.hasManys)
}
var componentsDir = path.resolve(directory, "src", "components")
// table
var table = path.resolve(componentsDir, ejbOpts['namePl'] + '.vue')
funks.renderToFile(table, 'tableView', ejbOpts)
// custom actions
var customActions = path.resolve(componentsDir, program.name +
  'CustomActions.vue')
funks.renderToFile(customActions, 'customActions', ejbOpts)
// details
var details = path.resolve(componentsDir, program.name + 'DetailRow.vue')
funks.renderToFile(details, 'detailView', ejbOpts)
// form elements
// console.log("belongsTosArr: " + JSON.stringify(ejbOpts.belongsTosArr));
var formElmns = path.resolve(componentsDir, program.name + 'FormElemns.vue')
funks.renderToFile(formElmns, 'formElements', ejbOpts)
// create form
var createForm = path.resolve(componentsDir, program.name + 'CreateForm.vue')
funks.renderToFile(createForm, 'createForm', ejbOpts)
// upload CSV / XLSX form
var uploadCsvForm = path.resolve(componentsDir, program.name + 'UploadCsvForm.vue')
funks.renderToFile(uploadCsvForm, 'uploadCsvForm', ejbOpts)
// edit form
var editForm = path.resolve(componentsDir, program.name + 'EditForm.vue')
funks.renderToFile(editForm, 'editForm', ejbOpts)
// routes
var routesExt = path.resolve(directory, "src", "router", program.name +
  "Routes.js")
funks.renderToFile(routesExt, 'routes', ejbOpts)
// automatically injects models components into routes array (index.js file)
var modelsObj = modelsCreated.getSavedModelsNames(program.name, directory);
var indexRoutesExt = path.resolve(directory, "src", "router", "index.js")
funks.renderToFile(indexRoutesExt, 'routes_index', modelsObj)
// constants
var constants = path.resolve(directory, "src", "sciencedb-globals.js")
funks.renderToFile(constants, 'global_constant', ejbOpts)
// Copy static (not to be rendered) code into target dir, if not already
// present:
var filtBarPath = path.resolve(directory, 'src', 'components', 'FilterBar.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'FilterBar.vue'), filtBarPath)
var forKeyPath = path.resolve(directory, 'src', 'components',
  'foreignKeyFormElement.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'foreignKeyFormElement.vue'),
  forKeyPath)
var hasManyPath = path.resolve(directory, 'src', 'components',
  'hasManyFormElemn.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'hasManyFormElemn.vue'),
  hasManyPath)
var datePickerPath = path.resolve(directory, 'src', 'components',
  'datePicker.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'datePicker.vue'),
  datePickerPath)
var addNewPath = path.resolve(directory, 'src', 'components', 'AddNewEntityButton.vue')
funks.copyFileIfNotExists(path.resolve(__dirname, 'AddNewEntityButton.vue'), addNewPath)
// DONE
console.log("\nDONE\n");
