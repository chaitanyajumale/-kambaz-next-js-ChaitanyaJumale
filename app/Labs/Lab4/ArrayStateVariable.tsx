import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button 
        onClick={addElement}
        className="btn btn-success mb-3"
        style={{ display: 'block' }}
      >
        Add Element
      </button>
      <div>
        {array.map((item, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <h4 className="me-3 mb-0" style={{ minWidth: '30px' }}>{item}</h4>
            <button 
              onClick={() => deleteElement(index)}
              className="btn btn-danger"
              id="wd-delete-element-click"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}