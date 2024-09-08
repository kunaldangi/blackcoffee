import { useEffect, useState } from "react";

import "./style.css";

import { Aside } from "../../components/Layout/Aside";

import { Visualize } from "./visualize";

function Dashboard() {
	const [ options, setOptions ] = useState({ intensity: true, relevance: false, likelihood: false, impact: false });

	useEffect(() => {
		console.log(options);
	}, [options]);

	  
	return (<>
		<div className="dashboard__main">
			<Aside options={options} setOptions={setOptions} />
			<div className="dashboard__body">
				{options.intensity && <Visualize title="Intensity" type="intensity" />}
				{options.relevance && <Visualize title="Relevance" type="relevance"  />}
				{options.likelihood && <Visualize title="Likelihood" type="likelihood" />}
				{options.impact && <Visualize title="Impact" type="impact" />}
			</div>
		</div>
	</>)
}

export default Dashboard;