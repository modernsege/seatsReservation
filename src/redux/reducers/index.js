import {combineReducers} from 'redux';
import {seatsManager, checkedreducer, userReducer, toReserveSeatsReducer} from './reservedReducer'

const reducers = combineReducers({
    allSeats: seatsManager,
    isCheckboxChecked: checkedreducer,
    userInputValue: userReducer,
    seatsToReserve:toReserveSeatsReducer
})

export default reducers