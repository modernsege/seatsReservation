import React, {useState, useEffect} from 'react'
import '../index.css';
import '../css/userInput.css';
import NumericInput from './antd'
import Checkbox from './Checkbox'
import ButtonChck from './choseSeatsButton'
import { useSelector, useDispatch } from 'react-redux';
import { seatsM, userInput } from '../redux/actions/seatActions';



  

function UserInput () {
  const [valueState, setValueState] = useState('');
  
  const dispatch = useDispatch();

  fetch('http://localhost:3000/seats')
  .then(res => res.json())
  .then(data => dispatch(seatsM(data)))
  .catch(function(error){
     console.log(error)
  })

  const userInputValue = useSelector(state => state.userInputValue)



  

    const handleChange = (value) =>{
      setValueState(value);
      dispatch(userInput(valueState))
    }

    
      return (
          <div className="user-input-site-wrapper">
                <div className="place-number-input">
                    <span>Liczba miejsc:</span>
                    <NumericInput style={{ width: 120, float: 'right' }} value={valueState} onChange={handleChange} />
                </div>
                <div className="chceckbox-seats-next-to-each-others">
                    <Checkbox id="chckbox"></Checkbox>
                    <label style = {{marginLeft: 10}} for="chckbox">Czy miejsca mają być obok siebie?</label>
                </div>
                <ButtonChck value={valueState}></ButtonChck>
          </div>
        
      );
  }


export default UserInput

//<input type = "checkbox"onChange={this.checkPlaces} style={{marginRight: 10}} id="chckbox"></input>