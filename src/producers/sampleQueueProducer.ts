import sampleQueue from "../queues/sampleQueue";
// producers add the joobs to our queues
export default async function (name: string, payload: Record<string, unknown>) {
    await sampleQueue.add(name, payload);
    console.log("successfully added a new job");

}

