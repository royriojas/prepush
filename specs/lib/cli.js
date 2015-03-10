describe('cli', function () {
  var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

  it('should exit the process in case of an error', function () {
    var me = this;
    var mockConsole = me.sandbox.createSpyObj('console', ['error']);
    var processMock = me.sandbox.createSpyObj('process', ['exit']);

    proxyquire('../../bin/prepush.js', {
      '../lib/process': processMock,
      '../lib/console': mockConsole,
      '../lib/cli': {
        install: function () {
          throw new Error('Some Error');
        }
      }
    });

    expect(processMock.exit).to.have.been.calledWith(1);
    expect(mockConsole.error).to.have.been.called;

  });
});