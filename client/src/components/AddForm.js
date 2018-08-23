import React from 'react'
import axios from 'axios'
import store from '../reducers'
import {changeNameAction, changeAgeAction, initializeAction, requestDataAction, receiveDataSuccess, receiveDataFailed} from '../actions'

export default () => {
  const {name, age} = store.getState().form

  const handleSubmit = e => {
    e.preventDefault()
    store.dispatch(requestDataAction)
    
    axios.post('/api/characters', {
      name,
      age
    })
    .then(response => {
      store.dispatch(initializeAction)
      const _characterArray = response.data
      store.dispatch(receiveDataSuccess(_characterArray))
    })
    .catch(err => {
      store.dispatch(receiveDataFailed)
    })
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <span>
          名前：<input type="text" value={name} onChange={e => store.dispatch(changeNameAction(e.target.value))}/>
        </span>
        <span>
          年齢：<input type="text" value={age} onChange={e => store.dispatch(changeAgeAction(e.target.value))}/>
        </span>
        <span>
          <button type="submit">submit</button>
        </span>
      </form>
    </div>
  )
}