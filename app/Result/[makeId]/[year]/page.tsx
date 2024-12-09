import axios from "axios";
import Vehicle from "@/components/Vehicle/Vehicle";
import Loading from "@/app/loading";
import {Suspense} from "react";

export async function generateStaticParams() {
    const params: any[] = [];
    let makeIds: any;
    const years: string[] = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

    await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
        .then(response => {
            makeIds = response.data.Results
                .map((e: any) => e.makeId);
        })

    for (let i = 0; i < makeIds.length; i++) {
        for (let j = 0; j < makeIds.length; j++) {
            params.push({makeId: makeIds[i], year: years[j]});
        }
    }

    return params;
}

export default function Result({params,}: { params: { makeId: string; year: number; } }) {
    return (
        <Suspense fallback={<Loading/>}>
            <div>
                <div className={"bg-blue-800 white text-white min-w-screen p-3 text-2xl"}>Filter</div>
                <div className={"p-3"}>
                    <Vehicle makeId={params.makeId} year={params.year}/>
                </div>
            </div>
        </Suspense>
    )
}