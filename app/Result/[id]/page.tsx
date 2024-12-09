import axios from "axios";

export async function generateStaticParams() {
    try {
        const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");
        const results = response.data;
    } catch (error) {
        console.error(error);
    }

    // return results.map((e: any) => )
}