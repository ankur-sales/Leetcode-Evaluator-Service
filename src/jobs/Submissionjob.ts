import { Job } from "bullmq";
import { Ijob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";

export default class SubmissionJob implements Ijob {
    name: string;
    payload?: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) { // instead of passing a name here we can get it by doing this.constructor.name also
        this.payload = payload;
        this.name = this.constructor.name; // here name of the job is same as class name. and by doing like this constructor can actually get it's class name.
    }

    handle = (job?: Job) => {
        console.log("Handler of the submission job called");
        console.log(this.payload);

        if (job) {
            // console.log(this.payload.language);

        }

    };

    failed = (job?: Job): void => {

        console.log("Job failed");

        if (job) {
            console.log(job.id);

        }

    };
};