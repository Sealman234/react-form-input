import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    // keystroke shouldn't change isTouched, so we use the existing (previous) state
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    // use the existing value
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatchInput({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: 'BLUR' });
  };

  const reset = () => {
    dispatchInput({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
