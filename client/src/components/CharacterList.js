import React from 'react'
import axios from 'axios'
import store from '../reducers'
import {deleteAction, requestDataAction, receiveDataSuccess, receiveDataFailed} from '../actions'

const requestUrl = '/api/characters'

export default () => {
  const {characterArray, isFetching} = store.getState().characters

  const handleFetchData = () => {
    store.dispatch(requestDataAction)
    axios.get(requestUrl)
    .then(response => {
      store.dispatch(receiveDataSuccess(response.data))
    })
    .catch(err => {
      console.error(new Error(err))
      store.dispatch(receiveDataFailed())
    })
  }

  const handleUpdateCharacter = id => {
    store.dispatch(requestDataAction)
    axios.put(requestUrl, {
      id
    })
    .then(response => {
      const _characterArray = response.data
      store.dispatch(receiveDataSuccess(_characterArray))
    })
    .catch(err => {
      console.error(new Error(err))
      store.dispatch(receiveDataFailed)
    })
  }

  const handleDeleteCharacter = id => {
    store.dispatch(requestDataAction)
    axios({
      method: 'delete',
      url: requestUrl,
      data: {
        id
      }
    })
    .then(response => {
      const _characterArray = response.data
      store.dispatch(receiveDataSuccess(_characterArray))
    })
    .catch(err => {
      console.error(new Error(err))
      store.dispatch(receiveDataFailed)
    })
  }

  return (
    <div>
      {
        isFetching
          ? <h2>Now Loading...</h2>
          : <div>
              <button onClick={() => handleFetchData()}>fetch data</button>
              <ul>
                {
                  characterArray.map(({name, age, _id}) => {
                    return (
                      <li key={_id}>
                        {name}({age})
                        <button onClick={() => handleUpdateCharacter(_id)}>+1</button>
                        <button onClick={() => handleDeleteCharacter(_id)}>delete</button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
      }
    </div>
  )
}