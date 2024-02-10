import FormInputs from "./FormInputs";
import useFormContext from "../context/useFormContext";
import { Button, formLabelClasses } from "@mui/material";
import { useState } from "react";
import CustomerInfo from "./CustomerInfo";

const Form = () => {
    //const {page, setPage, data, title, prevHide, nextHide, submitHide} = useFormContext()

    function validateInput() {
        // validate before submitting and moving on 
        if(customerData.password == customerData.passwordRetype) {
            return true
        } else {
            return false
        }
    }


    const [customerData, setCustomerData] = useState({
        firstName: "",
        mi: "",
        lastName: "",
        suffix: "",
        mailingAddress: "",
        phoneNumber: "",
        emailAddress: "",
        password: "",
        passwordRetype: ""
    })

    const handleSubmit = e => {
        e.preventDefault()
        if(validateInput()) {
            console.log(JSON.stringify(customerData))
        } else {
            console.log("Not validated")
        }

    }

    const handleChange = e => {
        const type = e.target.type
        const name = e.target.name

        const value = type == "checkbox"
            ? e.target.checked
            : e.target.value 

    
        setCustomerData(prevData => ({...prevData, [name] : value}))
    }

    // not required
    // information in everything except these two values
    const {mi, suffix, ...otherProps} = customerData
    var canSave = [...Object.values(otherProps)].every(Boolean) // every value in this array has something
    // const handlePrev = () => setPage(prev => prev - 1)
    // // this needs to also call validation
    // const handleNext = () => setPage(prev => prev + 1)


    const content = (
        <form onSubmit={handleSubmit}>
            <header>
                {/* {title} */}
            </header>

            {/* <FormInputs/> */}
            <CustomerInfo data = {customerData} handleChange = {handleChange}></CustomerInfo>
            
            <div>
                    {/* <Button variant = "text" onClick = {handlePrev}>Previous</Button> */}
                    {/* <Button variant = "text" onClick = {handlePrev}>Back</Button>
                    <Button variant = "text" onClick = {handleNext}>Continue</Button> */}
                    <Button type = "submit" variant="contained" disabled = {!canSave}>Submit</Button>
                    {/* <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button> */}
            </div>

        </form>
    )

    return content
}

export default Form;



/// 6:13 in this video
/// https://www.youtube.com/watch?v=FGM6FQmdX8I&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp&index=50