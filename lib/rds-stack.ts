import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from '@aws-cdk/core';
// import * as subnetGroup from 'aws-cdk-lib/aws-subne'


export class RdsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

// Existing VPC and Subnets
const vpcId = 'vpc-0d59d3a747c39b0c0';
const vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc', {
  vpcId: vpcId,
  // subnetGroupNameTag: 

});

//subnet
const subnet = ec2.Subnet.fromSubnetId(this, 'ExistingSubnet', 'subnet-02928a3d9d7529dd2');
const subnet2 = ec2.Subnet.fromSubnetId(this, 'ExistingSubnet2', 'subnet-003686bf37aa11679');


const subnetGroup = new rds.SubnetGroup(this, 'MySubnetGroup', {
  description: 'My subnet group for RDS',
  vpc,
  vpcSubnets: {
    availabilityZones: ['availabilityZones'],
    onePerAz: false,
    subnets: [subnet,subnet2]
  },
});



// Create a secret for the RDS credentials
const secret = new secretsmanager.Secret(this, 'RdsCredentialsSecret', {
  generateSecretString: {
    secretStringTemplate: JSON.stringify({
      username: 'admin', // Change username if needed
    }),
    excludePunctuation: true,
    includeSpace: false,
    generateStringKey: 'password',
  },
});


// Create the RDS Aurora PostgreSQL cluster
const cluster = new rds.DatabaseCluster(this, 'AuroraCluster', {
  engine: rds.DatabaseClusterEngine.auroraPostgres({
    version: rds.AuroraPostgresEngineVersion.VER_14_6,
  }),
  instanceProps: {
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.R5, ec2.InstanceSize.LARGE),
    vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC},
    publiclyAccessible: true,
    
  },
  credentials: rds.Credentials.fromGeneratedSecret('clusteradmin'),
  storageEncrypted: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY, // Change this to your desired removal policy
  defaultDatabaseName: 'mydatabase', // Change this to your desired database name
});

// Output the endpoint and port for the RDS cluster
new cdk.CfnOutput(this, 'ClusterEndpoint', {
  value: cluster.clusterEndpoint.hostname,
});

// new cdk.CfnOutput(this, 'ClusterPort', {
//   value: cluster.
// });
}
}
