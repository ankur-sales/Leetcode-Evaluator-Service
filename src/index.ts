import bodyParser from "body-parser";
import express, { Express } from 'express';
import serverConfig from "./config/serverConfig";
import apiRouter from './routes';
import SampleWorker from './workers/SampleWorker';
import runPython from "./containers/runPythonDocker";

const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);


app.listen(serverConfig.PORT, () => {

  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`;

  const inputCase = `100\n200`;

  runPython(code, inputCase);
  // sampleQueueProducer('SampleJob', {
  //   name: "Ankur",
  //   company: "Change Enterprises",
  //   position: "SDE",
  //   location: "Gurgaon"
  // });

});