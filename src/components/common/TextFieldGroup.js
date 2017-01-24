import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ id,name, value, label, type, onChange, required, min, max, pattern, title, error,onBlur}) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        name={name}
        className="form-control"
        pattern ={pattern}
        title ={title}
        required ={required}
        min ={min}
        max ={max}
      />
      {error && <span className="help-block">{error}</span>}
    </div>  );
}

TextFieldGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func,
  value:React.PropTypes.string.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
