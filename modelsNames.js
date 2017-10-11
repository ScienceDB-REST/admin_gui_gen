inflection = require('inflection');
list = require('list-dir');
_ = require('lodash');

exports.getSavedModelsNames = function (newModel) {
    var filesNames = list.sync('/root/projects/ScienceDbGui/src/router')

    var models = _.filter(filesNames, function(name) { 
        return _.includes(name, 'Routes.js');
    });

    var createdModels = _.map(models, function(model){
        var modelElem = model.replace("Routes.js", "");
        return {
            name:modelElem,
            nameLc: modelElem.toLowerCase(),
            namePl: inflection.pluralize(modelElem),
            namePlLc: inflection.pluralize(modelElem).toLowerCase()
        }
    })

    if(!_.includes(models, newModel + "Routes.js")){
        createdModels.push({
            name:newModel,
            nameLc: newModel.toLowerCase(),
            namePl: inflection.pluralize(newModel),
            namePlLc: inflection.pluralize(newModel).toLowerCase()
        })
    }

    return {models: createdModels}
}
