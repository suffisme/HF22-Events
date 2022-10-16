import classes from './NameCard.module.css'

const NameCard = (prop) => {
    return(
        <div className={classes.cardDiv} onClick={() => {prop.onClick(prop.emp._id, prop.type);}}>
            <h3>{prop.emp.name}</h3>
        </div>
    )
}

export default NameCard;