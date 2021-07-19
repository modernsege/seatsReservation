import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import { toReserve } from '../redux/actions/seatActions';


function ButtonChck(props) {
    const [buttonAvailable, setButtonAvailable] = useState(false);

      const seatsNextToEachOther = useSelector(state => state.isCheckboxChecked)
      
    useEffect(()=>{
         if(buttonAvailable){
           history.push('/seats');
          }
       })

      
        const userInputValue = useSelector(state => state.userInputValue)

        const selectedData = useSelector(state => state.allSeats)
        
        const reservedSeats = []
        for(let i =0; i< selectedData.length; i++){
          reservedSeats.push(selectedData[i])
        }
        const dispatch = useDispatch();

        let seatsToReserve=[];

        let seatNumbersId = [];
        reservedSeats.map((element)=>{
          seatNumbersId.push(element.id)
        })

        

        function assignSeats(){
          let i=0
          let temp =0;
          let seatNumbers = [];
          
        for(let i=0; i<seatNumbersId.length; i++){
          seatNumbers.push(parseInt(seatNumbersId[i].slice(1)));
        }
        let oneSeat = false;
        if(seatsNextToEachOther == true && userInputValue==1){
          oneSeat = true;
        }
          if(seatsNextToEachOther == false || oneSeat){
            while(temp<userInputValue){
              if(reservedSeats[i].reserved != true){
                seatsToReserve.push(reservedSeats[i].id)
                temp++;
              }
              i++;
            }
          }
          else{
              let temp1=1;
              let state = true;

              while(state){
                for (let i =temp1; i<seatNumbers.length; i++){
                  if(seatNumbers[i]-seatNumbers[i-1]==1 && reservedSeats[i].reserved==false && reservedSeats[i-1].reserved==false){
                    seatsToReserve.push(reservedSeats[i-1].id)
                    if(seatsToReserve.length == userInputValue-1){
                      if(seatNumbers[i-1]+1 == seatNumbers[i]){
                        seatsToReserve.push(reservedSeats[i].id)
                      }
                      state = false;
                      break;
                    }
                  }
                  else{
                    for(let k = 0; k<=seatsToReserve.length+1;k++){
                      seatsToReserve.pop()
                    }
                    temp1=seatNumbers.indexOf(seatNumbers[i]);
                  }
              }
              }

            }
          dispatch(toReserve(seatsToReserve))
          }



    let availabeSeats = 0;
    for(let i =0; i< reservedSeats.length; i++){
      if(reservedSeats[i].reserved==false){
        availabeSeats ++;
      }
    }


    let history = useHistory();
    const handleClick = () =>{
      let seatsNextToEachOtherFlag = true;
      if (seatsNextToEachOther){
        if(props.value>5){
          seatsNextToEachOtherFlag = false;
          alert("Może być maksymalnie 5 miejsc obok siebie")
        }
      }

      if(parseInt(props.value)>availabeSeats || parseInt(props.value)>150 )
        alert(`Nie ma tylu wolnych miejsc. Aktualnie wolnych miejsc: ${availabeSeats}`)

        if(props.value != '' && parseInt(props.value)<=150 && parseInt(props.value)>0 && parseInt(props.value)<=availabeSeats && seatsNextToEachOtherFlag){
          console.log("123123123123")
          setButtonAvailable(true)
          assignSeats()
         }
      }
  

        return (
  
              <button onClick={handleClick} className="user-input-button">
                  Wybierz miejsca
              </button>
        )
      
}
export default ButtonChck;
