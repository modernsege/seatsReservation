import React from 'react'
import Seats from './data/db.json'
import NumericInputDemo from './components/userInputSite'


function App() {

/*let db = Seats.seats.map((element) => {
    return <div> 
    <h2>ID: {element.id} </h2>
    <h3>Czy zarezerwowane: {element.reserved ? 'Tak' : 'Nie' } {console.log("aaa",typeof(element.reserved))}</h3>
  </div>
  })
*/
  return (
    <div className="wrapper"> 
      <NumericInputDemo></NumericInputDemo>
    </div>
  );
}

export default App;
