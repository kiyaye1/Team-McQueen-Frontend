import useFormContext from "../hooks/useFormContext";
import { LinearProgress } from "@mui/material";

const ProgressBar = () => {
    const {page, title} = useFormContext()
    const interval = 100 / Object.keys(title).length
    const progress = ((page + 1) * interval).toFixed(2)
    const steps = Object.keys(title).map((step, i) => {
        return <div>
                <div key={i}>{title[i]}</div>
                {/* <span class = "h-6 w-6 rounded-full bg-teal-secondary"> </span> */}
            </div>
    })

    return (
        <section>
            <div class = "flex justify-center my-8">
            <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 ">
                <div class = "flex space-evenly">
                    {steps}
                </div>
                <LinearProgress variant="determinate" value={progress} />
            </div>
            </div>
        </section>
    )
}

export default ProgressBar;