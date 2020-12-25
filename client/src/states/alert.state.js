// import React, { useReducer } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import { alertConstant } from '../constants'

// import AlertContext from '../contexts/alert.context'
// import AlertReducer from '../reducers/alert.reducer'

// const alertState = (props) => {
//   const initalState = []
//   const [state, dispatch] = useReducer(alertReducer, initalState)

//   const setAlert = (msg, type, timeout = 5000) => {
//     const id = uuidv4()

//     dispatch({
//       type: SET_ALERT,
//       payload: { msg, type, id }
//     })

//     setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
//   }

//   return (
//     <AlertContext.Provider
//       value={{
//         alerts: state,
//         setAlert
//       }}>
//       {props.children}
//     </AlertContext.Provider>
//   )
// }

// export default alertState
