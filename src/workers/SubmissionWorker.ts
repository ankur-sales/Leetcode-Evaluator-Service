import { Job, Worker } from 'bullmq';
import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/Submissionjob';

export default function SubmissionWorker(queueName: string) {
    // console.log("setup the connection for redis", redisConnection);

    new Worker(queueName, async (job: Job) => {
        // process your job here
        console.log("Submission job worker kicking", job);

        if (job.name === "SubmissionJob") {

            const submissionJobInstance = new SubmissionJob(job.data);

            submissionJobInstance.handle(job);

            return true;
        }
    }, 
    {
        connection: redisConnection
    }
);
}

