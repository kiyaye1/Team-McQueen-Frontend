import useFormContext from "../context/useFormContext"
import CreditCardInfo from "./CreditCardInfo"
import DriversLicenseInfo from "./DriversLicenseInfo"
import CustomerInfo from "./CustomerInfo"

const FormInputs = () => {
    const {page} = useFormContext()

    const display = {
        0: <CustomerInfo/>,
        1: <DriversLicenseInfo/>,
        2: <CreditCardInfo/>
    }

    const content = (
        <div>
            {display[page]}
        </div>
    )

    return content
}
export default FormInputs