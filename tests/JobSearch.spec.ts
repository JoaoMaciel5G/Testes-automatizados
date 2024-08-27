import app from "../app"
import { IJobsFiltered } from "../types/IJobsFiltered"
import request from "supertest"

describe("GET /search", ()=>{
    test("it should return correctly response json", async ()=>{
        const response = await request(app)
            .get("/search")
            .send({
                job: "Desenvolvedor front end em São paulo",
                num_pages: 2,
                is_remote: "yes"
            })
            .expect(200)

            const expected_properties = [
                "employer_name",
                "job_employment_type",
                "job_apply_link",
                "job_title",
                "job_description",
                "job_is_remote",
                "formatted_date",
                "job_city",
                "no_experience_required",
                "postgraduate_degree",
                "high_school",
                "professional_certification"
            ];
        
            response.body.forEach((job: IJobsFiltered) => {
                expected_properties.forEach(property => {
                    expect(job).toHaveProperty(property);
                });
            });
    })

    test("it should return job_is_remote true in response json", async ()=>{
        const response = await request(app)
            .get("/search")
            .send({
                job: "Desenvolvedor front end em São paulo",
                num_pages: 2,
                is_remote: "yes"
            })
            .expect(200)

            response.body.forEach((job: IJobsFiltered) => {
                expect(job).toHaveProperty("job_is_remote")
                expect(job.job_is_remote).toBeTruthy()
            });
    })
    
    test("It should not be possible to search for jobs without sending the job parameter", async ()=>{
        const response = await request(app)
            .get("/search")
            .expect(403)
    
        expect(response.body).toEqual({error: "Insira a aréa que deseja ver vagas disponiveis"})
    })
})