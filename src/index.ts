import bodyParser from "body-parser";
import express, { Express } from 'express';
import serverConfig from "./config/serverConfig";
import apiRouter from './routes';
import SampleWorker from './workers/SampleWorker';
// import runPython from "./containers/runPythonDocker";
// import runJava from "./containers/runJavaDocker";
import runCpp from "./containers/runCpp";
import SubmissionWorker from "./workers/SubmissionWorker";
// import submissionQueue from "./queues/submissionQueue.ts";
import { submission_queue } from "./utils/constants";
import submissionQueueProducer from "./producers/submissionQueueProducer";
const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);


app.listen(serverConfig.PORT, () => {

  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');
  SubmissionWorker(submission_queue);


  const userCode = `

class Solution {
  public:
  vector<int> permute(){
    vector<int> v;
    v.push_back(10);
    return v;
  }
};

`;

  const code = `
#include<iostream>
#include<vector>
#include<stdio.h>
using namespace std;

${userCode}

int main(){
  Solution s;
  vector<int> result = s.permute();
  for(int x : result) {
    cout<<x<< " ";
  }
  cout<<endl;
  return 0;
}
`;

  const inputCase = `10`;

  submissionQueueProducer({
    "1234": {
      language: "CPP",
      inputCase,
      code
    }
  });

  runCpp(code, inputCase)

  // python code
  //   const code = `x = input()
  // y = input()
  // print("value of x is", x)
  // print("value of y is", y)
  // `;

  // java code
  //   const code = `
  // import java.util.*;
  // public class Main {
  // public static void main(String[] args){
  //   Scanner scn = new Scanner(System.in);
  //   int input = scn.nextInt();
  //   System.out.println("input value given by user: " + input);
  //   for(int i =0; i<input; i++){
  //     System.out.println(i);
  //   }
  // }
  // }
  // `;

  // C++ code
  //   const code = `
  // #include<iostream>
  // using namespace std;

  // int main(){

  //   int x;
  //   cin>>x;
  //   cout<<"Value of x is "<<x<<" ";
  //   for(int i =0; i<x ; i++){
  //     cout<<i << " ";
  //   }
  //   cout<<endl; 
  //   return 0;
  // }
  // `;
  // const inputCase = `10`;

  // submissionQueueProducer({"1234": {
  //   language: "CPP",
  //   inputCase,
  //   code
  //  }});

  // runPython(code, inputCase);
  // runJava(code, inputCase);
  // runCpp(code, inputCase);



  // sampleQueueProducer('SampleJob', {
  //   name: "Ankur",
  //   company: "Change Enterprises",
  //   position: "SDE",
  //   location: "Gurgaon"
  // });

});