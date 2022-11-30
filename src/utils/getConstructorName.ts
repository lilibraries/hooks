function getConstructorName(instance: object): string {
  return instance && instance.constructor && instance.constructor.name;
}

export default getConstructorName;
