export const lodash = {
  isObjectEqual<T extends object>(firstObject: T, secondObject: T): boolean {
    if (firstObject === secondObject) return true;

    if (
      typeof firstObject !== "object" ||
      typeof secondObject !== "object" ||
      firstObject == null ||
      secondObject == null
    ) {
      return false;
    }

    const keysFirstObject = Object.keys(firstObject) as (keyof T)[];
    const keysSecondObject = Object.keys(secondObject) as (keyof T)[];

    if (keysFirstObject.length !== keysSecondObject.length) return false;

    for (const key of keysFirstObject) {
      const value1 = firstObject[key];
      const value2 = secondObject[key];

      const areObjects =
        typeof value1 === "object" &&
        typeof value2 === "object" &&
        value1 != null &&
        value2 != null;

      if (
        !keysSecondObject.includes(key) ||
        (areObjects ? !this.isObjectEqual(value1, value2) : value1 !== value2)
      ) {
        return false;
      }
    }

    return true;
  },
};
