const instanceof_My = (obj, theClass) => {
  while (obj) {
    if (Object.getPrototypeOf(obj) === theClass.prototype) {
      return true;
    }
    obj = Object.getPrototypeOf(obj);
  }
  return false;
};
