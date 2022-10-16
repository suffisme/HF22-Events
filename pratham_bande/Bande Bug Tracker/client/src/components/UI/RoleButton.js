import './RoleButton.css';

const RoleButton = (props) => {
    return(
        <div 
            className="button-55" 
            style={{backgroundColor: props.isSelected ? (props.color ? props.color : '#35BDD0')  : ''}}
            onClick={props.onClick}
        >{props.children}</div>
    )
}

export default RoleButton;