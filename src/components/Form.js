import FormInputs from "./FormInputs";
import useFormContext from "../hooks/useFormContext";
import { Button } from "@mui/material";

const Form = () => {
    const {
        title, 
        page, 
        setPage, 
        data, 
        canSubmit,
        disablePrev,
        disableNext
    } = useFormContext()

    // function validateInput() {
    //     // validate before submitting and moving on 
    //     if(data.password == data.passwordRetype) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // set page count back one
    const handlePrev = () => setPage(prev => prev - 1)
    // set page count up one
    const handleNext = () => setPage(prev => prev + 1)


    // handle submit, console log user input
    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data))

    }


    const content = (
        <form onSubmit={handleSubmit}>
            <header>
                {/* <h2>{title[page]}</h2> */}
            </header>

            {/* get all input pages from context */}
            <FormInputs/>
            
            <div>
                {/* <Button sx = {{color: '#000180'}} type = "button" variant = "text" onClick = {handlePrev} disabled = {disablePrev}>Previous</Button> */}
                <Button sx = {{color: '#000180'}} type = "button" variant = "text" onClick = {handleNext} disabled = {disableNext}>Continue</Button>
                <Button sx = {{backgroundColor: '#000180'}} type = "submit" variant="contained" disabled = {!canSubmit}>Submit</Button>
            </div>

        </form>
    )

    return content
}

export default Form;



/// 6:13 in this video
/// https://www.youtube.com/watch?v=FGM6FQmdX8I&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp&index=50