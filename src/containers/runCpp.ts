
import createContainer from './containerFactory';
import { CPP_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';


async function runCpp(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("Intiailzing a new cpp docker container");

    await pullImage(CPP_IMAGE);
    // const pythonDockerContainer = await createContainer(JAVA_IMAGE, ['python3', '-c', code, 'stty -echo']);

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | stdbuf -oL -eL ./main`;
    console.log(runCommand);


    const CppDockerContainer = await createContainer(CPP_IMAGE, ['/bin/sh', '-c', runCommand]);


    await CppDockerContainer.start();// starting the corrosponding docker containner 

    console.log("Started the docker container");

    const loggerStream = await CppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string.

    });

    // attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });

   const response = await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);

        });
    });

    // remove the container
    await CppDockerContainer.remove();
    return response;

    // return pythonDockerContainer;

}

export default runCpp;