class EventEmitter {
  constructor() {
    this.list = Object.create(null);
  }
  on(event, fn) {
    let eventListForKey = this.__getEventArr(event);
    eventListForKey.push(fn);
  }
  emit(event) {
    let eventListForKey = this.__getEventArr(event);
    eventListForKey.forEach(fn => fn());
  }
  off(event, fn) {
    if (!fn) {
      this.list[event] = [];
    } else {
      let eventListForKey = this.__getEventArr(event);
      eventListForKey.splice(eventListForKey.indexOf(fn), 1);
    }
  }
  once(event, fn) {
    let eventListForKey = this.__getEventArr(event);
    eventListForKey.push(() => {
      fn();
      this.off(event, fn);
    });
  }
  __getEventArr(event) {
    if (this.list[event]) {
      return this.list[event];
    } else {
      this.list[event] = [];
      return this.list[event];
    }
  }
}

let eventEmitter = new EventEmitter();
let test1 = () => {
  console.log('test1');
};
let test2 = () => {
  console.log('test2');
};
let test3 = () => {
  console.log('test3');
};
debugger;
eventEmitter.on('1', test1);
eventEmitter.once('1', test2);
eventEmitter.on('2', test3);
eventEmitter.emit('1');
eventEmitter.emit('1');
eventEmitter.emit('2');
eventEmitter.off('2');
eventEmitter.emit('2');
