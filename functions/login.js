let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let expectedData = require('../data/expected-results/common.json');

/**
 * login Page Object
 *
 * @class functions/login
 * @type {Page}
 */
let loginPage = {
  /**
   * define elements
   */
  systemCheckPopup: {get: function() { return  browser.element('//div[@id="syscheck"]');}},
  systemCheckBox: {get: function() { return  browser.element('//input[@id="disableAutoClientCheck"]');}},
  systemCheckButton: {get: function() { return  browser.element('//div[@id="syscheck"]/p[2]/a');}},
  startRightAway: { get: function () { return browser.element('//li[@class="loginBtn"]');}},
  userNameField: { get: function () { return browser.element('//input[@id="id"]');}},
  passwordField: { get: function () { return browser.element('//input[@id="pass"]');}},
  loginButton: { get: function () { return browser.element('//div[@id="login_btn_on"]');}},
  errorMessage: { get: function () { return browser.element('//div[@id="error1"]/small');}},
  memberMenuButton:{ get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logoutButton:{ get: function () { return browser.element('//*[@id="logoutButton"]');}},
  homePageHeader:{ get: function () { return browser.element('//section[@id="moldMv"]//*[@class="inner"]//h1');}},
  rightDropDown:{ get: function () { return browser.element('//li[contains(@class,"drop menber_menu right")]');}},
  orderHistory:{ get: function () { return browser.element('//a[contains(text(),"注文履歴")]');}},
  prjectName:{ get: function () { return browser.element('(//div[@class="projectname"]//a)[1]');}},

  /*
   * Goes to Home Page
   */
  goToHomePage: {
    value: function () {
      let env = process.env.npm_config_env || 'tst';
      const urlData = browser.filterByUsage(env)[0];
      url = urlData;
      browser.url(url.homePageUrl);
      if (this.systemCheckPopup.isVisible()) {
        this.systemCheckBox.click();
        this.systemCheckButton.click();
      }
      browser.pause(5000);
    }
  },

  /*
   * Validates the webpage header
   */
  validateWebpageHeader: {
    value: function(){
      this.homePageHeader.waitForVisible();
      let header = this.homePageHeader.getText();
      expect(expectedData.homePageTitle).to.equal(header);
    }
  },

  /*
   * Validates the start right away button
   */
  validateRightAwayButton: {
    value: function(){
      expect(this.startRightAway.isVisible()).to.equal(true);
    }
  },

  /*
   * Goes to login page
   */
  goToLoginPage: {
    value: function(){
      this.startRightAway.waitForVisible();
      this.startRightAway.click();
      browser.smallWait();
    }
  },

  /*
   * Validates the username field in login page
   */
  validateUserNameField: {
    value: function() {
      browser.smallWait();
      // if (!browser.isLoginPage()) return;
      expect(this.userNameField.isVisible()).to.equal(true);
    }
  },

  /*
   * Validates the password field in login page
   */
  validatePasswordField: {
    value: function() {
      // if (!browser.isLoginPage()) return;
      expect(this.passwordField.isVisible()).to.equal(true);
    }
  },


  /*
   * Validates the login page url
   */
  validateLoginPageUrl: {
    value: function () {
      // if (!browser.isLoginPage()) return;
      this.loginButton.waitForVisible();
      let env = process.env.npm_config_env || 'tst';
      const urlData = browser.filterByUsage(env)[0];
      url = urlData;
      expect(browser.getUrl()).to.equal(url.login);
    }
  },

  /*
   * Logs into the website
   */
  login: {
    value: function() {
      // if (!browser.isLoginPage()) return;
      this.userNameField.waitForEnabled();
      this.userNameField.setValue(data.loginCredentials.presentation.username);
      this.passwordField.setValue(data.loginCredentials.presentation.password);
      this.loginButton.click();
      browser.veryLongWait();
      if (this.errorMessage.isVisible()) {
        this.loginButton.waitForEnabled();
        this.loginButton.click();
      }
    }
  },

  /*
   * Logs out from the website
   */
  logout: {
    value: function() {
      this.memberMenuButtonButton.waitForEnabled();
      this.memberMenuButton.click();
      this.logoutButton.waitForEnabled();
      this.logoutButton.click();
    }
  },

  /*
   * Goes to Home Page of lab site
   */
  goToHomePageLabSite: {
    value: function () {
      this.loginButton.waitForVisible();
      let env = process.env.npm_config_env || 'tst';
      const urlData = browser.filterByUsage(env)[0];
      url = urlData;
      browser.url(url.homePageUrlLabSite);
      if (this.systemCheckPopup.isVisible()) {
        this.systemCheckBox.click();
        this.systemCheckButton.click();
      }
    }
  },

  /*
   * Go to order history
   */
  goToOrderHistory: {
    value: function(){
    
     this.prjectName.waitForVisible();
     browser.params.fileName=this.prjectName.getText();
     this.rightDropDown.waitForEnabled();
     this.rightDropDown.click();
     this.orderHistory.waitForEnabled();
     this.orderHistory.click();
    }
  },

};

module.exports = Object.create(Page, loginPage);