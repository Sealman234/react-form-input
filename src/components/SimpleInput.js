import React, { useState, useRef } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef(null);
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); // 取消送出後的預設行為 (Send HTTP Request)

    // console.log(nameInputRef.current.value); => 如果送出的值只會在這邊使用，就用 useRef
    console.log(enteredName); // 如果需要監控輸入值的變化，像是即時驗證，則使用 useState

    // nameInputRef.current.value = ''; => 不建議，不要直接更改 DOM
    setEnteredName(''); // 使用 useState 做送出後清空的功能
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
