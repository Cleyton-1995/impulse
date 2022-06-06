import express from 'express';
import { NodemailerMailAdapter } from './repositories/adapters/nodemailer/nodemailer_mail_adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { SubmitFeedbackUseCase } from './use-cases/submit_feedbacks_use_case';

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;


  try {
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

        await submitFeedbackUseCase.execute({
            type, 
            comment, 
            screenshot,
        })
  
    return res.status(201).send();

  } catch (err) {
      console.log(err);

      return res.status(500).send();
}
});