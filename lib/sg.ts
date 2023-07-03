import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { CfnParameter } from 'aws-cdk-lib';
import { SecurityGroup, Peer, Port } from 'aws-cdk-lib/aws-ec2';
import { Fn } from 'aws-cdk-lib';



export class SG extends cdk.Stack{

    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
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

      const ipAddressParam = new cdk.CfnParameter(this, "IpAddressParam", {
        type: "List<String>",
      });
      // Access the parameter value in your CDK stack code
      const ipAddresses = ipAddressParam.valueAsList;

      const portsParam = new CfnParameter(this, "Ports", {
        type: "List<String>",
        description: "Enter the ports (comma-separated)",
        default: this.node.tryGetContext("Ports") || "443,8080,22", // Default ports
      });

      const ports = portsParam.valueAsList.map((port: string) => port);
      // Create the security group
      const securityGroup = new SecurityGroup(this, "MySecurityGroup", {
        vpc: vpc, // Replace with your VPC reference
        allowAllOutbound: true,
      });

      // Add inbound rules using the parsed IP addresses and ports
      let portnumber: Port;
      // for (const ipAddress of ipAddresses) {
      //   for (const port of ports) {
      //     securityGroup.addIngressRule(
      //       Peer.ipv4(ipAddress),
      //       type Port  number;
      //       portnumber = parseInt(port, 10) as unknown;
      //       portnumber = portnumber as Port;
      //       Port.tcp(portnumber),
      //       `Allow inbound traffic from ${ipAddress}:${port}`
      //     );
      //   }
      // }
      for (const ipAddress of ipAddresses) {
        for (const port of ports) {
          portnumber = parseInt(port, 10) as unknown as Port;
          securityGroup.addIngressRule(
            Peer.ipv4(ipAddress),
            // Port.tcp(portnumber),
            portnumber,
            `Allow inbound traffic from ${ipAddress}:${port}`
          );
        }
      }
    }

}