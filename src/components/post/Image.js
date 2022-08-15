import React from "react";


function Image(props){
    return(<div className="image">
                <img onClick={props.handleClick} src={props.src}  alt='lifelineImage'/>
            </div>
            )
} 

export default React.memo(Image);