import { useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap-css-only/css/bootstrap.min.css';  
import 'mdbreact/dist/css/mdb.css';
import { formik, useFormik } from "formik";
import NumberFormat, { NumericFormat } from 'react-number-format';
import { MDBContainer } from "mdbreact";
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
function App() {
  
  const [formFields, setFormFields] = useState([
    { name: '', CTC: '' },
    { name: '', CTC: '' },
    { name: '', CTC: '' },
    { name: '', CTC: '' },
    { name: '', CTC: '' },
  ]);
  const [val, setVal] = useState('');
  const [percentage,setpercentage] = useState('');
  const [count, setCount] = useState('');
  const [esop, setEsop] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = parseInt(event.target.value.replace(/,/g,''));
    
    setFormFields(data);
  };

  
  const handleFormChangeName = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

 
  const submit = (e) => {
    e.preventDefault();
  };

  const addFields = () => {
    const arr = [];
    for (let cnt = 0; cnt < +count; cnt++) {
      arr.push({
       name: '',
       CTC: '',
      });
    }
    setFormFields([...formFields, ...arr]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  let total = 0;
  
  
  return (
    
    <div className='App' >
    
    <div className='header'>ESOP POOL Calculator</div>
    <div className='global'>
    
    
      <div class="settings">
      <label><h3 className='heading1'>Enter Company Valuation</h3></label>
      <NumericFormat className='valuation'
      thousandSeparator = {true}
        type='text'
        name= 'val'
        
        value={val}
        onChange={(event) => setVal(event.target.value)}
        
        placeholder = "Enter Company's Valuation... "
        />
        
      </div>
      <div class="settings">
      <label><h3 className='heading2'>Enter ESOP POOL Percentage</h3></label>
      <NumericFormat className='percentage'
        type='ESOP_Percentage'
        name= 'percentage'
        
        value={percentage}
        onChange={(event) => setpercentage(event.target.value)}
        
        placeholder = "Enter ESOP POOL % "
        />
        
      </div>
      
      <h3 className='heading'>Enter Role and CTC offered to an Employee...</h3>
      <div  class="grid-container">
      <div class="grid-child magenta">
      <form onSubmit={submit}>
        {formFields.map((form,index) => {
          return (
            <div  key={index}>
              <input className='Name'
                name='name'
                placeholder='Role'
                onChange={(event) => handleFormChangeName(event, index)}
                value={form.name}
              />
              
             
              <NumericFormat className='ctc'
              thousandSeparator = {true}
                name='CTC'
                placeholder='CTC'
                onChange={(event) => handleFormChange(event, index)}
                value={form.CTC}
              />
              <button className = 'button-72' role="button" onClick={() => removeFields(index)}>Remove</button>
              </div>
          );
          
        })}
        
            
      </form>
      </div>

       <div class = "grid-child1 magenta">
       <h3 className="heading3">Percentage of ESOPs </h3>
        <div className='section'>{formFields.map(({ name, CTC }) => {
        console.log(total);
        let finval = parseInt(val.replace(/,/g,''))
        let perc = CTC/finval;
        //let perc = (+CTC / +val) * 100;
        total += perc;
        return <p>{`${name}: ${perc}%`}</p>;
      })}</div>
      </div>
      </div>
      
      <input className='Addmore'
        type='text'
        name='count'
        value={count}
        onChange={(event) => setCount(event.target.value)}
        placeholder='Enter Count...'
      />

      <button className='button-72' onClick={addFields}>Add More..</button>
     
      <br />
      <button className='button-72-submit' onClick={submit}>Submit</button>
      </div>
      

      

      
      {total ? (
        <h3 className='footer'>ESOP Pool Size: {total}</h3>
      ) : (
        <h3 className='footer'>Please Fill Above Fields</h3>
        
      )}
      
      
      
      
        
    </div>
  );
       
}

export default App;
