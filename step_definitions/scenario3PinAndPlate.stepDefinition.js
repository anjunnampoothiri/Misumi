
let data = require('../data/input_data/dataset.json');
let expectedData = require('../data/expected_results/common.json');
let pinPlate = require('../data/expected_results/pinandplate.json');
let loginPage = require('../functions/login.js');
let uploadPage = require('../functions/upload.js');
let projectPage = require('../functions/project_page');
let orderPage = require('../functions/order_page');


module.exports = function () {

  this.Given(/^Upload 3D data for pin and plate$/, () => {
    path = data.uploadPath.pinPlate;
    uploadPage.upload(path);
  });

  this.When(/^Verify if upload is successfull for pin and plate$/, () => {
    uploadPage.verifyUpload(pinPlate.projectName);
  });

  this.When(/^User define quotation condition for the pin and plate$/, () => {
    uploadPage.quotationConditionFill(pinPlate.quotationCondition);
  });

  this.Then(/^Check 3D Thumb nail of pin and plate appears$/, () => {
    uploadPage.checkThumbNail('pinandplateexpected/pinandplatethumbnail.png');
  });

  this.When(/^User verify project name and price for pin and plate$/, () => {
    uploadPage.checkNameAndPrice(pinPlate.projectName);
  });

   this.Given(/^User Open the uploaded pin and plate project$/, () => {
    projectPage.openProject();
  });

  this.When(/^User check feature recognition for pin and plate$/, () => {
    projectPage.compareImage('pinAndPlate.png', 'pinandplateexpected/pinAndPlate.png');
  });


};

