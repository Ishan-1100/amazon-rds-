import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";

interface SGProps extends cdk.StackProps {
  ipAddresses: string[];
  port: number;
}

export class SG extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: SGProps) {
    super(scope, id, props);

    const { ipAddresses } = props;

    // VPC creation
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

    // Create the security group
    const securityGroup = new ec2.SecurityGroup(this, "MySecurityGroup", {
      vpc,
      allowAllOutbound: true,
    });

    // Add inbound rules using the provided IP addresses and ports
    for (const ipAddress of ipAddresses) {
      // for (const portStr of ports) {
        // const portNumber = parseInt(portStr, 10);
        const port = ec2.Port.tcp(80);
        securityGroup.addIngressRule(
          ec2.Peer.ipv4(ipAddress),
          port,
          `Allow inbound traffic from ${ipAddress}:80`
        );
      }
    }
  }

