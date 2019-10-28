import { ADD_ARTICLE } from '../constants/action-types'
const forbiddenWords = ['spam', 'money']
// Example of middleware
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        )
        if (foundWord.length) {
          return dispatch({ type: 'FOUND_BAD_WORD' })
        }
      }

      // should always return next(action) in your middlewares.
      return next(action)
    }
  }
}
