import { useState } from 'react';
import './App.css';
import Select from "react-select";
import data from './data.json';

Number.prototype.format = function () {
  return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const EditableTable = () => {
  const [employeeData, setEmployeeData] = useState(data);
  const [count, setInputCount] = useState(1);
  const [val, setVal] = useState(1000000);
  const [total, setTotal] = useState(4.9);
  const[POOL,setPool] = useState(10);
  const options1 = [
    { value: "Seed", label: "Seed" },
    { value: "Series A", label: "A" },
    { value: "Series B", label: " B" },
    { value: "Series C", label: "C" },
  ];
  const Options = [
    { value: "Senior", label: "Senior" },
    { value: "Midlevel", label: "Midlevel" },
    { value: "Junior", label: "Junior" },
  ];


 

  
     
    
  const onChangeInput = (e, employeeID) => {
    let { name, value } = e.target;
    let obj;
    if (name === 'salary') {
      value = value.split(',').join('');
      if (isNaN(value)) {
        e.target.value = '';
        return;
      }
      obj = {
        [name]: +value,
        
          ownership: (+value / +val) * 100,
        
        
      };
      const prevOwnership = employeeData.filter(
        (item) => item.employeeID === employeeID
      )[0].ownership;
      const newOwnership = (+value / +val) * 100;
      setTotal(total + (newOwnership - prevOwnership));
    } else {
      obj = { [name]: value };
    }
    const editData = employeeData.map((item) => {
      return item.employeeID === employeeID && name
        ? { ...item, ...obj }
        : item;
       
    });

    setEmployeeData(editData);
  };

  const handleClick = () => {
    const appendedData = [];
    for (let index = 0; index < count; index++) {
      const element = {
        employeeID: employeeData.length + index + 1,
        role: 'New Hire',
        salary: 5000,
        ownership: (5000 / +val) * 100,
      };
      appendedData.push(element);
    }
    setEmployeeData([...employeeData, ...appendedData]);
    setTotal(total + (5000 / +val) * 100 * count);
  };
  
  return (
    <div className='container'>
      
      <h1 className='title'>Employee Options Pool</h1>
      <tr>
      <th><label for={'val'}>Enter Valuation: </label>
      <input
        style={{ width: 'fit-content' }}
        name='val'
        type='text'
        value={val.format()}
        onChange={(e) => {
          const newVal = Number(e.target.value.split(',').join(''));
          if (isNaN(newVal)) {
            e.target.value = '';
            return;
          }
          

          let newTotal = 0;
          const editData = employeeData.map((item) => {
            newTotal += (item.salary / newVal) * 100;
            return { ...item, ownership: (item.salary / newVal) * 100 };
          });
          setTotal(newTotal);
          setEmployeeData(editData);
          setVal(newVal);
        }}
        placeholder='Type Valuation'
      />
      </th>
      <th>
      <label for = {'POOL'}>Enter ESOP POOL  :</label>
      <input
                  name='POOL'
                  type='text'
                  value={`${POOL}%`}
                  // onChange={(e) => onChangeInput(e, employeeID)}
                  placeholder='Type Pool %'
                /></th>
      <th>
      <div className="mt-5 m-auto w-30">
      Funding Stage: <Select options={options1} />
       </div>
       </th>
       </tr>
      


      <table>
        <thead>
          <tr>
          <th>Seniority </th>
            <th>Role</th>
            <th>CTC Offered</th>
            <th>Ownership</th>

          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ employeeID, role, salary, ownership }) => (
            <tr key={employeeID}>
            <td> <Select options={ Options} /></td>
              <td>
                <input
                  name='role'
                  value={role}
                  type='text'
                  onChange={(e) => onChangeInput(e, employeeID)}
                  placeholder='Type role'
                />
              </td>
              <td>
                <input
                  name='salary'
                  value={salary.format()}
                  type='text'
                  onChange={(e) => onChangeInput(e, employeeID)}
                  placeholder='Type salary'
                />
              </td>
              <td>
                <input
                  name='ownership'
                  type='text'
                  value={`${ownership}%`}
                  // onChange={(e) => onChangeInput(e, employeeID)}
                  placeholder='Type ownership'
                />
              </td>
              {/* <img
                width={'15em'}
                src='https://cdn-icons-png.flaticon.com/512/2907/2907762.png'
              /> */}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {total}%</p>
      <input
        style={{ width: '7rem' }}
        name='count'
        type='text'
        value={count}
        onChange={(e) => {
          setInputCount(e.target.value);
        }}
        placeholder='Type Count'
      />
      <button onClick={handleClick}>Add More</button>
    </div>
  );
};

export default EditableTable;
