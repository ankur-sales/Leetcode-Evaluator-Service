import { Request, Response } from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";

export function addSubmission(req: Request, res: Response) {
   const submissionDto = req.body as CreateSubmissionDto;

   console.log("submissionDto", submissionDto);

   // TODO : add validation through zod

   return res.status(201).json({
      success: true,
      error: {},
      message: 'Successfully Collected the submission',
      data: submissionDto
   });
}