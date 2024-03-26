import FormInputs from "./FormInputs";
import useFormContext from "../hooks/useFormContext";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
        console.log("submit")
        
        //call CreditCardInfoValidation from FormContext
        const errors = CreditCardInfoValidation()

        if(errors) {
            setCardNameError(errors.cardName)
            setCardNumberError(errors.cardNumber)
            setExpDateError(errors.cardExpirationDate)
            setCardccvError(errors.cardccv)
            console.log("errors")
        } else {
            setCardNameError("")
            setCardNumberError("")
            setExpDateError("")
            setCardccvError("")
            
            console.log("else")
            //Store credit card customer request info in the database tables
            //Customer, CustomerPayment, Request, CustomerApplicationRequest, and CustomerServiceRequest
            axios.post('https://api.mcqueen-gyrocar.com/', data)
            .then(res => {
                console.log(res)
                //Direct customer to the registration-confirmation page
                navigate('/registration-confirmation');
            })
            .catch(err => console.error(err))   
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

