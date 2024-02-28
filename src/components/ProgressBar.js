import useFormContext from "../hooks/useFormContext";
import { LinearProgress } from "@mui/material";

const ProgressBar = () => {
    const {page, title} = useFormContext()
    const interval = 100 / Object.keys(title).length
    const progress = ((page + 1) * interval).toFixed(2)

    const steps = Object.keys(title).map((step, i) => {
    
        return <div>
                <div class>
                    <svg height="16" width = "96">
                        <circle
                            cx="48"
                            cy="8"
                            r="8"
                            fill = {title[i] == title[page]? "#33adad" : "#cccccc"}
                        />
                    </svg>
                </div>
                <div class = "w-24 mt-4 text-xs text-body-copy" key={i}>{title[i]}</div>
            </div>
    })

    return (
        <section>
            <div class = "flex justify-center my-12">
            <div class = "w-76">
                <div class = "grid grid-cols-3 gap-4">
                    {steps}
                </div>
            </div>
            </div>
        </section>
    )
}

export default ProgressBar;