import { Job } from "bullmq";
import { Ijob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/executorFactory";
import { ExecutionResponse } from "../types/codeExecutorStrategy";

export default class SubmissionJob implements Ijob {
    name: string;
    payload: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) { // instead of passing a name here we can get it by doing this.constructor.name also
        this.payload = payload;
        this.name = this.constructor.name; // here name of the job is same as class name. and by doing like this constructor can actually get it's class name.
    }

    handle = async (job?: Job) => {
        console.log("Handler of the submission job called");
        console.log(this.payload);

        if (job) {
            const key = Object.keys(this.payload)[0];
            const codeLanguage = this.payload[key].language;
            const code = this.payload[key].code;
            const inputTestCase = this.payload[key].inputCase;
            // console.log(this.payload[key].language);

            // console.log(this.payload.language);

            const strategy = createExecutor(codeLanguage);

            if (strategy != null) {
                const response: ExecutionResponse = await strategy.execute(code, inputTestCase)
                if (response.status === "COMPLETED") {
                    console.log("Code Executed Successfully");
                    console.log(response);


                } else {
                    console.log("Something went wrong with code execution");
                    console.log(response);


                }
            }

        }

    };

    failed = (job?: Job): void => {

        console.log("Job failed");

        if (job) {
            console.log(job.id);

        }

    };
};