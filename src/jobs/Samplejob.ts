import { Job } from "bullmq";
import { Ijob } from "../types/bullMqJobDefination";

export default class SampleJob implements Ijob {
    name: string;
    payload?: Record<string, unknown>;
    constructor(payload: Record<string, unknown>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = () => {
        console.log("Handler of the job called");

    };

    failed = (job?: Job): void => {

        console.log("Job failed");

        if (job) {
            console.log(job.id);

        }

    };
};