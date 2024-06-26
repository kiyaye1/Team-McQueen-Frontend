import Form from '../signup-components/Form'
import ProgressBar from '../signup-components/ProgressBar'
import {FormProvider} from '../context/FormContext'

function Register() {
  return (
      <><div class="text-center m-16">
        <h1 class = "text-section-head">Sign Up</h1>
            <FormProvider>
              <ProgressBar/>
              <Form/>
            </FormProvider>
      </div></>
    );
  }
  
  export default Register;