import FormInputs from "./FormInputs";
import useFormContext from "../hooks/useFormContext";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const validator = require("validator");
const { isValid } = require('usdl-regex');
const valid = require("card-validator");

const Form = () => {
    const {
        title, 
        page, 
        setPage, 
        data,
        CustomerInfoValidation,
        setFirstNameError,
        setLastNameError,
        setMailingAddressError,
        setPhoneNumberError,
        setEmailAddressError,
        setPasswordError,
        setPasswordRetypeError,
        DlInfoValidation,
        setdlNumberError,
        setdlStateError,
        CreditCardInfoValidation,
        setCardNameError,
        setCardNumberError,
        setExpDateError,
        setCardccvError, 
        canSubmit,
        disablePrev,
        disableNext
    } = useFormContext()

    // set page count back one
    const handlePrev = () => setPage(prev => prev - 1)

    // set page count up one
    const handleNext = () => {
        if(page === 0) {
            //call CustomerInfoValidation from FormContext
            const errors = CustomerInfoValidation()
            if(errors) {
                setFirstNameError(errors.customer_firstName)
                setLastNameError(errors.customer_lastName)
                setMailingAddressError(errors.customer_mailingAddress)
                setPhoneNumberError(errors.customer_phoneNumber)
                setEmailAddressError(errors.customer_emailAddress)
                setPasswordError(errors.customer_password)
                setPasswordRetypeError(errors.customer_passwordRetype)
            } else {
                setFirstNameError("")
                setLastNameError("")
                setMailingAddressError("")
                setPhoneNumberError("")
                setEmailAddressError("")
                setPasswordError("")
                setPasswordRetypeError("")

                setPage(prev => prev + 1)
            }
        } 
        else if(page === 1) {
            //call DlInfoValidation from FormContext
            const errors = DlInfoValidation()
            if(errors) {
                setdlNumberError(errors.dlNumber)
                setdlStateError(errors.dlState)
            } else {
                setdlNumberError("")
                setdlStateError("") 

                setPage(prev => prev + 1)             
            }
        }     
    }

    const navigate = useNavigate();

    // handle submit, console log user input
    const handleSubmit = e => {
        e.preventDefault()
        
        //call CreditCardInfoValidation from FormContext
        const errors = CreditCardInfoValidation()

        if(errors) {
            setCardNameError(errors.cardName)
            setCardNumberError(errors.cardNumber)
            setExpDateError(errors.cardExpirationDate)
            setCardccvError(errors.cardccv)
        } else {
            setCardNameError("")
            setCardNumberError("")
            setExpDateError("")
            setCardccvError("")

            navigate('/login');
        }   
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

