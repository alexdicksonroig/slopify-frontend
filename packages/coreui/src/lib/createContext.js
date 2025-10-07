import {createContext, useContext as useDefaultContext} from 'react'

const CreateContext = () => {
  const contexts = createContext([{}, () => {}])

  const useContext = () => {
    const context = useDefaultContext(contexts)
    if (!context) throw new Error('useContext must be inside a Provider with a value')

    return context
  }

  return [useContext, contexts]
}

export default CreateContext
