import { Request, Response } from "express";
import { Router } from "express";
import { JobDetails } from "../types/ISearchJob";
import {format} from "date-fns"
import convertUserInputToBoolean from "../utils/convertUserInputToBoolean";

const router = Router()

router.get("/", async (request: Request, response: Response)=>{
    const api_key = process.env.API_KEY
    const api_host = process.env.API_HOST
    
    const job = request.body.job
    const num_pages = request.body.num_pages
    const is_remote_only = request.body.is_remote

    const convert = convertUserInputToBoolean(is_remote_only)

    if(!job){
        return response.json({error: "Insira a aréa que deseja ver vagas disponiveis"})
    }

    try {
        const req = await fetch(`${api_host}/search?query=${job}&page=1&num_pages=${!num_pages ? "1" : num_pages > 10 ? "10" : num_pages}&${!is_remote_only ? "" : convert ? "remote_jobs_only=true&" : ""}date_posted=all`, {
            headers: {
                "x-rapidapi-key": api_key!
            }
        });
        
        const jobsDetails: JobDetails[]= (await req.json()).data

        const jobsFiltered = jobsDetails.map(({
            employer_name,
            job_employment_type,
            job_apply_link, job_title,
            job_description,
            job_is_remote,
            job_posted_at_datetime_utc,
            job_city,
            job_required_experience: {no_experience_required},
            job_required_education: {postgraduate_degree, professional_certification, high_school}}: JobDetails
        ) => {
                const formattedDate = format(job_posted_at_datetime_utc, 'dd/MM/yyyy HH:mm:ss');

                return {
                    employer_name,
                    job_employment_type,
                    job_apply_link, job_title,
                    job_description,
                    job_is_remote,
                    formattedDate,
                    job_city,
                    no_experience_required,
                    postgraduate_degree,
                    professional_certification,
                    high_school
                }
        })

        return response.json(jobsFiltered)
    } catch (error) {
        return response.json(error)
    }
})

export default router