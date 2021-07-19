import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



function ReserveBtn(props) {
    let history = useHistory();

    const userInputValue = useSelector(state => state.userInputValue)
    
    const handleClick = () =>{
        console.log("props.numberOfChosenSeats",props.numberOfChosenSeats)
        if(props.numberOfChosenSeats == userInputValue){
            history.push('/summary');
           }
        else{
            alert("Wybierz zadeklarowaną liczbe miejsc!")
        }
      }

  return (
        <button onClick={handleClick} className="reserve-btn">Rezerwuj</button>
  );
}

export default ReserveBtn;
