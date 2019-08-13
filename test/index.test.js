/*
 *  mocha                                    测试框架
 *  chai（有except、should、assert三种风格）   断言库
 *  chai-as-promised                         异步断言库
 *  sinon                                    打桩
 *  sinon-chai                               sinon相关断言库
 *  nyc                                      覆盖率检查
 *  
 *  nyc需要引入app文件，才能好使
 *  专门准备测试数据库，这样就永远不用更改测试例
 */
/*
sinon:
// 监视jQuery.ajax函数，函数不会真正执行
sinon.spy(jQuery, 'ajax');
// 执行jQuery.ajax函数
jQuery.getJSON('/some/resource');
// 断言ajax函数被调用过一次
// 这块的断言库推荐使用sinon-chai
assert(jQuery.ajax.calledOnce);
jQuery.ajax.should.have.been.calledOnce()
// 断言ajax函数第一次调用的第一个参数是/some/resource
assertEquals('/some/resource', jQuery.ajax.getCall(0).args[0].url);

给global.db.query函数打桩（global.db.query函数不会真正执行），每次执行global.db.query函数，参数是1的时候，会直接返回2
dbStub = sinon.stub(global.db, 'query');
dbStub.withArgs(1).returns(2);

// mock是结合spy和stub
// 创建jQuery.each方法的期望：只被调用一次，并且指示它向之前的stub一样运作
var mock = sinon.mock(jQuery);  
mock.expects('each').once().callsArgWith(1, {}).returns({});  
*/ 
/*
chai: 
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
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);

const app = require('../src/app.js');
const testApi = require('./testApi/index.js');
const testDto = require('./testDto/index.js');
let cookie = null;
let dbStub = null;

// 测试块
describe('test http server', () => {
  // 在本测试块所有测试用例执行之前执行
  before(() => {
    // 不打印log
    global.console.log = () => {};

    // start server
    app.listen(80);

    // test login and record cookie
    return testApi.login().then(res => {
      expect(res.data).to.be.deep.equal(testDto.login);
      cookie = res.headers['set-cookie'][0];

      // 数据库查询打桩
      dbStub = sinon.stub(global.db, 'query');
      dbStub.withArgs('select * from basic where name like ?', [ '%企业类型%' ]).returns(Promise.resolve({
        err: null,
        results: [{
          id: 1, 
          name: '企业类型', 
          info: '木材加工,木材销售'
        }],
        fields: null
      }));
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
    it('getBasicInfo', function () {
      this.timeout(3000); 

      return testApi.getBasicInfo(cookie).then(res => res.data).should.eventually.deep.equal(testDto.getBasicInfo);
    });
    // sync
    // it('getBasicInfo', function (done) { 
    //   testApi.getBasicInfo(cookie).then(res => {
    //     expect(res.data).to.be.deep.equal(testDto.getBasicInfo);
    //     done();
    //   });
    // });
  });
});