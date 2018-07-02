window.Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
window.Array.prototype.iShave = function(val) {
  var i = this.length;
  while (i--) {
    if (this[i] === val) {
      return true;
    }
  }
  return false;
};
