import React, {useState, useEffect} from 'react'
import '../css/summary.css';
import { useSelector, useDispatch } from 'react-redux';
import { reserveSeats } from '../redux/actions/seatActions';



function Summary() {

  const reservedSeats = useSelector(state => state.seatsToReserve)

  let chosenSeats = []

  const selectedData = useSelector(state => state.allSeats)
        
  const seats = []
  for(let i =0; i< selectedData.length; i++){
    seats.push(selectedData[i])
  }

  for(let i =0; i< seats.length; i++){
    for(let j =0; j< seats.length; j++)
    if(reservedSeats[j] == seats[i].id){
      chosenSeats.push(seats[i])
    }
  }

  const dispatch = useDispatch();
  dispatch(reserveSeats(chosenSeats))


  let seatDivs = []
    chosenSeats.map((element)=>{
      return(
        seatDivs.push(<div>- rząd {element.cords.x}, miejsce {element.cords.y} ({element.id})</div>)
      )
    })

  return (
    <div className="summary-wraper"> 
      <div id="summary-header">Twoja Rezerwacja przebiegła pomyślnie!</div>
      <div id="summary-chosen-places"><p>Wybrałeś miejsca:</p> <div className="chosen-place-information-div">{seatDivs}</div></div>
      <div id = "end-communicat"> Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</div>
    </div>
  );
}

export default Summary;
