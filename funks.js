var unique = require('array-unique');
var exports = module.exports = {};
var fs = require('fs-extra');
var inflection = require('inflection')

// Render EJB template
exports.renderTemplate = function(templateName, options) {
  return ejs.renderFile(__dirname + '/views/pages/' + templateName +
    '.ejs', options, {},
    function(err, str) {
      if (err) {
        console.log("Error in renderTemplate(...):\n" + err)
      } else {
        return str
      }
    })
}

// Write rendered string into file
exports.renderToFile = function(outFile, templateName, options) {
  // console.log("options:\n" + JSON.stringify(options) + "\n");
  fs.writeFile(outFile, exports.renderTemplate(templateName, options),
    function(err) {
      if (err) {
        console.log(err)
        return err
      }
      console.log("Wrote rendered content into '%s'.", outFile)
    })
}

// Parse input 'attributes' argument into array of arrays:
// [ [ 'name':'string' ], [ 'is_human':'boolean' ] ]
exports.attributesArray = function(attributesStr) {
  if (attributesStr !== undefined && attributesStr !== null && typeof attributesStr ===
    'string') {
    return attributesStr.trim().split(/[\s,]+/).map(function(x) {
      return x.trim().split(':')
    });
  } else {
    return []
  }
}

// Collect attributes into a map with keys the attributes' types and values the
// attributes' names: { 'string': [ 'name', 'last_name' ], 'boolean': [
// 'is_human' ] }
exports.typeAttributes = function(attributesArray) {
  y = {};
  attributesArray.forEach(function(x) {
    if (!y[x[1]]) y[x[1]] = [x[0]]
    else y[x[1]] = y[x[1]].concat([x[0]])
  })
  return y;
}

exports.associationsArray = function(associationsStr) {
  if (typeof associationsStr === 'undefined') {
    return []
  }
  return associationsStr.trim().split(/\s+|,/).filter(function(x) {
    return x !== ''
  }).map(function(x) {
    return x.trim().split(/:/)
  })
}

// parses the CLI argument --belongsTos and returns the values as an array of
// BelongTo Objects:
exports.parseBelongsTos = function(belongsTosStr) {
  return exports.associationsArray(belongsTosStr).map(function(bt) {
    return {
      targetModel: bt[0],
      foreignKey: bt[1],
      primaryKey: bt[2],
      label: bt[3],
      subLabel: bt[4],
      targetModelLc: bt[0].toLowerCase(),
      targetModelPlLc: inflection.pluralize(bt[0]).toLowerCase(),
      relationName: bt[5] || bt[0]
    }
  })
}

// parses the CLI argument --hasManys and returns the values as an array of
// relations Objects:
exports.parseHasManys = function(hasManysStr) {
  return exports.associationsArray(hasManysStr).map(function(rel) {
    return {
      relationName: rel[0],
      label: rel[1],
      subLabel: rel[2]
    }
  })
}

// Copies file found under sourcePath to targetPath if and only if target does
// not exist:
exports.copyFileIfNotExists = function(sourcePath, targetPath) {
  fs.stat(targetPath, function(err, stat) {
    if (err != null) {
      fs.copySync(sourcePath, targetPath);
    }
  })
}
