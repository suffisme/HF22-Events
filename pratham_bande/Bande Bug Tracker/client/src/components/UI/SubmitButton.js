import './SubmitButton.css'

const SubmitButton = (prop) => {
    return(
        <button className="button_33" onClick={prop.onClick}>{prop.children}</button>
    )
}
export default SubmitButton;