import { format } from "date-fns";
import { JobDetails } from "../../../types/ISearchJob";
import { IJobsFiltered } from "../../../types/IJobsFiltered";

export function format_job_details(job: JobDetails): IJobsFiltered {
    const {
        employer_name,
        job_employment_type,
        job_apply_link,
        job_title,
        job_description,
        job_is_remote,
        job_posted_at_datetime_utc,
        job_city,
        job_required_experience: { no_experience_required },
        job_required_education: { postgraduate_degree, professional_certification, high_school }
    } = job;

    const formatted_date = format(job_posted_at_datetime_utc, 'dd/MM/yyyy HH:mm:ss');

    return {
        employer_name,
        job_employment_type,
        job_apply_link,
        job_title,
        job_description,
        job_is_remote,
        formatted_date,
        job_city,
        no_experience_required,
        postgraduate_degree,
        professional_certification,
        high_school
    };
};