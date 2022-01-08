import React, { Reducer, useReducer } from "react";

interface IInputState {
  value: string;
  isTouched: Boolean;
}
interface IInputActionInput {
  type: "INPUT";
  value: string;
}
interface IInputAction {
  type: "BLUR" | "RESET";
}
interface IValidatorFn {
  (value: string): Boolean;
}
interface IFormInputHandler {
  (event: React.FormEvent<HTMLInputElement>): void;
}
interface IUseInput {
  value: string;
  valueIsValid: Boolean;
  hasError: Boolean;
  inputChangeHandler: IFormInputHandler;
  inputBlurHandler: IFormInputHandler;
  reset: () => void;
}

const initialInputState: IInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer: Reducer<IInputState, IInputActionInput | IInputAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { value: state.value, isTouched: true };
    case "RESET":
      return { value: "", isTouched: false };
    default:
      return initialInputState;
  }
};

const useInput = (validator: IValidatorFn): IUseInput => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler: IFormInputHandler = (event) => {
    dispatch({ type: "INPUT", value: event.currentTarget.value });
  };

  const inputBlurHandler: IFormInputHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset: () => void = () => {
    dispatch({ type: "RESET" });
  };

  const value = inputState.value;
  return {
    value,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
