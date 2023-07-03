#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SG } from '../lib/sg';

const app = new cdk.App();
const stack = new cdk.Stack;
// Read the command line arguments
const ipAddressesParam = new cdk.CfnParameter(stack, 'IpAddressesParam', {
  type: 'String',
});
const portsParam = new cdk.CfnParameter(sta, 'PortsParam', {
  type: 'String',
});

const ipAddresses = ipAddressesParam.valueAsString.split(',');
const ports = portsParam.valueAsString.split(',');

new SG(app, 'SGStack', {
  ipAddresses,
  ports,
  env: { account: '656339507229', region: 'us-east-1' },
});

