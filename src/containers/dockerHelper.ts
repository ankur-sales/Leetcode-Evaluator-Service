import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
    let offset = 0; // this variable keeps track of the current position in the buffer while parsing

    const output: DockerStreamOutput = { stdout: '', stderr: '' };// output object that will store the accumulated stdout and stderr output as strings

    while (offset < buffer.length) { // loop until offset reaches end of the buffer
        const typeOfStream = buffer[offset];// typeOfStream variable is read from the start of the buffer and contains value about type of the stream


        // this length variable hold the length of the data which lies inside header. becuase header contains type of stream as well as length of data.
        // we will read this variable on an offset of 4 bytes from the start of the chunk/buffer.
        const length = buffer.readUint32BE(offset + 4);

        // as now we have read the header, so now we can move to the value of the chunk;
        offset += DOCKER_STREAM_HEADER_SIZE;

        if (typeOfStream === 1) {
            // stdout stream
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if (typeOfStream === 2) {
            // stderr stream
            output.stderr += buffer.toString('utf-8', offset, offset + length);

        }

        offset += length;
    }

    return output;

}