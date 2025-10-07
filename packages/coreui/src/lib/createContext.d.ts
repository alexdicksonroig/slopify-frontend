import {Context, useContext} from 'react'

declare const CreateContext: <T = any>() => [() => T, Context<T>]

export default CreateContext
