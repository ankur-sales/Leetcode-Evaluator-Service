import {Job} from 'bullmq';
// in most of our jobs will have the similar structure like name , payload, handler, failure mechanism etc. so this 
// file is for that kind of like component.
export interface Ijob {
    name: string,
    payload?: Record<string, unknown>,
    handle: (job?: Job) => void
    failed: (job? : Job) => void
}