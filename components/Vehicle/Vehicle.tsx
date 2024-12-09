"use client"

import axios from "axios";
import {useEffect, useState} from "react";

export default function Vehicle(props: any) {

    const [data, setData] = useState<any>()
    const [error, setError] = useState<any>();

    useEffect(() => {
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${props.makeId}/modelyear/${props.year}?format=json`)
            .then(response => {
                setData(response.data.Results);
                console.log(response.data);
            }).catch(error => {
            setError(error)
        });
    }, [])

    return (
        <div>
            {error && <div>Oops! Looks like this car model doesn't exist!</div>}
            {data &&
                <div>
                    <div>Vehicles: </div>
                    {data.map((e: any) =>
                        <div key={e.Make_ID}>
                            <div>Name: {e.Make_Name}</div>
                            <div>Model: {e.Model_Name}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}