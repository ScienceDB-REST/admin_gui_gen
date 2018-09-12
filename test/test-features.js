const expect = require('chai').expect;
const testData = require('./test-data');
ejs = require('ejs');
fs = require('fs-extra');
path = require('path');
funks = require('../funks.js');
modelsCreated = require('../modelsNames.js');

create_directory_for_test = function(path_to_directory){
  if(!fs.existsSync(path_to_directory))
  {
    fs.mkdirSync(path_to_directory);
  }
}

create_directory_for_test(__dirname+'/generated-data');
create_directory_for_test(__dirname+'/generated-data/src');
create_directory_for_test(__dirname+'/generated-data/src/components');
create_directory_for_test(__dirname+'/generated-data/src/router');

describe('Features Test', function(){
    let path_json_files = path.resolve(__dirname, 'test-json-files');
    let promises = []
    fs.readdirSync(path_json_files).forEach( (json_file) =>{
        console.log(json_file);
        let ejbOpts = funks.fillOptionsForViews(path_json_files+'/'+json_file);
        let routesExt = path.resolve(__dirname, 'generated-data', "src", "router", ejbOpts.name +
          "Routes.js")
        promises.push( funks.renderToFile(routesExt, 'routes', ejbOpts))
    });

    let promise_files = []
    Promise.all(promises).then(()=>{
      let modelsObj = modelsCreated.getSavedModelsNames("", path.resolve(__dirname,'generated-data'));
      let indexRoutesExt = path.resolve(__dirname,'generated-data', "src", "router", "routes_index.js")
      promise_files.push(funks.renderToFile(indexRoutesExt, 'routes_index', modelsObj) );
      let sideNavPath = path.resolve(__dirname,'generated-data',"src","components","SideNav.vue")
      promise_files.push(funks.renderToFile(sideNavPath, 'sideNav', modelsObj) );
      Promise.all(promise_files).then(()=>{
        console.log('Written routes and sideNav');

      })
    })
    .catch((error)=>{console.log(error); console.log("Routes models were not written properly")});

    //test router file
    it('Router index file', function(done){
        fs.readFile( path.resolve(__dirname,'generated-data','src','router', 'routes_index.js'),'utf8', (err,data)=>{
          let created_routes = data.replace(/\s/g, '');
          let test_routes = testData.routes.replace(/\s/g, '');
          expect(created_routes).to.be.equal(test_routes);
          done();
        });
    });

    //test navigation bar file
    it('Side navigation bar file', function(done){
        fs.readFile( path.resolve(__dirname,'generated-data','src','components', 'SideNav.vue'),'utf8', (err,data)=>{
          let created_sideNav = data.replace(/\s/g, '');
          let test_sideNav = testData.sideNav.replace(/\s/g, '');
          expect(created_sideNav).to.be.equal(test_sideNav);
          done();
        });
    });

});
