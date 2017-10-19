var unique = require('array-unique');
var exports = module.exports = {};
var fs = require('fs-extra');
var inflection = require('inflection')

// Render EJB template
exports.renderTemplate = function (templateName, options) {
  return ejs.renderFile(__dirname + '/views/pages/' + templateName +
    '.ejs', options, {},
    function (err, str) {
      if (err) {
        console.log("Error in renderTemplate(...):\n" + err)
      } else {
        return str
      }
    })
}

// Write rendered string into file
exports.renderToFile = function (outFile, templateName, options) {
  console.log("options:\n" + JSON.stringify(options) + "\n");
  fs.writeFile(outFile, exports.renderTemplate(templateName, options), function (err) {
    if (err) {
      console.log(err)
      return err
    }
    console.log("Wrote rendered content into '%s'.", outFile)
  })
}

// Parse input 'attributes' argument into array of arrays:
// [ [ 'name':'string' ], [ 'is_human':'boolean' ] ]
exports.attributesArray = function (attributesStr) {
  return attributesStr.trim().split(/[\s,]+/).map(function (x) {
    return x.trim().split(':')
  });
}

// Collect attributes into a map with keys the attributes' types and values the
// attributes' names: { 'string': [ 'name', 'last_name' ], 'boolean': [
// 'is_human' ] }
exports.typeAttributes = function (attributesArray) {
  y = {};
  attributesArray.forEach(function (x) {
    if (!y[x[1]]) y[x[1]] = [x[0]]
    else y[x[1]] = y[x[1]].concat([x[0]])
  })
  return y;
}

exports.associationsArray = function (associationsStr) {
  if (typeof associationsStr === 'undefined') {
    return []
  }
  return associationsStr.trim().split(/\s+|,/).filter(function (x) {
    return x !== ''
  }).map(function (x) {
    return x.trim().split(/:/)
  })
}

// parses the CLI argument --belongsTos and returns the values as an array of
// BelongTo Objects:
exports.parseBelongsTos = function (belongsTosStr) {
  var belongsTosObject = JSON.parse(belongsTosStr);
  console.log('obj', belongsTosObject)

  var belongsTosArray = []

  for(var i = 0; i < belongsTosObject.length; i++) {
    var belongsTosEntity = {}

    if(belongsTosObject[i].hasOwnProperty('as')){
      belongsTosEntity = {
        targetModel: belongsTosObject[i].targetModel,
        foreignKey: belongsTosObject[i].foreignKey,
        primaryKey: belongsTosObject[i].primaryKey,
        label: belongsTosObject[i].label,
        subLabel: belongsTosObject[i].subLabel,
        as: belongsTosObject[i].as,
        targetModelLc: belongsTosObject[i].targetModel.toLowerCase(),
        targetModelPlLc: inflection.pluralize(belongsTosObject[i].targetModel).toLowerCase()
      }
    }
    else {
      belongsTosEntity = {
        targetModel: belongsTosObject[i].targetModel,
        foreignKey: belongsTosObject[i].foreignKey,
        primaryKey: belongsTosObject[i].primaryKey,
        label: belongsTosObject[i].label,
        subLabel: belongsTosObject[i].subLabel,
        targetModelLc: belongsTosObject[i].targetModel.toLowerCase(),
        targetModelPlLc: inflection.pluralize(belongsTosObject[i].targetModel).toLowerCase()
      }
    }
    console.log('item',belongsTosEntity)
    belongsTosArray.push(belongsTosEntity)
  }

  return belongsTosArray
}

// Copies file found under sourcePath to targetPath if and only if target does
// not exist:
exports.copyFileIfNotExists = function (sourcePath, targetPath) {
  fs.stat(targetPath, function (err, stat) {
    if (err != null) {
      fs.copySync(sourcePath, targetPath);
    }
  })
}
