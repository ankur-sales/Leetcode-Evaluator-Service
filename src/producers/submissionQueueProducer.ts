import submissionQueue from "../queues/submissionQueue.ts";
// producers add the joobs to our queues
export default async function (payload: Record<string, unknown>) {
    await submissionQueue.add("SubmissionJob", payload);
    console.log("successfully added a new submission job");

}

