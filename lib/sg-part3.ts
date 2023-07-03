import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';

import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface SGStackProps extends StackProps {
  ipAddress1: string;
  ipAddress2: string;
}

export class SGStack extends Stack {
  constructor(scope: cdk.App, id: string, props: SGStackProps) {
    super(scope, id, props);

    
      //vpc creation
      const vpc = new ec2.Vpc(this, "my-cdk-vpc", {
        cidr: "10.0.0.0/16",
        natGateways: 0,
        maxAzs: 3,
        subnetConfiguration: [
          {
            name: "public-subnet-1",
            subnetType: ec2.SubnetType.PUBLIC,
            cidrMask: 24,
          },
        ],
      });
    // Create a security group
    const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc: vpc,
      securityGroupName: 'MySecurityGroup',
      allowAllOutbound: true,
    });

    // Allow inbound traffic from the IP addresses
    securityGroup.addIngressRule(
      ec2.Peer.ipv4(props.ipAddress1),
      ec2.Port.allTraffic(),
      'Allow inbound traffic from IP Address 1',
    );

    securityGroup.addIngressRule(
      ec2.Peer.ipv4(props.ipAddress2),
      ec2.Port.allTraffic(),
      'Allow inbound traffic from IP Address 2',
    );
  }
}

// Create the CDK app
const app = new cdk.App();

// Get the IP addresses from the CDK context
const ipAddress1 = app.node.tryGetContext('ipAddress1');
const ipAddress2 = app.node.tryGetContext('ipAddress2');

// Validate the IP addresses
if (!ipAddress1 || !ipAddress2) {
  console.error('Missing required IP address inputs.');
  process.exit(1);
}

// Define the stack and pass the IP addresses as parameters
new SGStack(app, 'SGStack', {
  ipAddress1,
  ipAddress2,
});
