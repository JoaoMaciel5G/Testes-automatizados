import { Request, Response } from "express";
import { Router } from "express";
import { JobDetails } from "../types/ISearchJob";

const router = Router()

router.get("/", async (request: Request, response: Response)=>{
    const api_key = process.env.API_KEY
    const api_host = process.env.API_HOST

    const info_job = request.body.info_job

    try {
        const req = await fetch(`${api_host}/search?query=${info_job}&page=1&num_pages=1&date_posted=all`, {
            headers: {
                "x-rapidapi-key": api_key!
            }
        });
        
        const jobsDetails: JobDetails[]= (await req.json()).data

        const jobsFiltered = jobsDetails.map(({employer_name, job_employment_type, job_apply_link, job_title, job_description, job_is_remote, job_posted_at_datetime_utc, job_city, job_required_experience: {no_experience_required}, job_required_education: {postgraduate_degree, professional_certification, high_school}}: JobDetails) => ({
                employer_name,
                job_employment_type,
                job_apply_link,
                job_title,
                job_description,
                job_is_remote,
                job_posted_at_datetime_utc,
                job_city,
                no_experience_required,
                postgraduate_degree,
                professional_certification,
                high_school
        }))

        return response.json(jobsDetails)
    } catch (error) {
        return response.json(error)
    }
})

export default router