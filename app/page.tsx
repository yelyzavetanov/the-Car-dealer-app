"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/globals.css";
import Link from "next/link";

export default function Filter() {

    const [data, setData] = useState<any>();
    const [modelSelect, setModelSelect] = useState<string>("");
    const [yearSelect, setYearSelect] = useState<string>("");

    const isDisabled: boolean = !modelSelect.length || !yearSelect.length;

    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    let modelId;

    useEffect(() => {
        axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
            .then(response => {
                setData(response.data.Results);
            })
    }, [])

    const onModelSelect = (event: any) => {
        setModelSelect(event.target.value);
        modelId = data.find((e: any) => e.MakeName == modelSelect).MakeId;
        console.log(modelId);
        console.log(!modelSelect, !yearSelect, isDisabled);

    }

    return (
        <div className={"min-h-screen items-center min-w-screen"}>
            <div className={"bg-blue-800 white text-white min-w-screen p-3 text-2xl"}>Filter</div>
            <div className={"m-3 text-2xl"}>Select vehicle:</div>
            <div className={"m-3"}>
                <select
                    className={"bg-gray-300 p-2"}
                    onChange={(event) => onModelSelect(event)}
                >
                    {data && data.map((e: any) =>
                        <option key={e.MakeId} className={"p-1 shadow-md"}>
                            {e.MakeName}
                        </option>
                    )}
                </select>
            </div>
            <div className={"m-3"}>
                <select
                    className={"bg-gray-300 p-2"}
                    onChange={(event) => setYearSelect(event.target.value)}
                >
                    {years.map((e: number) =>
                        <option key={e} className={"p-1 shadow-md"}>
                            {e}
                        </option>
                    )}
                </select>
            </div>

            <Link href={`/Result/${modelId}/${yearSelect}`}>
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