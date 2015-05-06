
var HelloReporter = function(baseReporterDecorator, config, logger, helper, formatError) {
  var log = logger.create('reporter.hello');
  var helloConfig = config.helloReporter || {};

  baseReporterDecorator(this);

  this.adapters = [function(msg) {
      process.stdout.write.bind(process.stdout)(msg + "\r\n");
  }];

  this.onRunStart = function(browsers) {
    this.write("Hello World");
    this.write(browsers);
  };

  this.onBrowserStart = function(browser) {
      this.write("Hello " + browser.name);
      this.write(browser);
  };


  this.onRunComplete = function(browsersCollection, results) {
      this.write(results);
      this.write("GoodBye World");
  };

  this.specSuccess = function(browser, result) {
      this.write(helloConfig.successMsg);
  }
  this.specFailure = function(browser, result) {
      this.write(helloConfig.failureMsg);
  };

  this.onSpecComplete = function(browser, result) {
      this.write(result);
      if (result.skipped) {
          this.specSkipped(browser, result);
      } else if (result.success) {
          this.specSuccess(browser, result);
      } else {
          this.specFailure(browser, result);
      }
      this.write(result.description);
  }
};

HelloReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:hello': ['type', HelloReporter]
};
