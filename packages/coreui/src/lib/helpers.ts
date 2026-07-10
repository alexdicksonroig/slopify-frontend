export function hideArgs(properties: string[]) {
  return properties.reduce<Record<string, { table: { disable: boolean } }>>(
    (acc, property) => {
      acc[property] = { table: { disable: true } };
      return acc;
    },
    {},
  );
}

export const createNameSpacedComponent = <
  T extends React.ElementType,
  U extends Record<
    string,
    React.ElementType | Record<string, React.ElementType>
  >,
>(
  mainComponent: T,
  composedComponents: U,
) => {
  Object.assign(mainComponent, composedComponents);
  return mainComponent as T & U;
};
