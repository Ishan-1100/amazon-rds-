#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RdsStack } from '../lib/rds-stack';
import { App } from '@aws-cdk/core';

const app = new cdk.App();
new RdsStack(app, 'RdsStack', {
  
   
  env: { account: '656339507229', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});