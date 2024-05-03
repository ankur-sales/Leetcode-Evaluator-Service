import express, { Express } from 'express';
import serverConfig from "./config/serverConfig";
import sampleQueueProducer from './producers/sampleQueueProducer';
import SampleWorker from './workers/SampleWorker';

const app: Express = express();

app.listen(serverConfig.PORT, () => {

  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  sampleQueueProducer('SampleJob', {
    name: "Ankur",
    company: "Change Enterprises",
    position: "SDE",
    location: "Gurgaon"
  });

});