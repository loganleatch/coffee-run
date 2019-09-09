import { combineReducers } from 'redux'
import {
  SELECT_LOCATION,
  SELECT_ORDER,
  CREATE_ORDER,
  SELECT_COFFEE_TYPE
} from './actions'
var _ = require('lodash');

// let mochState = {
//   location: 'ground-floor',
//   orders: [
//     {
//       window_id: '0',
//       coffeeType:1
//     }
//   ]
// }

function orders (state=[], action) {
  let newState = _.cloneDeep(state)
  switch (action.type) {
    case CREATE_ORDER:
      newState.push(action.newOrder)
      return newState
    case SELECT_COFFEE_TYPE:
      let foundOrder = newState.find((order)=>{return order.windowId == action.windowId})
      foundOrder.coffeeId = action.coffeeId
      return newState
    default:
      return newState
  }
}

function selectedLocation (state=null, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return action.id
    default:
      return state
  }
}

function selectedOrder (state=null, action) {
  switch (action.type) {
    case SELECT_ORDER:
      return action.id
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedLocation,
  selectedOrder,
  orders
})

export default rootReducer
