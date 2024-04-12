import React, { useState } from 'react';
import FormInputs from "./FormInputs";
import useFormContext from "../hooks/useFormContext";
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import axios from 'axios';
import BASE_API_URI from "../config";
const stripe = require('stripe')('pk_test_51OC3lZF33393XxHnNjMZAvGE3U7GnSWqsxQXUUbsKNu7z0rNG205ZfDgjhSCFHNt4qvm3ynn7x054FrFUgJvWr4y00dnyECiyI');
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
        termsAccepted, 
        setTermsAccepted,
        //handleChange,
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
    const handleSubmit = async e => {
        e.preventDefault()
        console.log("submit")

        // Check if terms and conditions have been accepted
        if (!termsAccepted) {
            alert("You must agree to the Terms and Conditions to proceed.");
            return;  // Stop the form submission if terms are not accepted
        }
        
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

        } 

        // send data to backend
        // The backend is broken down into steps 
        // but the frontend will perform them all at
        // once after submission of the form

        let step1 = await axios.post(`${BASE_API_URI}/signup/`, 
            {
                firstName: data.customer_firstName,
                lastName: data.customer_lastName,
                phoneNumber: data.customer_phoneNumber,
                emailAddress: data.customer_emailAddress,
                mailingAddress: data.customer_mailingAddress,
                hashedPassword: data.customer_password,
                retypedPassword: data.customer_passwordRetype,
            }
        );
        if (!step1.data.customerID) {
            console.error("Error in step 1");
            return;
        }

        let step2 = await axios.put(`${BASE_API_URI}/signup/updateWdl/${step1.data.customerID}`,
            {
                driversLicenseNum: data.dlNumber,
                driversLicenseState: data.dlState.slice(0,2)
            }
        );
        if (step2.status != 200) {
            console.error("Error in step 2");
            return;
        }

        // need to use stripe to get the token for the credit card info
        let token;
        const cardData = valid.expirationDate(data.cardExpirationDate);
        try {
            token = await stripe.tokens.create({
                card: {
                    number: data.cardNumber,
                    exp_month: cardData.month,
                    exp_year: cardData.year,
                    cvc: data.cardccv
                },
            });
        } catch (error) {
            console.error('Error creating token:', error);
            return;
        }

        try {
            let step3 = await axios.post(`${BASE_API_URI}/signup/postCCI/${step1.data.customerID}`,
            {
                cardToken: token.id
            });
            if (step3.status === 200) {
                alert("Thank you for your registration. Please check your email to verify it.");
                navigate('/');
            } else {
                console.error("Error in step 3");
                return;
            }
        } catch (error) {
            console.error("Error during form submission", error);
            alert("An error occurred during registration. Please try again.");
        }
    }

    const content = (
        <form onSubmit={handleSubmit}>
        <header>
            <h2>{title[page]}</h2> 
        </header>
        {/*get all input pages from context*/} 
        <FormInputs/>
        <div>
                {/*<Button sx = {{color: '#000180'}} type = "button" variant = "text" onClick = {handlePrev} disabled = {disablePrev}>Previous</Button> */}
                <Button sx = {{color: '#000180'}} type = "button" variant = "text" onClick = {handleNext} disabled = {disableNext}>Continue</Button>
            <Button sx = {{backgroundColor: '#000180'}} type = "submit" variant="contained" disabled = {!canSubmit}>Submit</Button>
        </div>
        </form>
    )
    return content
}

export default Form;

