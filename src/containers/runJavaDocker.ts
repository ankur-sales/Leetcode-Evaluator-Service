
import createContainer from './containerFactory';
import { JAVA_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';


async function runJava(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("Intiailzing a new python docker container");

    // const pythonDockerContainer = await createContainer(JAVA_IMAGE, ['python3', '-c', code, 'stty -echo']);

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);


    const javaDockerContainer = await createContainer(JAVA_IMAGE, ['/bin/sh', '-c', runCommand]);


    await javaDockerContainer.start();// starting the corrosponding docker containner 

    console.log("Started the docker container");

    const loggerStream = await javaDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string.

    });

    // attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });

    await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodeDockerStream);

        });
    });

    // remove the container
    await javaDockerContainer.remove();

    // return pythonDockerContainer;

}

export default runJava;