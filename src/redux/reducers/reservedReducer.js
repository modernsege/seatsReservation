
   export const seatsManager = (state={}, action) =>{
   switch (action.type){
      case 'LOAD_SEATS':{
         return action.payload
      }
      case 'RESERVE_SEATS':{
         for(let i=0; i< state.length; i++){
            for(let j =0; j<action.payload.length;j++){
               if (state[i].id == action.payload[j].id){
                  state[i].reserved = true;
               }
            }
         }
         return state
      }
      default:
         return state
   }
   }


export const checkedreducer = (state = false, action) => {
   switch (action.type){
      case 'CHECKED_CHECKBOX':
        return !state
      default:
         return state
  }
}


export const userReducer = (state = '', action) => {
   switch (action.type){
      case 'USER_INPUT':
        return action.payload
      default:
         return state
  }
}


export const toReserveSeatsReducer = (state = {}, action) => {
   switch (action.type){
      case 'TO_RESERVE':
        return action.payload
      default:
         return state
  }
}

