/*
 *  mocha                                    测试框架
 *  chai（有except、should、assert三种风格）   断言库
 *  chai-as-promised                         异步断言库
 *  sinon                                    打桩
 *  benchmark                                性能测试
 *  nyc                                      覆盖率检查
 *  
 *  nyc需要引入app文件，才能好使
 *  专门准备测试数据库，这样就永远不用更改测试例
 */ 
/*
下面的接口是单纯作为语言链提供以期提高断言的可读性
to、be、been、is、that、which、and、has、have、with、at、of、same

这些真正有用
expect(foo).to.not.equal('bar')
expect(foo).to.deep.equal('bar')
expect(foo).to.have.any.keys('bar', 'baz')
expect(foo).to.have.all.keys('bar', 'baz')
expect('test').to.be.a('string')
expect([1, 2, 3]).to.include(2)
*/
const sinon = require('sinon');
const chai = require('chai'); 
const expect = chai.expect;
// chai-as-promised中用到
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const app = require('../src/app.js');
const testApi = require('./testApi/index.js');
const testDto = require('./testDto/index.js');
let cookie = null;

// 测试块
describe('test http server', () => {
  // 在本测试块所有测试用例执行之前执行
  before(() => {
    // start server
    app.listen(80);

    // test login and record cookie
    return testApi.login().then(res => {
      expect(res.data).to.be.deep.equal(testDto.login);
      cookie = res.headers['set-cookie'][0];
    });
  });
  // 在本测试块所有测试用例执行之后执行
  after(() => {});
  // 在本测试块每个测试用例之前执行
  beforeEach(() => {});
  // 在本测试块每个测试用例之后执行
  afterEach(() => {});

  describe('basic', () => {
    // 测试用例
    it('getBasicInfo', () => {
      return testApi.getBasicInfo(cookie).then(res => res.data).should.eventually.deep.equal(testDto.getBasicInfo);
    });
    // sync
    // it('getBasicInfo', function (done) {
    //   this.timeout(10000); 
    //   testApi.getBasicInfo(cookie).then(res => {
    //     expect(res.data).to.be.deep.equal(testDto.getBasicInfo);
    //     done();
    //   });
    // });
  });
});