module.exports = {
  "get to login page": browser => {
    browser
      // Load the page at the launch URL
      .url(browser.launchUrl)
      // wait for page to load
      .waitForElementVisible(".img", 1000)

    browser.assert.urlContains("login");

  },
/*  "logging in": browser => {
    browser
      // set the input email to a valid username / password
      .setValue("input[type=text]", "tb")
      .setValue("input[type=password]", "tb")
      // submit the form
      .click("input[type=submit]")
      // wait for the page to load
      .waitForElementVisible(".navbar", 1000)
      // Get the text of the h1 tag
      .getText(".home h2", function(comp) {
        this.assert.equal(comp.value, "Home");
      });
    browser.assert.urlContains(browser.launchUrl);

  },*/
  "logging out": browser => {},
  close: browser => {}
};
