import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { googleLogin } from '../../actions/oauth';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors:{},
      formField:[]
    }
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onBlurValidate = this.onBlurValidate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }
  componentWillMount(){
    this.setState(
      {
        formField:[
          {name:'username',type:'text',label:'Name',value:'',required:'true'},
          {name:'userage',type:'number',label:'Age',value:'', min:'1', max:'5'},
          {name:'userloc',type:'text',label:'Location',value:'',required:'true',pattern:'.{5,10}',title:'5 to 10 characters'},
        ]
      }
    )
  }

  onChange(e){
    let id = e.target.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.formField[id].value = e.target.value;
    this.setState(stateCopy);
  }

  validate(){
    var stateForError = Object.assign({}, this.state);
    stateForError.errors = {};
    this.setState(stateForError);
    stateForError.formField.map((field, i) => {
      if(field.required && field.value == ''){
        stateForError.errors[field.name] = field.label+' is required';
      }
      else if(field.min && field.value && parseFloat(field.value) < parseFloat(field.min)){
        stateForError.errors[field.name] = field.label+' should be greater than'+ field.min;
      }
      else if(field.max && field.value && parseFloat(field.value) > parseFloat(field.max)){
        stateForError.errors[field.name] = field.label+' should be lesser than'+ field.max;
      }
      else if(field.pattern){
        let p = new RegExp(field.pattern);
        if(!p.test(field.value)){
          stateForError.errors[field.name] = field.title;
        }
      }
    })
    this.setState(stateForError);
    if(stateForError.errors) return false;
    else return true;
  }

  onBlurValidate(e){
    console.log('on-blur');
    let id = e.target.id;
    var stateOnBlur = Object.assign({}, this.state);
    let field = stateOnBlur.formField[id];
    stateOnBlur.errors[field.name] = '';
    if(field.required && field.value == ''){
      stateOnBlur.errors[field.name] = field.label+' is required';
    }
    else if(field.min && field.value && parseFloat(field.value) < parseFloat(field.min)){
      stateOnBlur.errors[field.name] = field.label+' should be greater than'+ field.min;
    }
    else if(field.max && field.value && parseFloat(field.value) > parseFloat(field.max)){
      stateOnBlur.errors[field.name] = field.label+' should be lesser than'+ field.max;
    }
    else if(field.pattern){
      let p = new RegExp(field.pattern);
      if(!p.test(field.value)){
        stateOnBlur.errors[field.name] = field.title;
      }
    }
    this.setState(stateOnBlur);

  }

  onSubmit(e){
    e.preventDefault();
    if(this.validate()){
      this.props.userSignupRequest(this.state).then(
        (data) => {
          console.log(data);
          this.props.addFlashMessage({
            type:'success',
            text:'Signup Successful'
          })
          browserHistory.push('/');
        }
      );
    }

  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit} noValidate>
          <h2>Join our community</h2>
          {/* {this.state.formField.map((f,i) => {
            return (
              <div className="form-group" key={i}>
                <TextFieldGroup
                  id={i}
                  label={f.label}
                  type={f.type}
                  onChange={this.onChange}
                  onBlur={this.onBlurValidate}
                  value={f.value}
                  name={f.name}
                  pattern={f.pattern}
                  title={f.title}
                  required={f.required}
                  min={f.min}
                  max={f.max}
                  error = {errors[f.name]}
                 />
              </div>
            );
          })} */}
          <p className="text-muted"> Please sign in to checkout the awesome !!</p>

          {/* <div className="form-group">
            <button className="btn btn-success">
              Sign Up
            </button>
          </div> */}

        </form>

        <hr/>

        <div className="form-group">
          <button className="btn btn-danger" onClick={this.handleGoogle}>Sign in with Google</button>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(SignupForm);
