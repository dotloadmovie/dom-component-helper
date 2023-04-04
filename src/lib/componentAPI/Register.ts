interface ComponentMap {
  [key: string]: (element: Element) => void
}

let map: ComponentMap = {}

const register = (
  name: string,
  component: (element: Element) => void
): ComponentMap => {
  const newMap = { ...map }
  newMap[name] = component
  map = newMap

  return map
}

const getMap = (): ComponentMap => {
  return map
}

export { register, getMap }
