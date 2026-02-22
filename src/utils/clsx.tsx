type ClassName = Array<string | boolean>;
type Styles = Record<string, string>;

export function clsx(...classes: ClassName) {
  let className = "";

  for (const currentClass of classes) {
    if (typeof currentClass === "string") {
      className = " " + currentClass;
    }
  }

  return className;
}

export function mclsx(styles?: Styles) {
  if (typeof styles !== "object") return clsx;

  return function clsxWithModules(...classes: ClassName) {
    return clsx(
      ...classes.map(
        (className) =>
          typeof className === "string" && (styles[className] ?? className),
      ),
    );
  };
}

export default clsx;
