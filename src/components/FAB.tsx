import { BlocksIcon, BrainCircuit, BriefcaseBusiness, Network, UserCircle } from "lucide-react"

function FAB() {
  return (
    <div className=" md:hidden fab fab-flower">
        {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
        <div tabIndex={0} role="button" className="btn btn-lg btn-info btn-circle"><Network/></div>

        {/* Main Action button replaces the original button when FAB is open */}
        <div className="fab-close">
            <span className="btn btn-circle btn-lg btn-error">X</span>
        </div>

        {/* buttons that show up when FAB is open */}
        <div className="tooltip tooltip-left" data-tip="About">
            <button className="btn btn-lg btn-circle"><UserCircle /></button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Projects">
            <button className="btn btn-lg btn-circle"><BlocksIcon/></button>
        </div>
        <div className="tooltip" data-tip="Skills">
            <button className="btn btn-lg btn-circle"><BrainCircuit/></button>
        </div>
        <div className="tooltip" data-tip="Experience">
            <button className="btn btn-lg btn-circle"><BriefcaseBusiness/></button>
        </div>
    </div>
  )
}

export default FAB