#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SG } from '../lib/sg';
import { MyStack } from '../lib/sg-part2';
import { SGStack } from '../lib/sg-part3';
import { App } from '@aws-cdk/core';
import * as fs from 'fs';

const app = new cdk.App();


new SG(app, 'SGStack', {
  
   
  env: { account: '656339507229', region: 'us-east-1' },

 
});

// Read the cdk.json file and retrieve the IP addresses




// Define the stack and pass the IP addresses as parameters
// new MyStack(app, 'MyStack', {
//   env: { account: '656339507229', region: 'us-east-1'},
//   ipAddress1,
//   ipAddress2,
// });
// new SGStack(app, 'MyStack', {
//   env: { account: '656339507229', region: 'us-east-1'}
  
// });