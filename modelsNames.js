inflection = require('inflection');
list = require('list-dir');
_ = require('lodash');

exports.getSavedModelsNames = function (newModel, directory) {
    var filesNames = list.sync(directory)

    var models = _.map(_.filter(filesNames, function(name) {
        return _.includes(name, 'Routes.js');
    }), function(filePath) {
        return filePath.toString().replace(/.*\//, "")
    });

    var createdModels = _.map(models, function(model){
        var modelElem = model.replace("Routes.js", "");
        return {
            name:modelElem,
            nameLc: modelElem.toLowerCase(),
            namePl: inflection.pluralize(modelElem),
            namePlLc: inflection.pluralize(modelElem).toLowerCase(),
            nameCp: inflection.capitalize(modelElem)
        }
    })

    if(newModel!= "" && !_.includes(models, newModel + "Routes.js")){
        createdModels.push({
            name:newModel,
            nameLc: newModel.toLowerCase(),
            namePl: inflection.pluralize(newModel),
            namePlLc: inflection.pluralize(newModel).toLowerCase(),
            nameCp: inflection.capitalize(newModel)
        })
    }

    return {models: createdModels}
}
