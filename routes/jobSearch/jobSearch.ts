import { Request, Response } from "express";
import { Router } from "express";
import { JobDetails } from "../../types/ISearchJob";
import convertUserInputToBoolean from "./utils/convertUserInputToBoolean";
import { format_job_details } from "./utils/formatJobDetails";

const router = Router()

router.get("/", async (request: Request, response: Response)=>{
    const api_key = process.env.API_KEY
    const api_host = process.env.API_HOST
    
    const job = request.body.job
    const num_pages = request.body.num_pages
    const is_remote = request.body.is_remote

    const convert_to_boolean = convertUserInputToBoolean(is_remote)

    if(!job){
        return response.status(403).json({error: "Insira a aréa que deseja ver vagas disponiveis"})
    }

    try {
        const req = await fetch(`${api_host}/search?query=${job}&page=1&num_pages=${!num_pages ? "1" : num_pages > 10 ? "10" : num_pages}&${!is_remote ? "" : convert_to_boolean ? "remote_jobs_only=true&" : ""}date_posted=all`, {
            headers: {
                "x-rapidapi-key": api_key!
            }
        });
        
        const jobs_details: JobDetails[]= (await req.json()).data

        const jobsFiltered = jobs_details.map(format_job_details)

        return response.status(200).json(jobsFiltered)
    } catch (error) {
        return response.status(406).json(error)
    }
})

export default router