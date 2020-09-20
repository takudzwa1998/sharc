import { combineReducers } from 'redux';

const user =  (state={}, action) => {
  switch (action.type){
    case 'UPDATE_INSTITUTION':
      return {...state, institution: action.payload}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer
