"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/globals.css";
import Link from "next/link";

export default function Filter() {

    const [data, setData] = useState<any>();
    const [firstSelect, setFirstSelect] = useState<boolean>(false);
    const [secondSelect, setSecondSelect] = useState<boolean>(false);

    const isDisabled: boolean = !firstSelect && !secondSelect;

    useEffect(() => {
        axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
            .then(response => {
                setData(response.data.Results);
            })
    }, [])

    return (
        <div className={"min-h-screen items-center min-w-screen"}>
            <div className={"bg-blue-800 white text-white min-w-screen p-3 text-2xl"}>Filter</div>
            <div className={"m-3 text-2xl"}>Select vehicle:</div>
            <div className={"m-3"}>
                <select
                    className={"bg-gray-300 p-2"}
                    onChange={() => setFirstSelect(true)}
                >
                    {data && data.map((e: any) =>
                        <option key={e.MakeId} className={"p-1 shadow-md"}>
                            {e.MakeName} {e.MakeId}
                        </option>
                    )}
                </select>
            </div>
            <div className={"m-3"}>
                <select
                    className={"bg-gray-300 p-2"}
                    onChange={() => setSecondSelect(true)}
                >
                    {/*there is no information about model year in data, so for example we can filter cars by id*/}
                    {data && data.filter((e: any) => 2015 <= Number(e.MakeId)  && Number(e.MakeId) <= 2024)
                        .map((e: any) =>
                        <option key={e.MakeId} className={"p-1 shadow-md"}>
                            {e.MakeName} {e.MakeId}
                        </option>
                    )}
                </select>
            </div>

            <Link href="/Result">
                <button
                    className={`p-2 m-3 ${isDisabled ? `bg-gray-300` : `bg-blue-700 text-white`}`}
                    disabled={isDisabled}
                >
                    Next
                </button>
            </Link>
        </div>
    )
}