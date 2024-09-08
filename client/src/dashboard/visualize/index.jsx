import { useState, useEffect } from "react";

import LineChart from "../../../components/visualize/LineChart";
import HorizontalBar from "../../../components/visualize/HorizontalBar";
import VerticalBar from "../../../components/visualize/VerticalBar";
import CircleMap from "../../../components/visualize/CircleMap";

import "./style.css";

export function Visualize({title, type}) {
    const [ data, setData ] = useState([]);

    const [ getOptions, setOptions ] = useState({ filter: "end_year", sort: "asc" });

    let filters = [
        { name: "End Year", value: "end_year" },
        { name: "Start Year", value: "start_year" },
        { name: "Sector", value: "sector" },
        { name: "Topic", value: "topic" },
        { name: "Region", value: "region" },
        { name: "Country", value: "country" },
        { name: "Pestle", value: "pestle" },
        { name: "Source", value: "source" },
    ];

    async function fetchData(){
        let response = await fetch(`/api/dashboard/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getOptions)
        });

        let data = await response.json()

        const transformedArray = Object.entries(data.data).map(([key, value]) => {
            if (key === "") key = "Unknown";
            return ({ letter: key, frequency: value })
        });

        setData(transformedArray);
    }

    useEffect(() => {
        fetchData();
    }, [getOptions]);

    async function handleFilterChange(e){
        setOptions({ ...getOptions, filter: e.target.value });
    }


    return (<>
        <div className="body__main">
            <div className="body__title">{title}</div>
            <div className="body__options">
                <div className="body__filter--outter">
                    <div className="body__filter--title">Filter: </div>
                    <select className="body__filter" name="filters" id="id-body__filter" onChange={handleFilterChange}>
                        {filters.map((filter, index) => <option className="body__filter--item" value={filter.value}>{filter.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="body__chart">
                <ShowChart getOptions={getOptions} data={data} title={title} />
            </div>
        </div>
    </>);
}

function ShowChart({getOptions, data, title}){
    if(getOptions.filter === "end_year"){
        return (<LineChart title={title} data={data} />);
    }
    else if(getOptions.filter === "start_year"){
        return (<LineChart title={title} data={data} />);
    }
    else if(getOptions.filter === "sector"){
        return (<HorizontalBar title={title} data={data} />);
    }
    else if(getOptions.filter === "topic"){
        return (<HorizontalBar title={title} data={data} />);
    }
    else if(getOptions.filter === "region"){
        return (<HorizontalBar title={title} data={data} height={500} width={1000} />);
    }
    else if(getOptions.filter === "country"){
        return (<CircleMap data={data} />);
    }
    else if(getOptions.filter === "pestle"){
        return (<VerticalBar title={title} data={data} height={500} width={1000} />);
    }
    else if(getOptions.filter === "source"){
        return (<HorizontalBar title={title} data={data} height={500} width={1000} />);
    }
    return (<></>);
}