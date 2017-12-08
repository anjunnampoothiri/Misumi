let Page = require('./page');
let data=require('../data/dataset.js');

let misumi = {

  uploadId: { get: function () { return browser.element('//*[@id="uploadfile"]');} },

  upload: {
    value: function(url) {
      this.uploadId.waitForEnabled();
      browser.execute(function () {
        var inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.id = 'inputFileDragHandler';
        document.body.appendChild(inputElement);
      });
      browser.chooseFile('#inputFileDragHandler', url);
      browser.execute(function () {
        function FakeDataTransfer(file) {
          this.dropEffect = 'all';
          this.effectAllowed = 'all';
          this.items = [];
          this.types = ['Files'];
          this.getData = function() {
            return file;
          };
          this.files = [file];
        };
        // var fakeDropEvent = new Event('drop');
        var fakeDropEvent = document.createEvent("DragEvent");
        fakeDropEvent.initEvent("drop", true, true);
        Object.defineProperty(fakeDropEvent, 'dataTransfer', {
          value: new FakeDataTransfer(document.getElementById('inputFileDragHandler').files[0])
        });
        document.querySelector('.dragArea').dispatchEvent(fakeDropEvent);
      });
    }
  }
};

module.exports = Object.create(Page,misumi);