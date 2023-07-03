import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';



import * as ec2 from 'aws-cdk-lib/aws-ec2';


interface MyStackProps extends StackProps {
  ipAddress1: string;
  ipAddress2: string;
}

export class MyStack extends Stack {
  constructor(scope: cdk.App, id: string, props: MyStackProps) {
    super(scope, id, props);

    // Create a security group
    const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc: ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true }),
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




