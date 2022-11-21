function isSymbol(value: unknown): value is symbol {
  return Object.prototype.toString.call(value) === "[object Symbol]";
}

export default isSymbol;
