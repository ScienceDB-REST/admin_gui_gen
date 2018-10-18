const expect = require('chai').expect;
const testData = require('./test-data');
const models = require('./data-models');
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

describe('GraphQL Queries', function(){
    let modelsObj = funks.fillOptionsForViews(models.book) ;

    //test router file
    it('VueTable query',async function(){
       let file = await funks.renderTemplate('tableView',modelsObj);
        let created_table = file.replace(/\s/g, '');
        let test_table = testData.book_table.replace(/\s/g, '');
        expect(created_table).to.be.equal(test_table);
    });
  });

  describe('FormElementVue ', function(){
      let modelsObj = funks.fillOptionsForViews(models.dog) ;

      //test router file
      it('DogFormElemns - onlyBelongsTo',async function(){
         let file = await funks.renderTemplate('formElements',modelsObj);
          let created_formElement = file.replace(/\s/g, '');
          let test_formElement = testData.DogFormElem.replace(/\s/g, '');
          expect(created_formElement).to.be.equal(test_formElement);
      });
    });

  describe('CreateForm ', function(){
    let modelsObj = funks.fillOptionsForViews(models.dog) ;

    //test router file
    it('DogCreateForm - onlyBelongsTo',async function(){
       let file = await funks.renderTemplate('createForm',modelsObj);
        let created_formElement = file.replace(/\s/g, '');
        let test_formElement = testData.DogCreateForm.replace(/\s/g, '');
        expect(created_formElement).to.be.equal(test_formElement);
    });
  });

  describe('GraphQl Requests ', function(){
    let modelsObj = funks.fillOptionsForViews(models.dog) ;

    //test router file
    it('Add Request - dog',async function(){
       let file = await funks.renderTemplate('graphqlRequests',modelsObj);
        let created_requests = file.replace(/\s/g, '');
        let test_requests = testData.DogRequests.replace(/\s/g, '');
        expect(created_requests).to.be.equal(test_requests);
    });
  });

  describe('EditForm', function(){
    let modelsObj = funks.fillOptionsForViews(models.dog) ;

    //test router file
    it('DogEditForm - onlyBelongsTo',async function(){
       let file = await funks.renderTemplate('editForm',modelsObj);
        let created_editForm = file.replace(/\s/g, '');
        let test_editForm = testData.DogEdit.replace(/\s/g, '');
        expect(created_editForm).to.be.equal(test_editForm);
    });
  });

  describe('CustomActionsForm', function(){
    let modelsObj = funks.fillOptionsForViews(models.dog) ;

    //test router file
    it('Delete in custom actions - dog',async function(){
       let file = await funks.renderTemplate('customActions',modelsObj);
        let created_customActions = file.replace(/\s/g, '');
        let test_customActions = testData.DogCustomActions.replace(/\s/g, '');
        expect(created_customActions).to.be.equal(test_customActions);
    });
  });
