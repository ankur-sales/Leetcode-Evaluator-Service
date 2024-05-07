import bodyParser from "body-parser";
import express, { Express } from 'express';
import serverConfig from "./config/serverConfig";
import apiRouter from './routes';
import SampleWorker from './workers/SampleWorker';

const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);


app.listen(serverConfig.PORT, () => {

  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  // sampleQueueProducer('SampleJob', {
  //   name: "Ankur",
  //   company: "Change Enterprises",
  //   position: "SDE",
  //   location: "Gurgaon"
  // });

});