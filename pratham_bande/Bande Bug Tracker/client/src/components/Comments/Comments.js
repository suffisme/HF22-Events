import { useState } from "react"
import Card from "../UI/Card";

const Comments = (prop) => {
    const [showComments, setShowComments] = useState(false);

    return(
        <Card>
            <button> Show Comments </button>
        </Card>
    )

}

export default Comments;