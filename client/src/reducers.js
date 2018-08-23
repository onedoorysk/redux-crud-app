import {createStore, combineReducers} from 'redux'

const initialState = {
  form: {
    name: '',
    age: ''
  },
  characters: {
    isFetching: false,
    characterArray: []
  }
}

const characterReducer = (state = initialState.characters, action) => {
  switch(action.type) {
    case 'REQUEST_DATA':
      return {...state, isFetching: true}
    case 'RECEIVE_DATA_SUCCESS':
      return {...state, isFetching: false, characterArray: action.characterArray}
    case 'RECEIVE_DATA_FAILED':
      return {...state, isFetching: false}
    default:
      return state
  }
}

const formReducer = (state = initialState.form, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {...state, name: action.name}
    case 'CHANGE_AGE':
      return {...state, age: action.age}
    case 'INITIALIZE':
      return initialState.form
    default:
      return state
  }
}

const rootReducer = combineReducers({characters: characterReducer, form: formReducer})

const store = createStore(rootReducer)

export default store