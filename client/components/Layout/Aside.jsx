import "./style.css";

import { ArrowRight } from 'lucide-react';

export function Aside({options, setOptions}){

    return (<div className="dashboard__aside">
        <div className="dashboard__logo">
            <img className="dashboard__logo--img" src="logo.png" alt="logo" />
        </div>
        <div className="dashboard__aside--items">
            <button className="dashboard__aside--item" onClick={()=>{setOptions({ intensity: true, relevance: false, likelihood: false, impact: false })}}>
                <ArrowRight size={18} /> Intensity 
            </button>
            <button className="dashboard__aside--item" onClick={()=>{setOptions({ intensity: false, relevance: true, likelihood: false, impact: false })}} >
                <ArrowRight size={18} /> Relevance 
            </button>
            <button className="dashboard__aside--item" onClick={()=>{setOptions({ intensity: false, relevance: false, likelihood: true, impact: false })}}>
                <ArrowRight size={18} /> Likelihood
            </button>
            <button className="dashboard__aside--item" onClick={()=>{setOptions({ intensity: false, relevance: false, likelihood: false, impact: true })}}>
                <ArrowRight size={18} /> Impact
            </button>
        </div>
    </div>);
}