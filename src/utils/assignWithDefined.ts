import assignWith from "lodash/assignWith";

const assignWithDefined: typeof assignWith = (base: any, ...args: any[]) => {
  return assignWith(base, ...args, (prev: any, next: any) => {
    return next === undefined ? prev : next;
  });
};

export default assignWithDefined;
