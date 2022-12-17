import "./window.css"
export default function Window(props){
    return(
        <div className="window">
            <div className="top">{props.name}</div>
            <div className="content">
                {props.content}
            </div>
        </div>
    )
}