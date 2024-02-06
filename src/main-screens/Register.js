import Form from '../components/Form'
import ProgressBar from '../components/ProgressBar'
import {FormProvider} from '../context/FormContext'

function Register() {
 
  return (
      <><div class="text-center m-8">
        <h1 class = "text-section-head">Sign Up</h1>
            <FormProvider>
              <Form/>
            </FormProvider>

      </div></>
  
    );
  }
  
  export default Register;

 