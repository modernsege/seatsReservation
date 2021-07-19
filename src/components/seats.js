import React, {useState, useEffect} from 'react';
import '../css/seats.css';
import { useDispatch, useSelector } from 'react-redux';
import { userInput, toReserve } from '../redux/actions/seatActions';
import {useHistory } from 'react-router-dom';
import ReserveBtn from './reserveButton'



function Seats() {
const selectedData = useSelector(state => state.allSeats)
        
  let history = useHistory();

  const seats = []
  for(let i =0; i< selectedData.length; i++){
    seats.push(selectedData[i])
  }

  const dispatch = useDispatch();
  
  let seatDivs = []


  function handleClick_reserved() {
    alert("TO MIEJSCE JEST JUŻ ZAREZERWOWANE!");
  }

  const seatsToBeReserved = useSelector(state => state.seatsToReserve)

  const seatsNextToEachOther = useSelector(state => state.isCheckboxChecked)

  let numberOfChosenSeats = 0;
  function seatState(element){
    let temp = false;
    for (let i =0; i<seatsToBeReserved.length; i++){
      if (seatsToBeReserved[i]==element.id){
        temp = true;
        numberOfChosenSeats++;
      }
    }
    if (element.reserved == true){
      return "true"
    }
    else if(element.reserved == false && temp){
      return "to-be-reserved"
    }
    else if(element.reserved == false){
      return "false"
    }
  }


  const userInputValue = useSelector(state => state.userInputValue)

  function setSeatsNextToEachOther(elementID){
    let choseID = parseInt(elementID.slice(1))
    let seatsToReserve=[];
    const reservedSeats = []
    seats.map((element) =>{
      reservedSeats.push(element)
    })


    let seatNumbersId = [];
    reservedSeats.map((element)=>{
      seatNumbersId.push(element.id)
    })

    let seatNumbers = [];
    
  for(let i=0; i<seatNumbersId.length; i++){
    seatNumbers.push(parseInt(seatNumbersId[i].slice(1)));
  }



  let first = 0;
  let status = false;
  for(let i=0; i<seatNumbersId.length; i++){
    if (seatNumbers[i]==choseID){
      first = seatNumbers.indexOf(seatNumbers[i])
    }
  }

  for (let i =1; i<seatNumbers.length; i++){
  if(status == false){
    if(reservedSeats[i-1].id==elementID){
      status = true;
    }
    else{
      for(let j = 0; j<seatNumbers.length; j++)
      {
        if(reservedSeats[j].id==elementID){
          first = reservedSeats.indexOf(reservedSeats[j])
        }
      }
    }
  }
}

    let temp1=first+1;

        for (let i =temp1; i<seatNumbers.length; i++){

          if(seatNumbers[i]-seatNumbers[i-1]==1 && reservedSeats[i].reserved==false && reservedSeats[i-1].reserved==false && status){
            seatsToReserve.push(reservedSeats[i-1].id)
            if(seatsToReserve.length == userInputValue-1){
              if(seatNumbers[i-1]+1 == seatNumbers[i]){
                seatsToReserve.push(reservedSeats[i].id)
              }
              break;
            }
          }
          else{
            for(let k = 0; k<=seatsToReserve.length+1;k++){
              seatsToReserve.pop()
            }
            return null
          }
      }    
    dispatch(toReserve(seatsToReserve))
    return seatsToReserve;
  }


  function toggleSeat(element){
    let toggleElement = document.querySelector(`#${element.id}`);
    let toggleElements = document.querySelectorAll(".reserved-to-be-reserved");

    let oneSeat = false;
    if(seatsNextToEachOther == true && userInputValue==1){
      oneSeat = true;
    }

    if(seatsNextToEachOther==false || oneSeat ){
      if(element.reserved == false && toggleElement.className.includes("reserved-to-be-reserved"))
      {
        numberOfChosenSeats--;
        toggleElement.classList.remove("reserved-to-be-reserved");
        toggleElement.classList.add("reserved-false")
        let seatsToReserve = []
          for(let j =0;  j< toggleElements.length; j++){
            if(toggleElements[j].className.includes("reserved-to-be-reserved")){
              seatsToReserve.push(toggleElements[j].id)
            }
          }
        dispatch(toReserve(seatsToReserve))
      }
      else if(element.reserved == false && toggleElement.className.includes("reserved-false") &&numberOfChosenSeats<userInputValue){
        numberOfChosenSeats++;
        toggleElement.classList.remove("reserved-false");
        toggleElement.classList.add("reserved-to-be-reserved")
        toggleElements = document.querySelectorAll(".reserved-to-be-reserved");
        let seatsToReserve = []
          for(let j =0;  j< toggleElements.length; j++){
            if(toggleElements[j].className.includes("reserved-to-be-reserved")){
              seatsToReserve.push(toggleElements[j].id)
            }
          }
        dispatch(toReserve(seatsToReserve))
      }
    }
    else{
      let seatsToReserve = []
      for(let i =0; i< toggleElements.length; i++){
        if(element.reserved == false && toggleElements[i].className.includes("reserved-to-be-reserved")){
          for(let i =0; i< toggleElements.length; i++){
            toggleElements[i].classList.remove('reserved-to-be-reserved');
            toggleElements[i].classList.add('reserved-false');
          }
        }
      }

      if(element.reserved == false && toggleElement.className.includes("reserved-false")){
        let neighboringPlaces = setSeatsNextToEachOther(element.id);
        if(neighboringPlaces){
          for(let i = 0; i< neighboringPlaces.length; i++){
              document.getElementById(`${neighboringPlaces[i]}`).classList.remove('reserved-false');
              document.getElementById(`${neighboringPlaces[i]}`).classList.add('reserved-to-be-reserved');
        }
      }
    }
    toggleElements = document.querySelectorAll(".reserved-to-be-reserved");
          for(let j =0;  j< toggleElements.length; j++){
            if(toggleElements[j].className.includes("reserved-to-be-reserved")){
              seatsToReserve.push(toggleElements[j].id)
            }
          }
        dispatch(toReserve(seatsToReserve))
   }
  }


  let temp = 0;
  let state = true;
  
  if (selectedData.length>0){
    for (let j =0; j< 10; j++){
      state = true;
      for (let i =0; i< 15; i++){
        if(seats[temp].cords.y == i){
          seats.slice(temp, temp+1).map((element) => {
            seatDivs.push(<div onClick={() => {
              if (element.reserved==true){
                handleClick_reserved()
              }
                toggleSeat(element);
              }
                
            } 
              className={["seat", `row${element.cords.x}`, `place${element.cords.y}`, `reserved-${seatState(element)}`].join(' ') } id={element.id}></div>)
          })
          temp++;
        }
        else{
          seatDivs.push(<div className="empty" >{""}</div>)
        }
      }
    }
  }
  else{
    history.push('/')
  }



  return (
    <>
      <div className="seats"> 
        {seatDivs}
      </div>
      <div className="seat-information-bar">
        <div className="in-bar-divs">
          <div className="available-seats"></div>
          <span className="in-bar-span">Miejsca dostępne</span>
        </div>

        <div className="in-bar-divs">
          <div className="reserved-seats"></div>
          <span className="in-bar-span">Miejsca zarezerwowane</span>
        </div>

        <div className="in-bar-divs">
          <div className="your-choice"></div>
          <span className="in-bar-span">Twój wybór</span>
        </div>
        <ReserveBtn numberOfChosenSeats={numberOfChosenSeats}></ReserveBtn>
      </div>
    </>
  );
}

export default Seats;
