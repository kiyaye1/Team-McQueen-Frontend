import { createContext, useState, useEffect } from "react"


// Global states, all pages on form cam view states 
const FormContext = createContext({})

// Children -- all nested components in the form provider tags 
export const FormProvider = ({children}) => {
    // define all the things we want to pass within the form provider
    const title = {
        0: "Create Account",
        1: "Drivers License",
        2: "Payment Cards",
        3: "Approval Awaits"
    }

    const [page, setPage] = useState(0)

    const[data, setData] = useState({
        firstName: "",
        lastName: "",
        middleInitial: "",
        suffix: "",
        emailAddress: "",
        password: "",
        dlNumber: "",
        dlState: "",
        paymentCards: {
            0: {
                cardName: "",
                cardNumber: "",
                expirationDate: "",
                cvc: ""
            }
        }
    })

    // const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    // const canNextPage1 = Object.keys(data)
    //     .filter(key => key.startsWith('bill') && key !== 'billAddress2')
    //     .map(key => data[key])
    //     .every(Boolean)

    // const canNextPage2 = Object.keys(data)
    //     .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
    //     .map(key => data[key])
    //     .every(Boolean)

    // const disablePrev = page === 0

    // const disableNext =
    //     (page === Object.keys(title).length - 1)
    //     || (page === 0 && !canNextPage1)
    //     || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"
       
    return (
        <FormContext.Provider value = {{title, page, setPage, data, setData, prevHide, nextHide, submitHide}}>
            {children} 
        </FormContext.Provider>
    )
    
}

export default FormContext;

//5:16 https://www.youtube.com/watch?v=QSBc8bABwE0&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp&index=51&t=61s