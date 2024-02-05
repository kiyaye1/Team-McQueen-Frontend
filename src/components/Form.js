import FormInputs from "./FormInputs";
import useFormContext from "../context/useFormContext";
import { Button } from "@mui/material";

const Form = () => {
    const {page, setPage, data, title, prevHide, nextHide, submitHide} = useFormContext()
    
    const handlePrev = () => setPage(prev => prev - 1)
    const handleNext = () => setPage(prev => prev + 1)

    const content = (
        <form>
            <header>
                <h2>{title[page]}</h2>
                <div>
                    <Button variant = "text" onClick = {handlePrev}>Previous</Button>
                    <Button variant = "text" onClick = {handleNext}>Next</Button>
                    {/* <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button> */}
                </div>
            </header>

            <FormInputs/>

        </form>
    )

    return content
}

export default Form;