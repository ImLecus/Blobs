import { useState } from "react";
function Window(props:any){
    const [classes, setClasses] = useState("window");
    function changeClasses(){
        if(classes == "window min"){
            setClasses("window");
        }
        else{
            setClasses("window min");
        }
    }
    return(
        <div className={classes}>
            <div className="title">
                {props.name}
                <div>
                    <button onClick={ changeClasses }></button>
                </div>
            </div>
            <div className="content">
                {props.content}
                <div className="resizer"></div>
            </div>
        </div>
    );
}

export default Window;