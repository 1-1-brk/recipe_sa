import React from 'react'
// import EffectExampleComponent from './EffectExampleComponent';
// import WindowTracker from './WindowTracker';

function DEMOPART() {

  const [items, setItems] = React.useState(['item1','item2'])
  const [say, setBool] = React.useState('Yes')
  const [formData, setFormData] = React.useState(
    {firstName:"", lastName:"", email:"", isFriendly : false, employment:"", favColor:""}
  )
  const [lastName, setLastName] = React.useState('')

  function addItem(){
    const newItem = `item${items.length + 1}`
    setItems(prevState => [...prevState, newItem])
  }

  function clearItems(){
    setItems([])
  }
  
  const itemsElements = items.map(
    item => <p key={item}>{item}</p>
    )
    
    function changeBool(){
      const newBool = (say==='Yes') ? 'No' : 'Yes'

      
      // if (say==='Yes'){
      //   newBool = 'No'
      // }
      // else {
      //   newBool = 'Yes'
      // }
      setBool((say==='Yes') ? 'No' : 'Yes')
    }

    function handleNameChange(event){
      const {name, value, type, checked} = event.target
      setFormData(prevNames =>{
        return{
        ...prevNames,
        [name] : (type === "checkbox" ? checked : value)
        }
      })
    }

  function handleSubmit(event){
    event.preventDefault()
    console.log(formData)
  }

  // console.log(formData)
  return (
    <div className="App">
      {/* <WindowTracker /> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={changeBool} className='button'>{say}</button>
        {itemsElements.length != 0  &&   <button onClick={clearItems} className='button'>clear items...</button>}
        <button onClick={addItem} className='button'>Add item</button>


        <div className='items'>
        {itemsElements}
        </div>
  
        <form onSubmit={handleSubmit}>
          
          <input type="text" placeholder="FirstName" name="firstName" onChange={handleNameChange} value={formData.firstName}/>
          <input type="text" placeholder="LastName" name="lastName" onChange={handleNameChange} value={formData.lastName}/>
          <input type="text" placeholder="email" name="email" onChange={handleNameChange} value={formData.email}/>

          
          <input type="checkbox" id="isFriendly" name="isFriendly" onChange={handleNameChange} checked={formData.isFriendly}/>
          <label htmlFor="isFriendly" >Are you friendly?</label>


          <fieldset>
            <legend>Current Status</legend>
            <input 
            type='radio'
            id='unemployed'
            name="employment"
            value='unemployed'
            checked={formData.employment === 'unemployed'}
            onChange={handleNameChange}
            />
            <label htmlFor='unemployed'>unemployed</label>
            <input 
            type='radio'
            id='employed'
            name="employment"
            value='employed'
            checked={formData.employment === 'employed'}
            onChange={handleNameChange}
            />
            <label htmlFor='employed'>employed</label>
            <input 
            type='radio'
            id='enterpreneur'
            name="employment"
            value='enterpreneur'
            checked={formData.employment === 'enterpreneur'}
            onChange={handleNameChange}
            />
            <label htmlFor='enterpreneur'>enterpreneur</label>
          </fieldset>

          <select
            id='favColor'
            value={formData.favColor}
            onChange={handleNameChange}
            name="favColor"
            defaultValue={"empty"}
          >
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
          </select>
          <button>submit (react default)</button>
        </form>
        {/* <EffectExampleComponent /> */}
    </div>
  );
}

export default DEMOPART;
