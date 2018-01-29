let Page = require('./page');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
let parse = require('csv-parse');
let pdfText = require('pdf-text');
let expectedData = require('../data/expected-results/common.json');
/**
 * project Page Object
 *
 * @class functions/project
 * @type {Page}
 */
let  projectPage = {
  /**
   * define elements
   */
  thumbnail: { get : function() { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//figure/img'); }},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); }},
  partsName: { value: function (part) { return browser.element(`(//span[@class="class"])[${part}]`); }},
  partsNameSelector: { value: function(part) { return `div#lstPartsBuy > div:nth-child(${part}) > div.boxPartsInner  p > a` } },
  grouping: { value: function (part) { return browser.element(`(//span[@class="groupItemCount"])[${i}]`); }},
  groupingSelector: { get: function(part) { return 'groupItemCount' } },
  quantityChange: { get: function () { return browser.element('(//input[@type="number"])[1]'); }},
  priceText: { get: function () { return browser.element('//*[@id="boxAmount"]//span[@class="textBold"]'); }},
  partsPriceText: { value: function (n) { return browser.element(`(//p[@class="sum"]/span)[${n}]`); }},
  partsPriceTextSelector: { value: function (part) {return `#lstPartsBuy > div:nth-child(${part}) > div.boxPartsInner > div > div.order > ul > div > p.sum > span`; }},
  groupValue: { value: function (n) {return browser.element(`(//span[@class="groupItemCount"])[${n}]`); }},
  groupImage: { value: function (n) { return browser.element(`(//*[@class="group"]//img)[${n}]`);}},
  manualQuotationPinAndPlate: { get: function () { return browser.element('(//div[@id="lstPartsBuy"]//a[@class="textBold"])[3]'); }},
  materialFieldPartsView: { get: function () { return browser.element('//select[@id="MATERIALTYPE.ARTICLE_TYPE_ID_6.6"]'); }},
  boxButtonpartsview: { get: function () { return browser.element('//ul[@id="boxButton"]/li[4]/a'); }},
  closePopUpButton:{ get: function () { return browser.element('//li[@id="closeBtn"]/a'); }},
  manualOkIconPartsView: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]');}},
  manualOkIconPartsViewSelector: { get: function() { return `  #lstPartsBuy > div.boxParts.read.clickable > div.boxPartsInner > div > ul > li:nth-child(3) > span > img` } },
  unitPriceManuallyQuoted: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]/../../../../div//p[contains(@class, "amount")]//span');}},
  totalPriceDisplayedInPartsView:  { get: function () { return browser.element('//div[@id="boxAmount"]');}},
  manualQuotationPlate: { get: function () { return browser.element('//div[@class="boxInfomation"]/p/a'); }},
  downloadButton:{ get: function () { return browser.element('//li[@class="btnDownload"]'); }},
  downloadPdfOption:{ get: function () { return browser.element('//a[contains(text(),"見積書（PDF）")]'); }},
  downloadCsvOption:{ get: function () { return browser.element('//a[contains(text(),"部品明細一覧（CSV）")]'); }},
  mainSelectionInSelectByPart:{ get: function () { return browser.element('//span[@class="multiCheck"]'); }},
  mainSelectionInSelectByPartDeselect:{ get: function () { return browser.element('//span[@class="multiCheck checked"]'); }},
  mainSelectionInSelectByPartDeselectSelector: { get: function() { return `ul.btnPull.check>li>a>span` } },
  itemName:{ get: function () { return browser.element('(//ul[@class="menuSecond"]//li)[7]'); }},
  corePin:{ get: function () { return browser.element('(//a[contains(text(),"コアピン")])[1]'); }},
  checkPartSelect: { value: function (part) { return browser.element(`(//input[@type="checkbox" and @class="selectedGroup"])[${part}]`); }},
  checkPartSelectSelector: { value: function(part) { return `#lstPartsBuy>div:nth-child(${part})>div.boxPartsInner>div` } },
  customerOrderingNumberField:{ value: function (input) { return browser.element(`(//div[@class="customInput"]//input[@type="text"])[${input}]`);}},
  customerOrderingNumberFieldPart1: { value: function(part) { return `div#lstPartsBuy > div:nth-child(${part}) input.oya`} },
  customerOrderingNumberFieldPart2: { value: function(part) { return `div#lstPartsBuy >div:nth-child(${part}) input.eda`} },
  batchInputOptionSelector:{ get: function() { return `ul.btnPull.other > li > ul > li:nth-child(1) > ul > li:nth-child(1) > a`} },
  inputWizardOptionSelector:{ get: function() { return `ul.btnPull.other > li > ul > li:nth-child(1) > ul > li:nth-child(2) > a`} },
  resetBatchInputSelector:{ get: function() { return `ul.btnPull.other > li > ul > li:nth-child(1) > ul > li:nth-child(3) > a`} },
  listFunctionOpen:{ get: function () { return browser.element('(//li[@class="btnLstFunc"])[3]'); }},
  closeList:{ get: function () { return browser.element('//li[@class="status01"]'); }},
  enterCustomerOderInList:{ get: function () { return browser.element('(//a[@class="level"])[5]'); }},
  batchInput:{ get: function () { return browser.element('//a[contains(text(),"パーツ名を枝番に一括入力")]'); }},
  closeButtonDialog:{ get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  partNumberGroup:{ value: function (part) { return browser.element(`(//span[@class="partNameGroup"])[${part}]`); }},
  undoBatchInput:{ get: function () { return browser.element('//a[contains(text(),"一括入力を元に戻す")]'); }},
  inputWizardList:{ get: function () { return browser.element('//a[contains(text(),"入力ウィザード")]'); }},
  inputWizardInput1:{ get: function () { return browser.element('(//p[@class="input"]//input)[1]'); }},
  inputWizardInput2:{ get: function () { return browser.element('(//p[@class="input"]//input)[2]'); }},
  collectiveInputButton:{ get: function () { return browser.element('(//li[@class="btn"])[5]'); }},
  closeButton:{ get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  corePinMultiplePin:{ get: function () { return browser.element('(//p[@class="model"])[1]//a'); }},
  changeMaterial:{ get: function () { return browser.element('(//div[@class="customSelect"]//select)[2]'); }},
  makeAnEstimate:{ get: function () { return browser.element('//a[contains(text(),"見積をする")]'); }},
  filterOption:{ get: function () { return browser.element('(//li[@class="btnLstFunc"])[2]'); }},
  filterOptionSelector:{ get: function() { return `ul.btnPull.filter > li`} },
  itemNameFilter:{ get: function () { return browser.element('(//a[@class="level"])[4]');}},
  corePinSelector: { get: function() { return `ul.btnPull.filter>li>ul>li:nth-child(3)>ul>li:nth-child(2)>a` } },
  corePinCheckSelector: { get: function() { return `ul.btnPull.check > li > ul > li:nth-child(3) > ul > li:nth-child(2) > a` } },
  corePinFilter:{ get: function () { return browser.element('(//a[contains(text(),"コアピン")])[2]');}},
  corePinList: { value: function (n) {return browser.element(`(//span[@class="class"])[${n}]`); }},
  showAllOption:{ get: function () { return browser.element('//a[@id="displayAll"]');}},
  filtermenu:{ get: function () { return browser.element('(//ul[@class="menuSecond"])[1]');}},
  closeButtonSelector:{ get: function() { return `#closeBtn > a`} },
  corePinMulitplePinSelector: { get: function() { return `#lstPartsBuy>div:nth-child(3) div.boxPartsInner>div>p>a` } },
  modelNumber:{ value: function (n) {return browser.element(`(//div[@class="modelNum"]//span[@data-bind="text: qtOpt.productPartNumber"])[${n}]`);}},
  modelNumberSelector: { value: function (part) {return `#lstPartsBuy > div:nth-child(${part}) > div.boxPartsInner > div > div.modelNum > span:nth-child(2)`; }},
  zoomOut:{ get: function () { return browser.element('//div[@class="WindowFunction"]//a[@onclick="viewer.camera.fit()"]');}},
  backButton: { get : function() { return browser.element('//p[@class="backBtn"]/a'); }},

  /*
   * Open project by clicking on thumbnail
   */
  openProject: {
    value: function() {
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
      browser.longWait();
      this.arrow.waitForVisible();
      browser.params.projectPageUrl = browser.getUrl().match(/^[^&]*/)[0];
    }
  },

  /*
   * Compare expected image with screenshot
   */
  compareImage: {
    value: function(actualImagePath, expectedImagePath) {
      this.arrow.waitForVisible();
      browser.extraLongWait();
      if (this.backButton.isVisible()) {
        this.backButton.click();
        browser.mediumWait();
      }
      this.arrow.click();
      browser.mediumWait();
      browser.windowHandleFullscreen();
      browser.mediumWait();
      this.zoomOut.click();
      browser.extraLongWait();
      var expectedImage = './data/screens/expected-screens/' + expectedImagePath;
      if (fs.existsSync(expectedImage)) {
        browser.saveScreenshot('./data/screens/actual-screens/' + actualImagePath);
        console.log("saved to actual");
      }
      else {
        browser.saveScreenshot('./data/screens/expected-screens/' + expectedImagePath);
        browser.setViewportSize({width: 1280, height: 600});
        this.arrow.click();
        console.log("saved to expected");
        return;
      }
      browser.setViewportSize({width: 1280, height: 600});
      this.arrow.click();
      var actualImage = fs.createReadStream('./data/screens/actual-screens/' + actualImagePath).pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./data/screens/expected-screens/' + expectedImagePath).pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        var actualAccuracy = ((totalPixels - pixelDiff)/totalPixels) * 100;
        console.log(`Image Accuracy: ${actualAccuracy}%`);
        expect(actualAccuracy).to.be.above(expectedData.imageAccuracy);
      }
    }
  },


  /*
   * Compare expected image with screenshot
   */
  compareImageCorePin: {
    value: function(actualImagePath, expectedImagePath) {
      this.arrow.waitForVisible();
      browser.extraLongWait();
      if (this.backButton.isVisible()) {
        this.backButton.click();
        browser.mediumWait();
      }
      this.arrow.click();
      browser.extraLongWait();
      var expectedImage = './data/screens/expected-screens/' + expectedImagePath;
      if (fs.existsSync(expectedImage)) {
        browser.saveScreenshot('./data/screens/actual-screens/' + actualImagePath);
        console.log("corepin saved to actual");
      }
      else {
        browser.saveScreenshot('./data/screens/expected-screens/' + expectedImagePath);
        this.arrow.click();
        console.log("corepin saved to expected");
        return;
      }
      this.arrow.click();
      var actualImage = fs.createReadStream('./data/screens/actual-screens/' + actualImagePath).pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./data/screens/expected-screens/' + expectedImagePath).pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        var actualAccuracy = ((totalPixels - pixelDiff)/totalPixels) * 100;
        console.log(`Image Accuracy: ${actualAccuracy}%`);
        expect(actualAccuracy).to.be.above(expectedData.imageAccuracy);
      }
    }
  },

  /*
   * Increse quantity of part and verify price increases
   */
  quotionConditionInPartsView: {
    value: function(quantity, isPlate = false) {
      browser.extraLongWait();
      if (this.backButton.isVisible()) {
        this.backButton.click();
        browser.mediumWait();
      }
      this.quantityChange.waitForEnabled();
      if (!isPlate) {
        var price = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(price).to.not.be.null;
      }
      browser.execute(function (quantity) {
        element = document.querySelector('input[type="number"]');
        element.value = quantity;
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          element.dispatchEvent(evt);
        } else {
          element.fireEvent("onchange");
        }
      }, quantity);
      browser.longWait();
      if (!isPlate) {
        var newPrice  = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(newPrice).to.be.above(price);
      }
    }
  },

  /*
   * Verify part names for single pin
   * Hide error window and use js scroll for ie
   */
  validatePartNamesAndPrice: {
    value: function(names, count, pinType) {
      this.partsName(1).waitForEnabled();
      browser.execute(function() {
        var error = document.querySelector('.WindowError');
        if (error) error.style.display = 'none';
      });
      for (var i = 1; i <= count; i++) {
        browser.smallWait();
        if (browser.desiredCapabilities.browserName === 'chrome') {
          this.partsName(i).moveToObject();
        } else if (i > 2) {
          browser.scrollToElement(this.partsNameSelector(i+1));
        }
        this.partsName(i).waitForVisible();
        var partName = this.partsName(i).getText();
        expect(partName).to.be.equal(names[`part${i}`]);
        if (pinType === 'single pin') {
          browser.params.singlePinPrice[`part${i}`] = this.partsPriceText(i).getText();
        } else if (pinType === 'multiple pin') {
            if (browser.desiredCapabilities.browserName === 'chrome') {
            this.partsPriceText(i).moveToObject();
          } else {
            browser.scrollToElement(this.partsPriceTextSelector(i+1));
          }
          this.partsPriceText(i).waitForVisible();
          browser.params.multiplePinPrice[`part${i}`] = this.partsPriceText(i).getText();
        } else if (pinType === 'pin and plate') {
          browser.params.pinAndPlatePrice[`part${i}`] = this.partsPriceText(i).getText();
        } else {
          browser.params.platePrice[`part${i}`] = this.partsPriceText(i).getText();
        }
      }
    }
  },

  /*
   * Verify grouping for multiple pin
   */
  checkGrouping: {
    value: function(grouping) {
      for (var i = 1; i <= 4; i++) {
        if (browser.desiredCapabilities.browserName === 'chrome') {
          browser.moveToObject(`(//*[@class="groupItemCount"])[${i}]`);
        } else {
          browser.execute(function(selector, part) {
            var element = document.getElementsByClassName(selector)[part - 1];
            element.scrollIntoView();
          }, this.groupingSelector, i);
        }
        var parts = this.groupValue(i).getText();
        expect(parts).to.be.equal(`[${grouping[i-1]}]`);
        this.groupImage(i).isVisible();
      }
    }
  },

  /*
  * Request manual quotation by user for pin and pin and plate
  */
  estimateConditionPartsview: {
    value: function(estimateCondition, pinType) {
      if (pinType === 'pin and plate'){
        this.manualQuotationPinAndPlate.waitForVisible();
        this.manualQuotationPinAndPlate.click();
      } else {
        browser.extraLongWait();
        this.manualQuotationPlate.waitForVisible();
        this.manualQuotationPlate.click();
      }
      this.materialFieldPartsView.waitForEnabled();
      this.materialFieldPartsView.selectByVisibleText(estimateCondition.material);
      this.boxButtonpartsview.waitForEnabled();
      browser.mediumWait();
      this.boxButtonpartsview.click();
      browser.mediumWait();
      this.closePopUpButton.waitForVisible();
      this.closePopUpButton.click();
      browser.mediumWait();
    }
  },

  /*
  * Checks manually estimated icon is present
  */
  validateManualIconInPartsView: {
    value: function() {
      if (browser.desiredCapabilities.browserName === 'chrome') {
        this.manualOkIconPartsView.moveToObject();
      } else {
        browser.scrollToElement(this.manualOkIconPartsViewSelector);
      }
      this.manualOkIconPartsView.waitForVisible();
      expect(this.manualOkIconPartsView.isVisible()).to.be.equal(true);
    }
  },

  /*
   * Checks unit price in parts view
   */
  validatePriceInPartsView: {
    value: function() {
     var url = browser.getUrl();
      if (browser.desiredCapabilities.browserName === 'chrome') {
       this.unitPriceManuallyQuoted.moveToObject();
     } 
      this.manualOkIconPartsView.waitForVisible();
      var unitPriceDisplayed = this.unitPriceManuallyQuoted.getText().match(/\d+/g).join(",");
      expect(unitPriceDisplayed).to.be.equal(expectedData.unitPrice);
      browser.url(url);
    }
  },

  /*
   * Open the project after manual quotation is done and download pdf
   */
  downloadPdf: {
    value: function() {
      if (browser.desiredCapabilities.browserName === 'chrome') {     
       browser.longWait();
       this.downloadButton.waitForVisible();
       this.downloadButton.click();
       this.downloadPdfOption.waitForVisible();
       this.downloadPdfOption.click(); }
    }
  },

  /*
   * Open the project after manual quotation is done and download pdf
   */
  downloadCsv: {
    value: function() {
      if (browser.desiredCapabilities.browserName === 'chrome') {
       this.downloadCsvOption.waitForVisible();
       this.downloadCsvOption.click(); }
    }
  },

  /*
   * Validate contents of pdf
   */
  validatePdf: {
    value: function(parts, pinType) {
      if (browser.desiredCapabilities.browserName === 'chrome') {
      browser.longWait();
      var files = fs.readdirSync('data/downloads');
      var path = require('path');
      var fileName = browser.params.fileName || require('../data/cad-drawings/filename.json').fileName;
      for (var i in files) {
        if (path.extname(files[i]) === ".pdf") {
          var buffer = fs.readFileSync(`data/downloads/${files[i]}`);
          pdfText(buffer, function(err, chunks) {
            console.log(pinType);
            if (pinType != 'pin and plate' && pinType != 'single pin') {
              expect(chunks.includes(fileName), 'Pdf Validation failed').to.be.equal(true);
            }
            Object.values(parts).forEach((part) => {
              expect(chunks.includes(part), 'Pdf Validation failed').to.be.equal(true);
            });
          })
        }
      }
    }
    }
  },

  /*
   * Validate contents of csv
   */
  validateCsv: {
    value: function() {
      if (browser.desiredCapabilities.browserName === 'chrome') {
      var inputFile =`data/downloads/${browser.params.fileName}.csv`;
      var fileName = browser.params.fileName || require('../data/2D-Dta/filename.json').fileName;
      var parser = parse({delimiter: ','}, function (err, data) {
        var part = data[1];
        expect(fileName, 'Csv Validation failed').to.be.equal(part[1]);
      });
      fs.createReadStream(inputFile).pipe(parser);
    }
    }
  },

  /*
   * User selects core pin from the available parts, in select by product type
   */
  selectByProductType:{
    value: function() {
      var currentBrowser = browser.desiredCapabilities.browserName;
      this.mainSelectionInSelectByPart.waitForVisible();
      this.mainSelectionInSelectByPart.click();
      if (currentBrowser == "chrome"){
        this.itemName.moveToObject();
        this.corePin.click();
      } else {
        browser.clickElement(this.corePinCheckSelector)
      }
    }
  },

  /*
   * Verify if all the core pins are selected, finally deselect it
   */
  verifyCorePinSelected:{
    value: function(expectedPartsName, count, expectedCorePinCount) {
      var countCorePin = 0;
      var countCheckedCheckBox = 0;
      var currentBrowser = browser.desiredCapabilities.browserName;
      browser.execute(function (selector) {
        var e = document.querySelector('.WindowError');
        e.style.display = 'none';
      });
      for (var i=1; i<=count; i++) {
        if (currentBrowser == "chrome") {
          this.checkPartSelect(i).moveToObject();
        } else {
          browser.scrollToElement(this.checkPartSelectSelector(i+1));
        }
        if (this.partsName(i).getText() == expectedPartsName.part2) {
          expect(this.checkPartSelect(i).isSelected()).to.be.equal(true);
          countCorePin = countCorePin +1;
        }
        if (i == count && currentBrowser == "chrome") {
          this.customerOrderingNumberField(14).moveToObject();
        }
        if (this.checkPartSelect(i).isSelected()) { countCheckedCheckBox = countCheckedCheckBox+1; }
      }
      expect(countCorePin).to.be.equal(expectedCorePinCount);
      expect(countCheckedCheckBox).to.be.equal(countCorePin);
      if (currentBrowser == "chrome") {
        this.mainSelectionInSelectByPartDeselect.moveToObject();
      } else {
        browser.scrollToElement(this.mainSelectionInSelectByPartDeselectSelector);
      }
      this.mainSelectionInSelectByPartDeselect.click();
      this.closeList.waitForVisible();
      this.closeList.click();
    }
  },

  /*
   * User inputs Customer ordering number manually and clears it
   */
  customerOrdeingNumberManual:{
    value: function(count, part1, part2) {
      this.filterOption.waitForVisible();
      this.filterOption.click();
      this.showAllOption.click();
      this.customerOrderingNumberField(1).waitForVisible();
      var currentBrowser = browser.desiredCapabilities.browserName;
      for (var i=1,j=2; i<=count; i++) {
        if (currentBrowser=="chrome") {
          this.customerOrderingNumberField(i).moveToObject();
        } else {
          browser.scrollToElement(this.customerOrderingNumberFieldPart1(j));
          if (i%2 == 0) j=j+1;
        }
        if (i%2 != 0) {
          this.customerOrderingNumberField(i).setValue(part1);
        } else {
          this.customerOrderingNumberField(i).setValue(part2);
        }
      }
      browser.url(browser.params.projectPageUrl);
      this.customerOrderingNumberField(1).waitForVisible();
      if (currentBrowser=="chrome") {
        for (var i=1; i<=count; i++) {
         this.customerOrderingNumberField(i).moveToObject();
         this.customerOrderingNumberField(i).clearElement();
       }
      } else {
        for (var k=2; k<=8; k++) {
          browser.execute(function (selector1,selector2) {
            var e = document.querySelector('.WindowError')
            if (e.style.display != 'none') e.style.display = 'none';
            document.querySelector(selector1).scrollIntoView();
            document.querySelector(selector1).value = "";
            document.querySelector(selector2).value = "";
            if ("createEvent" in document) {
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);
              document.querySelector(selector1).dispatchEvent(evt);
              document.querySelector(selector2).dispatchEvent(evt);
            } else {
              document.querySelector(selector1).fireEvent("onchange");
              document.querySelector(selector2).fireEvent("onchange");
            }
          }, this.customerOrderingNumberFieldPart1(k), this.customerOrderingNumberFieldPart2(k));
          browser.mediumWait();
        }
      }
    }
  },

  /*
   * User inputs Customer ordering number in batch input
   */
  customerOrdeingNumberBatchInput:{
    value: function() {
      browser.url(browser.params.projectPageUrl);
      browser.execute(function () {
        document.querySelector('.WindowError').style.display = 'none';
      });
      this.listFunctionOpen.waitForVisible();
      this.listFunctionOpen.click();
      var currentBrowser = browser.desiredCapabilities.browserName;
      if (currentBrowser == "chrome") {
        this.enterCustomerOderInList.moveToObject();
        this.batchInput.click();
      } else {
        browser.execute(function (selector) {
          var element = document.querySelector(selector);
          element.click();
        }, this.batchInputOptionSelector);
      }
      this.closeButtonDialog.waitForVisible();
      this.closeButtonDialog.click();
    }
  },

  /*
   * User verifies batch input
   */
  verifyBatchInput:{
    value: function(expected,count) {
      browser.mediumWait();
      for (i=2,j=0; j<7; j++,i+=2) {
        if (browser.desiredCapabilities.browserName == "chrome") {
          this.customerOrderingNumberField(i).moveToObject();
        } else {
          browser.scrollToElement(this.customerOrderingNumberFieldPart2(j+2));
        }
        this.customerOrderingNumberField(i).waitForVisible();
        expect(this.customerOrderingNumberField(i).getValue()).to.equal(expected[j].part);
      }
    }
  },

  /*
   * User resets batch input / input wizard
   */
  resetInput:{
    value: function() {
      var currentBrowser = browser.desiredCapabilities.browserName;
      if (currentBrowser == "chrome") {
        this.listFunctionOpen.moveToObject();
      }
      else {
        browser.scrollToElement(this.resetBatchInputSelector);
      }
      this.listFunctionOpen.waitForVisible();
      this.listFunctionOpen.click();
      var currentBrowser = browser.desiredCapabilities.browserName;
      if (currentBrowser == "chrome") {
        this.enterCustomerOderInList.moveToObject();
        this.undoBatchInput.click();
      } else {
        browser.clickElement(this.resetBatchInputSelector);
      }
      this.closeList.click();
    }
  },

  /*
   * User gives customer ordering number by input wizard
   */
  customerOrdeingNumberInputWizard:{
    value: function(func1, func2) {
      this.listFunctionOpen.waitForEnabled();
      this.listFunctionOpen.click();
      var currentBrowser = browser.desiredCapabilities.browserName;
      if (currentBrowser == "chrome") {
        this.enterCustomerOderInList.moveToObject();
        this.inputWizardList.waitForVisible();
        this.inputWizardList.click();
      } else {
        browser.clickElement(this.inputWizardOptionSelector);
      }
      this.inputWizardInput1.waitForVisible();
      this.inputWizardInput1.setValue(func1);
      this.inputWizardInput2.setValue(func2);
      this.collectiveInputButton.click();
      this.closeButton.waitForVisible();
      if (currentBrowser == "chrome") {
        this.closeButton.click();
        this.closeButton.waitForVisible();
        this.closeButton.click();
      } else {
        browser.clickElement(this.closeButtonSelector);
        browser.clickElement(this.closeButtonSelector);
      }
    }
  },

  /*
   * User verifies Wizard input
   */
  verifyInputWizard:{
    value: function(expected,projectName,count) {
      for (k=1,i=2,j=0; i<=count; j++,i+=2,k+=2) {
        expect(this.customerOrderingNumberField(i).getValue()).to.equal(expected[j].part);
        expect(this.customerOrderingNumberField(k).getValue()).to.include(projectName);
      }
    }
  },

  /*
   * User selects one of the parts, core pin and changes the material
   */
  selectCorePin:{
    value: function() {
      this.closeList.click();
      this.corePinMultiplePin.waitForVisible();
      var currentBrowser = browser.desiredCapabilities.browserName;
      if (currentBrowser=="chrome") {
       this.corePinMultiplePin.click();
      } else {
        browser.clickElement(this.corePinMulitplePinSelector);
      }
    }
  },

  /*
   * User updates the the quotation
   */
  updateQuotation:{
    value: function(change) {
      this.changeMaterial.waitForEnabled();
      this.changeMaterial.selectByValue("NAK80");
      this.makeAnEstimate.waitForEnabled();
      this.makeAnEstimate.click();
      expect(this.changeMaterial.getValue()).to.equal(change);
    }
  },

  /*
   * User selects filter and choose CorePin
   */
  selectFilterTakeCorePin:{
    value: function() {
      this.filterOption.click();
      var currentBrowser = browser.desiredCapabilities.browserName;
      if(currentBrowser=="chrome") {
        this.itemNameFilter.moveToObject();
        this.corePinFilter.waitForVisible();
        this.corePinFilter.click();
       } else {
        browser.clickElement(this.corePinSelector);
      }
    }
  },

  /*
   * User verifies if the filter of core pin has been proper
   */
  verifyFilterCorePin:{
    value: function(proj,multiplePinCount,corePinCount) {
      var count = 0;
      for (i=1; i<=multiplePinCount; i++) {
        if (proj == this.corePinList(i).getText()) { count+=1; }
      }
      expect(count).to.equal(corePinCount);
    }
  },

  /*
   * Sets model numbers to params
   */
  takeModelNumber:{
    value: function (count) {
      this.modelNumber(1).waitForEnabled();
      browser.execute(function (selector) {
        var e = document.querySelector('.WindowError');
        e.style.display = 'none';
      });
      for(var i=1; i<=count; i++) {
        if(browser.desiredCapabilities.browserName=="chrome"){
          this.modelNumber(i).moveToObject(); }
        else{
          if(i>2){
            browser.scrollToElement(this.modelNumberSelector(i+1)); }
           }  
        this.modelNumber(i).waitForVisible();
        browser.params.modelNumber['part'+ i ] = this.modelNumber(i).getText();
      }
    }
  },

  /*
   * Moves to top of the parts view page
   */
  moveToTop: {
    value: function () {
      if(browser.desiredCapabilities.browserName=="chrome"){
        this.filterOption.moveToObject();}
      else{
        browser.scrollToElement(this.filterOptionSelector);}
    }
  }
};

module.exports = Object.create(Page, projectPage);
