import React from 'react';
import {Line} from 'react-chartjs-2';
import { useState,useEffect} from 'react';

function LineGraph({casesType, ...props}) {
    const [data,setData] = useState({});
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    //get last 120 days data from api

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let chartData = buildChartData(data,casesType);
            setData(chartData);

        })
    }, [casesType])

    const buildChartData = (data,casesType) => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    return (
        <div>
            {data?.length > 0 && (
                <Line 
                onClick = {props.onClick}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(128,128,128)",
                            borderColor: '#CC1034',
                            data: data
                        }
                    ]
    
                }}
                />

            )}
            
        </div>
    )
}

export default LineGraph
