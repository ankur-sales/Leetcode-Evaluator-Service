
import createContainer from './containerFactory';
import { JAVA_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutorStrategy';


class JavaExecutor implements CodeExecutorStrategy {
   async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
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
    
        try{
            const codeResponse: string = await this.fetchDecodedStream(loggerStream,rawLogBuffer);
            return {output: codeResponse, status: "COMPLETED"};
    
        }catch(error){
                return {output: error as string , status: "ERROR"}
        }finally{
            await javaDockerContainer.remove();
    
        }
    
    }

    fetchDecodedStream(loggerStream:NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise <string>{
        // Todo : may be move this function in to javaHelper.ts file
        return new Promise((res, rej) => {
            loggerStream.on('end', () => {
                console.log(rawLogBuffer);
                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodedStream = decodeDockerStream(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);

                if(decodedStream.stderr){
                    rej(decodedStream.stderr);
                }else{
                    res(decodedStream.stdout);
                }
          
    
            });
        });

    }

}


export default JavaExecutor;