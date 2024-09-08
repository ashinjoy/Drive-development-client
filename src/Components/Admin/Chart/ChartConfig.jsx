import React from "react";

function ChartConfig(input) {
  const data = structuredClone(input);
  console.log("datain u", data);
  const dataToPlot = [];
  // const obj = {};

 for (const dataset in data[0]) {
   if (data[0][dataset].length > 0) {
     dataToPlot.push(data[0][dataset][0].totalNewUsers)
   } else {
    dataToPlot.push(0)
   }
 }
// const filter = dataToPlot.filter((obj)=>{
//   if(Object.keys(obj).length > 0){
// return obj
//   }
// })
// console.log('foilyer',filter);

  

  const labels = Object.keys(data[0]).reverse();
  console.log('datatoplot',dataToPlot);
  // console.log(dataToPlot);
  
  
  // const dataOfUsers = [];

  //
  // console.log('main',mainData);

  return {
    labels: labels,
    datasets: [
      {
        label: "Newly Registerd Users",
        data: dataToPlot.reverse(),
      },
      // {
      //   label: "Newly Registerd Users",
      //   data: [2, 3, 1],
      // },
    ],
  };
}

export default ChartConfig;
