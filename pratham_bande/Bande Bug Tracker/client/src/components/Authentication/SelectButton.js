import './SelectButton.css';

const SelectButton = (props) => {
    return(
        <div 
            class="button-55" 
            style={{backgroundColor: props.selected ? '#FF6666' : ''}}
            onClick={props.onClick}
        >{props.text}</div>
    )
}

export default SelectButton;