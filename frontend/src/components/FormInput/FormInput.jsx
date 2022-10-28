import "./FormInput.scss";

const FormInput = (props) => {
  return (
    <input
      className="formInput"
      ref={props.refer}
      type={props.type}
      id={props.inputId}
      placeholder={props.helpText}
      required={props.isRequired}
    />
  );
};

export default FormInput;
