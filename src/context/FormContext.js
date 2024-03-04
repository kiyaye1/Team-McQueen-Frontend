import { createContext, useState } from "react"


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

        // const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
        // const email_regex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/
        // const name_regex = /^[a-zA-Z]{2,}$/

        // const validPassword = pwd_regex.test(data.customer_password)
        // const validName = name_regex.test(data.customer_firstName)
        // console.log("valid password: " + validPassword)
        // console.log("valid name" + validName)

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
    
    // can submit when required inputs are all fulled in, and when the user is on last page
    // const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page == Object.keys(title).length - 1
    const canSubmit = page == Object.keys(title).length - 1

    // checking all inputs that start with 'customer', except for non required ones
    // determine if user can go to next page
    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('customer') && key !== 'mi' && key !== "suffix")
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

