import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig";

export default new Queue('SubmissionQueue', {connection: redisConnection}); // 'SubmissionQueue' is our name of the queue. 