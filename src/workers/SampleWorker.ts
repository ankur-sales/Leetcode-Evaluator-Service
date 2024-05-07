import { Job, Worker } from 'bullmq';
import redisConnection from '../config/redisConfig';
import SampleJob from '../jobs/Samplejob';

export default function SampleWorker(queueName: string) {
    // console.log("setup the connection for redis", redisConnection);

    new Worker(queueName, async (job: Job) => {
        // process your job here
        console.log("Sample job kicking");

        if (job.name === "SampleJob") {

            const sampleJobInstance = new SampleJob(job.data);

            sampleJobInstance.handle(job);

            return true;
        }
    }, 
    {
        connection: redisConnection
    }
);
}

