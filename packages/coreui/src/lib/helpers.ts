export function hideArgs(properties: string[]) {
  return properties.reduce<Record<string, {table: {disable: boolean}}>>(
    (acc, property) => {
      acc[property] = {table: {disable: true}}
      return acc
    },
    {}
  )
}

export function StoryConfig() {}

export const createNameSpacedComponent = <
  T extends React.ElementType,
  U extends Record<string, React.ElementType | Record<string, React.ElementType>>,
>(
  mainComponent: T,
  composedComponents: U
) => {
  const composedComponent = {...(mainComponent as object)}
  Object.keys(composedComponents).forEach((key) => {
    ;(composedComponent as any)[key] = composedComponents[key]
  })
  return composedComponent as T & U
}
