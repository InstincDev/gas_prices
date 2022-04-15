import {apiKey} from '../api_key.js'


let graphTitle;
let yearLabels = [];
let gasPrices = [];
let gasColor = [];




const url1 = `https://api.eia.gov/series/?api_key=${apiKey()}&series_id=PET.EMA_EPM0_PBS_NUS_DPG.A`;

fetch(url1)
    .then((res) => res.json()) // parse response as JSON
    .then((info) => {
      
        //title
        graphTitle = info.series[0].description;
        document.querySelector("h2").innerText = graphTitle;

        for (let i = 0; i < info.series[0].data.length; i++) {
            if (info.series[0].data[i][1] != null) {
                //date labels
                yearLabels.unshift(info.series[0].data[i][0]);
                //gas prices
                gasPrices.unshift(info.series[0].data[i][1].toFixed(2));

                gasColor.unshift(
                    "#" +
                        info.series[0].data[i][1]
                            .toString()
                            .replace(/[^0-9]/g, "54")
                );
            }
        }

        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: yearLabels,
                datasets: [
                    {
                        label: "Average Annual Price",
                        data: gasPrices,
                        backgroundColor: gasColor,
                    },
                ],
            },
        
        });
    })
    .catch((err) => {
        console.log(`error ${err}`);
    });

