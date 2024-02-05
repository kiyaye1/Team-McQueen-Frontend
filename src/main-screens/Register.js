import Form from '../components/Form'
import ProgressBar from '../components/ProgressBar'
import {FormProvider} from '../context/FormContext'

function Register() {
 
  return (
      <><div className="Register">
        <h1 class = "text-2xl">Register</h1>
        <FormProvider>
          <Form/>
        </FormProvider>
      </div></>
  
    );
  }
  
  export default Register;

 