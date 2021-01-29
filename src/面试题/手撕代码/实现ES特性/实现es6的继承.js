function _extends(Parent, Child) {
  Object.setPrototypeOf(Child.prototype, Parent.prototype);
  Object.setPrototypeOf(Child, Parent);
}
function parent() {
  this.a = 1;
}
parent.prototype.print = function() {
  console.log(this.a);
};
function child() {
  _extends(parent, child);
  parent.call(this);
  this.b = 2;
}
var result = new child();
