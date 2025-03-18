import React from "react";


function Image(props){
    return(<div className="image">
                <img onClick={props.handleClick} src={`https://raw.githubusercontent.com/Amr-Zain/React-Instagram-Clone/master/public/${props.src}`}  alt='lifelineImage'/>
            </div>
            )
} 

export default React.memo(Image);