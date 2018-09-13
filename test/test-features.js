const expect = require('chai').expect;
const testData = require('./test-data');
ejs = require('ejs');
funks = require('../funks.js');

describe('Features Test', function(){
    let modelsObj = testData.modelsObj;

    //test router file
    it('Router index file', function(done){
      funks.renderTemplate('routes_index',modelsObj)
      .then( (file) =>{
        let created_routes = file.replace(/\s/g, '');
        let test_routes = testData.routes.replace(/\s/g, '');
        expect(created_routes).to.be.equal(test_routes);
        done();
      });
    });

    //test navigation bar file
    it('Side navigation bar file', function(done){
      funks.renderTemplate('sideNav', modelsObj)
      .then( (file) =>{
        let created_sideNav = file.replace(/\s/g, '');
        let test_sideNav = testData.sideNav.replace(/\s/g, '');
        expect(created_sideNav).to.be.equal(test_sideNav);
        done();
      });
    });

});
