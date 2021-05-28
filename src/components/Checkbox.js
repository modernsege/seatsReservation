import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { checkedCheckbox } from '../redux/actions/seatActions';


function Checkbox() {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () =>{
      setChecked(!checked)
      dispatch(checkedCheckbox(checked))
    }


  return (
    <input
        type="checkbox"
        onClick={handleClick} 
        checked={checked}>
    </input>
  );
}

export default Checkbox;
