import { useContext } from "react"
import FormContext from "../context/FormContext"


// very simple react hook
// so we dont have to import these everytime -- can just call useFormContext
const useFormContext = () => {
    return useContext(FormContext)
}

export default useFormContext