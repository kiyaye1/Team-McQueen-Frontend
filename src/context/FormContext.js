import { createContext, useState } from "react";
import validator from 'validator';
const { isValid } = require('usdl-regex');
const valid = require("card-validator");


// Global states, all pages on form cam view states 
const FormContext = createContext({})

// Children -- all nested components in the form provider tags 
export const FormProvider = ({children}) => {
    // define all the things we want to pass within the form provider
    
    // title for each page of the form 
    const title = {
        0: "Create Account",
        1: "Drivers License",
        2: "Payment Cards",
    }

    // keep track of page number that the user is on
    const [page, setPage] = useState(0)

    // all data 
    const [data, setData] = useState({
        customer_firstName: "",
        customer_mi: "",
        customer_lastName: "",
        customer_suffix: "",
        customer_mailingAddress: "",
        customer_phoneNumber: "",
        customer_emailAddress: "",
        customer_password: "",
        customer_passwordRetype: "",
        validated_customer: false, 
        dlNumber: "",
        dlState: "",
        validated_dl: false, 
        cardName: "",
        cardNumber: "",
        cardExpirationDate: "",
        cardccv: "",
        validated_card: false
    })

    // will eventually need to be able to add mult cards, just adding one for now
    // paymentCards: {
    //     0: {
    //         cardName: "",
    //         cardNumber: "",
    //         expirationDate: "",
    //         cvc: ""
    //     }
    // }

    const handleChange = e => {
        const type = e.target.type
        const name = e.target.name

        const value = type == "checkbox"
            ? e.target.checked
            : e.target.value 

    
        setData(prevData => ({...prevData, [name] : value}))
    }

    // mi and suffix - not required
    // requiredInputs - everything else not defined before (all req inputs)
    // returns a boolean on if otherProps is fully filled in
    const {
        customer_mi, 
        customer_suffix, 
        ...requiredInputs
    } = data

    //Prepare useState hook for the possible errors
    const [customer_firstNameError, setFirstNameError] = useState("");
    const [customer_lastNameError, setLastNameError] = useState("");
    const [customer_mailingAddressError, setMailingAddressError] = useState("");
    const [customer_phoneNumberError, setPhoneNumberError] = useState("");
    const [customer_emailAddressError, setEmailAddressError] = useState("");
    const [customer_passwordError, setPasswordError] = useState("");
    const [customer_passwordRetypeError, setPasswordRetypeError] = useState("");

    const [dlNumberError, setdlNumberError] = useState("");
    const [dlStateError, setdlStateError] = useState("");

    const [cardNameError, setCardNameError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [expDateError, setExpDateError] = useState("");
    const [cardccvError, setCardccvError] = useState("");

    //Validate custome information
    const CustomerInfoValidation = () => {
        let errors = {};
    
        //RegExp pattern for mobile phone numbers
        const phoneNumPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        //RegExp pattern for names
        const namePattern = /^[a-z ,.'-]+$/i;
    
        //Validate first name using the regex pattern 
        if((namePattern.test(validator.trim(data.customer_firstName))) != true) 
            errors.customer_firstName = "Invalid first name"
        
        //Validate last name using the regex pattern
        if((namePattern.test(validator.trim(data.customer_lastName))) != true) 
            errors.customer_lastName = "Invalid last name"
        
        //Validate for a 10 digit phone number using the regex pattern - phoneNumberPattern
        if((phoneNumPattern.test(validator.trim(data.customer_phoneNumber))) != true) 
            errors.customer_phoneNumber = "Invalid Phone Number"
        
        //Validate whether the given string literal is an email or not
        if((validator.isEmail(validator.trim(data.customer_emailAddress))) != true) 
            errors.customer_emailAddress = "Invalid Email"

        //Validate whether mailing address is provided or not
        if ((validator.isEmpty(validator.trim(data.customer_mailingAddress))) === true) 
            errors.customer_mailingAddress = "Invalid Mailing Address"

        //Check if the password can be considered a strong password or not 
        //[minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1]
        if((validator.isStrongPassword(data.customer_password)) != true) 
            errors.customer_password = "Invalid Password"
        
        //Check whether the retyped password matches the password given or not
        if((validator.equals(data.customer_password, data.customer_passwordRetype)) != true) 
            errors.customer_passwordRetype = "Password DOES NOT match"      
        
        return Object.keys(errors).length === 0 ? null : errors;
    }

    //Validate drivers license information
    const DlInfoValidation = () => {
        let errors = {};
        let dlStateNew = "";

        //Prepare a two character state code
        if (!(data.dlState === null || "")) {
            let dlStateArray = data.dlState.split(" ");
            dlStateNew = dlStateArray[0];
        }
    
        //Validate the drivers license numbers respective of the states they are issued
        if(isValid(dlStateNew, validator.trim(data.dlNumber).toUpperCase()) != true)
        errors.dlNumber = "Invalid drivers license number"    
    
        return Object.keys(errors).length === 0 ? null : errors;
    }

    //Validate credit card information
    //Note: credit card information will be stored after they are hashed through the backend
    const CreditCardInfoValidation = () => {
        let errors = {};
    
        //RegExp pattern for names
        const namePattern = /^[a-z ,.'-]+$/i;
    
        //Prepare the card expiration date for validation
        let newExpDate = data.cardExpirationDate.slice(0, 2) + "-20" + data.cardExpirationDate.slice(2);
        const expDateArray = newExpDate.split("-");
        let expMonth = expDateArray[0];
        let expYear = expDateArray[1];
    
        //Validate credit card holder name using the regex pattern - namePattern 
        if((namePattern.test(validator.trim(data.cardName))) != true) 
        errors.cardName = "Invalid card holder name"
        
        //Validate credit card number 
        if(valid.number(data.cardNumber).isValid != true) 
        errors.cardNumber = "Invalid credit card number"        
    
        //Validate card expiration date 
        if(valid.expirationDate(data.cardExpirationDate, expYear).isValid != true) 
        errors.cardExpirationDate = "Invalid card expiration date"        
    
        //Validate card security code 
        if(valid.cvv(data.cardccv).isValid != true) 
        errors.cardccv = "Invalid cvv"        
    
        return Object.keys(errors).length === 0 ? null : errors;
    }
    
    // can submit when required inputs are all fulled in, and when the user is on last page
    // const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page == Object.keys(title).length - 1
    const canSubmit = page == Object.keys(title).length - 1

    // checking all inputs that start with 'customer', except for non required ones
    // determine if user can go to next page
    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('customer') && key !== 'customer_mi' && key !== "customer_suffix")
        .map(key => data[key])
        .every(Boolean)

    // checking all inputs that start with 'dl', except for non required ones
    // determine if user can go to next page
    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('dl'))
        .map(key => data[key])
        .every(Boolean)
        
    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    // const prevHide = page === 0 && "remove-button"
    // const nextHide = page === Object.keys(title).length - 1 && "remove-button"
    // const submitHide = page !== Object.keys(title).length - 1 && "remove-button"


    return (
        // pass values that will be available to child components
        <FormContext.Provider value = {{
            title, 
            page, 
            setPage, 
            data, 
            setData,
            CustomerInfoValidation,
            customer_firstNameError,
            customer_lastNameError,
            customer_mailingAddressError,
            customer_phoneNumberError,
            customer_emailAddressError,
            customer_passwordError,
            customer_passwordRetypeError,
            setFirstNameError,
            setLastNameError,
            setMailingAddressError,
            setPhoneNumberError,
            setEmailAddressError,
            setPasswordError,
            setPasswordRetypeError,
            DlInfoValidation,
            dlNumberError,
            dlStateError,
            setdlNumberError,
            setdlStateError,
            CreditCardInfoValidation,
            cardNameError,
            cardNumberError,
            expDateError,
            cardccvError,
            setCardNameError,
            setCardNumberError,
            setExpDateError,
            setCardccvError,
            handleChange, 
            canSubmit, 
            disableNext, 
            disablePrev
        }}>
            {children} 
        </FormContext.Provider>
    )
    
}

export default FormContext;

