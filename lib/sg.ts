import * as cdk from 'aws-cdk-lib';
import { Construct } from '@aws-cdk/core';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { CfnParameter } from 'aws-cdk-lib';
import { SecurityGroup, Peer, Port } from 'aws-cdk-lib/aws-ec2';
import * as cxapi from '@aws-cdk/cx-api';
import * as fs from 'fs';
import { Fn } from 'aws-cdk-lib';


/*
import * as IpAddress from 'ip-address';
export var ipv4 = IpAddress.Address4;
export var ipv6 = IpAddress.Address6;
*/


export class SG extends cdk.Stack{

    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      //vpc
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

      const cdkJson = fs.readFileSync('cdk.json', 'utf-8');
      const cdkConfig = JSON.parse(cdkJson);
      const ipAddress = cdkConfig.context['ipAddress'];


      // const ipAddressParam = new cdk.CfnParameter(this, 'IpAddressParam', {
      //   type: 'List<String>'
      // });
      
      // Access the IP addresses in your CDK stack code
      // const ipAddressesnew = cdk.Fn.importListValue(ipAddressParam.valueAsString  ,3);



      // Define array parameters for IP addresses and ports
      const ipAddressesParam = new CfnParameter(this, "IpAddresses", {
        type: "List<String>",
        description: "Enter the IP addresses (comma-separated)",
        default:  ipAddress || "192.168.0.0/16,10.0.0.0/16,172.16.0.0/12", // Default IP addresses
      });

      
      const portsParam = new CfnParameter(this, "Ports", {
        type: "List<Number>",
        description: "Enter the ports (comma-separated)",
        default: this.node.tryGetContext("Ports")|| "443,8080,22", // Default ports
      });

      // Create the security group
      const securityGroup = new SecurityGroup(this, "MySecurityGroup", {
        vpc: vpc, // Replace with your VPC reference
        allowAllOutbound: true,
      });

      // Parse the IP addresses and ports from the parameters
      const ipAddresses = ipAddressesParam.valueAsList.map((ip: string) =>
        ip.trim()
      );
      const ports = portsParam.valueAsList.map((port: string) => port);

      // Add inbound rules using the parsed IP addresses and ports
      let portnumber:Port;
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