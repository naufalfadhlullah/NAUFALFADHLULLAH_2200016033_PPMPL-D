const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('C:/Users/acer/Documents/SEMESTER5/PRAKPPMPL/PRAK_PPMPL_4/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password using CSS Selector', async function () {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute("value");
        const passwordValue = await driver.findElement(By.css('#password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        // Tunggu hingga elemen loginButton tersedia sebelum klik
        const loginButton = await driver.wait(until.elementLocated(By.id('loginbutton')), 10000);

        await loginButton.click();
    });

    it('should validate visual elements', async function () {
      await driver.findElement(By.css('#username')).sendKeys('testuser');
      await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
      await driver.findElement(By.id('loginbutton')).click();
      const isDisplayed = await driver.wait(until.elementLocated(By.id('loginbutton')), 10000);
      expect(await isDisplayed.isDisplayed()).to.be.true;
  });
  
});
