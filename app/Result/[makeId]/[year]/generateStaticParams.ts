// import axios from "axios";
//
// export async function generateStaticParams() {
//     const params: any[] = [];
//     let makeIds: any;
//     const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
//
//     await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
//         .then(response => {
//             makeIds = response.data.Results
//                 .map((e: any) => e.makeId);
//         })
//
//     for (let i = 0; i < makeIds.length; i++) {
//         for (let j = 0; j < makeIds.length; j++) {
//             params.push({makeId: makeIds[i], year: years[j]});
//         }
//     }
//
//     return params;
// }