import "./style.css";

import { X } from 'lucide-react';

export function NotifyBox({type, msg, closeNotify}){
    if(type === "error"){
        return (<>
            <div className="notify__main notify__main--error">
                <span className="notify__msg">{msg}</span>
                <span className="notify__close" onClick={closeNotify}><X size={18}/></span>
            </div>
        </>)
    }
    else if(type === "success"){
        return (<>
            <div className="notify__main notify__main--success">
                <span className="notify__msg">{msg}</span>
                <span className="notify__close notify__close--success" onClick={closeNotify}><X size={18}/></span>
            </div>
        </>)
    }
    else{
        return (<></>);
    }
}