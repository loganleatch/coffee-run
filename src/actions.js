export const SELECT_LOCATION = 'SELECT_LOCATION'
export function selectLocation(id) {
  return {
    type: SELECT_LOCATION,
    id
  }
}

export function selectOrCreateOrder(id) {
  return (dispatch, getState) => {
    let orderExists = getState().orders.find((order)=>{
      return order.id == id
    })

    if (orderExists) {
      dispatch(selectOrder(id))
    } else {
      dispatch(createOrder(id))
      dispatch(selectOrder(id))
    }
  }
}

export function selectCoffeeForOrder(id) {
  return (dispatch, getState) => {
    let selectedOrder = getState().orders.find((ord)=>{return ord.windowId == getState().selectedOrder})
    dispatch(selectCoffeeType(selectedOrder.windowId, id))
  }
}

export const SELECT_ORDER = 'SELECT_ORDER'
export function selectOrder(id) {
  return {
    type: SELECT_ORDER,
    id
  }
}

export const CREATE_ORDER = 'CREATE_ORDER'
export function createOrder(id) {
  return {
    type: CREATE_ORDER,
    newOrder: {
      windowId:id,
      coffeeId:null
    }
  }
}

export const SELECT_COFFEE_TYPE = 'SELECT_COFFEE_TYPE'
export function selectCoffeeType(windowId,coffeeId) {
  return {
    type: SELECT_COFFEE_TYPE,
    coffeeId,
    windowId
  }
}
