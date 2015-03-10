describe('git-dir', function () {
  var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

  it('should execute the command to get the top level git directory', function (done) {
    var me = this;
    var childProcessMock = me.sandbox.createSpyObj('cp', ['exec']);

    var gitDir = proxyquire('../../lib/git-dir.js', {
      'child_process': childProcessMock
    });

    var resSpy = me.sandbox.spy();

    gitDir().then(resSpy);

    childProcessMock.exec.callArgWith(1, null, '/some/path/');

    setTimeout(function () {
      expect(resSpy).to.have.been.calledWith('/some/path/');
      done();
    }, 0);

  });
});