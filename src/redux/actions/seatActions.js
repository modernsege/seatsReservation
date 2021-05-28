export const seatsM = (seatsList) => {
    return{
        type: "LOAD_SEATS",
        payload: seatsList
    }
}


export const checkedCheckbox = () =>{
    return{
        type: "CHECKED_CHECKBOX",
    }
}

export const userInput = (value) =>{
    return{
        type: "USER_INPUT",
        payload: value,
    }
}

export const toReserve = (list) =>{
    return{
        type: "TO_RESERVE",
        payload: list
    }
}

export const reserveSeats = (list) =>{
    return{
        type: "RESERVE_SEATS",
        payload: list
    }
}