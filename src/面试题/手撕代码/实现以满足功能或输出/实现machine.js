//让下面的代码跑起来和输出相同

machine('ygy').execute();
// start ygy
machine('ygy')
  .do('eat')
  .execute();
// start ygy
// ygy eat
machine('ygy')
  .wait(5)
  .do('eat')
  .execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy')
  .waitFirst(5)
  .do('eat')
  .execute();
// wait 5s
// start ygy
// ygy eat

//实现
function machine(str) {
  function machineClass(str) {
    this.name = str;
    this.task = [];
    this.task.push(() => {
      return new Promise(resolve => {
        console.log(`start ${this.name}`);
        resolve();
      });
    });
  }
  machineClass.prototype.execute = function() {
    if (this.task.length === 0) {
      return;
    }
    this.task
      .shift()()
      .then(() => this.execute());
    return this;
  };
  machineClass.prototype.do = function(str) {
    this.task.push(() => {
      return new Promise(resolve => {
        console.log(`${this.name} ${str}`);
        resolve;
      });
    });
    return this;
  };
  machineClass.prototype.wait = function(time) {
    this.task.push(() => {
      return new Promise(resolve => {
        console.log(`wait ${time}s`);
        setTimeout(() => {
          resolve();
        }, time * 1000);
      });
    });
    return this;
  };
  machineClass.prototype.waitFirst = function(time) {
    this.task.unshift(() => {
      return new Promise(resolve => {
        console.log(`wait ${time}s`);
        setTimeout(() => {
          resolve();
        }, time * 1000);
      });
    });
    return this;
  };
  return new machineClass(str);
}
