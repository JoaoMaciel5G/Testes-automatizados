import { Request, Response } from "express";
import { Router } from "express";

const router = Router()

router.get("/", async (request: Request, response: Response)=>{
    const api_key = process.env.API_KEY
    const api_host = process.env.API_HOST

    try {
        const response = await fetch(`${api_host}/search?query=Front%20end%20in%20Sao%20Paulo&page=1&num_pages=1&date_posted=all`, {
            headers: {
                "x-rapidapi-key": api_key!
            }
        });
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.error(error);
    }
})

export default router