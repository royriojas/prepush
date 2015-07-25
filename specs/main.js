describe('main', function () {

  var main = require('../src/main');
  var proxyquire = require('proxyquire').noPreserveCache();

  it('should show the help in case the provided option is empty', function () {
    var me = this;

    var cli = {
      opts: {
        '_': [ '' ]
      },
      error: me.sandbox.spy(),
      showHelp: me.sandbox.spy()
    };

    main.run( cli );

    expect( cli.error ).to.have.been.calledWith(me.sandbox.match('Missing command, please indicate "install" or "remove"\n'));
    expect( cli.showHelp ).to.have.been.called;
  });

  it('should show the help in case the provided option is undefined', function () {
    var me = this;

    var cli = {
      opts: {
        '_': [ ]
      },
      error: me.sandbox.spy(),
      showHelp: me.sandbox.spy()
    };

    main.run( cli );

    expect( cli.error ).to.have.been.calledWith(me.sandbox.match('Missing command, please indicate "install" or "remove"\n'));
    expect( cli.showHelp ).to.have.been.called;
  });

  it('should show the help in case the provided option is not install or remove', function () {
    var me = this;

    var cli = {
      opts: {
        '_': [ 'burrito' ]
      },
      error: me.sandbox.spy(),
      showHelp: me.sandbox.spy()
    };

    main.run( cli );

    expect( cli.error ).to.have.been.calledWith(me.sandbox.match('Missing command, please indicate "install" or "remove"\n'));
    expect( cli.showHelp ).to.have.been.called;
  });

  describe('remove', function() {
    it ('should call remove on the hook module', function (done) {
      var me = this;
      var spy = me.sandbox.spy();
      var resolver = {
        then: function (cb) {
          this._cb = cb;
        },
        __resolve: function (res) {
          this._cb && this._cb(res);
        }
      };
      main = proxyquire('../src/main', {
        '../lib/hook': {
          remove: function () {
            spy();
            return resolver;
          }
        }
      });
      var cli = {
        opts: {
          '_': [ 'remove' ]
        },
        ok: me.sandbox.spy()
      };

      main.run(cli);

      expect(spy).to.have.been.called;

      resolver.__resolve('path/to/file');

      expect(cli.ok).to.have.been.calledWith(me.sandbox.match('prepush file removed:'), me.sandbox.match('path/to/file'));
      done();

    });
  });
});
