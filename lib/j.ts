import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';


export class DevOpsSharedSecurityGroupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, stackProps?: any) {
    super(scope, id, stackProps);


    const CostCenter = new cdk.CfnParameter(this, 'CostCenter', {
      type: 'String',
      description: 'Cost center that will pay for resource for payment of invoice'
    }).valueAsString;
   
    const OwnerContact = new cdk.CfnParameter(this, 'OwnerContact', {
      type: 'String',
      description: 'Email that will receive notifications concerning the resource.',
      allowedPattern: ".*\\@csaa\\.com"
    }).valueAsString;
   
    const DataCategory = new cdk.CfnParameter(this, 'DataCategory', {
      type: 'String',
      description: 'Category of data handled by resource ',
      allowedValues: ["highly-confidential", "confidential", "internal", "public", "na"],
    }).valueAsString;
   
    const Environment = new cdk.CfnParameter(this, 'Environment', {
      type: 'String',
      description: 'Operational category that indicates how resource should be managed',
      allowedValues: ["dev", "test", "stage", "production", "sandbox", "all"],
    }).valueAsString;
   
    const SupportGroup = new cdk.CfnParameter(this, 'SupportGroup', {
      type: 'String',
      description: 'ServiceNow Group that should be contacted for issues with the resource'
    }).valueAsString;
 
  const PCI = new cdk.CfnParameter(this, 'PCI', {
      type: 'String',
      description: 'Identifies resource as being in scope for PCI DSS compliance requirement.',
      allowedValues: ["true", "false"],
    }).valueAsString;
   
    const TQS5 = new cdk.CfnParameter(this, 'TQS5', {
      type: 'String',
      description: 'Identifies resource as being in scope for TQS 5 compliance requirement.',
      allowedValues: ["true", "false"],
    }).valueAsString;
 
  const ReqID = new cdk.CfnParameter(this, 'ReqID', {
      type: 'String',
      description: 'JIRA Request ID to create stack.'
    }).valueAsString;


    const SecurityGroupName = new cdk.CfnParameter(this, 'SecurityGroupName', {
      type: 'String',
      description: 'Security Group Name.'
    }).valueAsString;


    const vpcId = new cdk.CfnParameter(this, 'vpcId', {
      type: 'String',
      description: 'The VPC in which to create the security group.'
    }).valueAsString;


    const SecurityGroupSSMparametername = new cdk.CfnParameter(this, 'SecurityGroupSSMParamter', {
      type: 'String',
      description: 'Paramter Name to store Security Group Created.'
    }).valueAsString;  


    const ipv4cidr = new cdk.CfnParameter(this, 'ipv4', {
      type: 'String',
      description: ''
    }).valueAsString;  


    const port = new cdk.CfnParameter(this, 'Port', {
      type: 'number',
      description: 'Paramter Name to store Security Group Created.'
    }).valueAsString;
   
   const existingvpc = Vpc.fromVpcAttributes(this, "existingvpc", {
    availabilityZones: ['us-west-2a','us-west-2b','us-west-2c'],
    vpcId: vpcId,
    });


   
    //Creating security group


    const DevPortalSecurityGroup = new SecurityGroup(this, 'SecurityGroup', {
      securityGroupName: SecurityGroupName,
      vpc: existingvpc,
      allowAllOutbound: true,
      description: 'SecurityGroup Created from DevPortal'
    });


    //CIDR List
    DevPortalSecurityGroup.addIngressRule(ec2.Peer.ipv4('0.0.0.0/22'), ec2.Port.tcp(80), 'CIDR');
    DevPortalSecurityGroup.addIngressRule(ec2.Peer.ipv4('0.0.0.0/16'), ec2.Port.tcp(80), 'CIDR');
   
 


    //SSM Parameter to store securityGroup
    new ssm.StringParameter(this, 'SSMParamterforSecurityGroup', {
    simpleName: false,
    parameterName: SecurityGroupSSMparametername,
    stringValue: DevPortalSecurityGroup.securityGroupId,
    description: 'the SSM parameter to hold the security group',
    tier: ssm.ParameterTier.STANDARD
    })  
 
    // Attach Tags
  Tags.of(DevPortalSecurityGroup).add("CostCenter", CostCenter);
  Tags.of(DevPortalSecurityGroup).add("OwnerContact", OwnerContact);
  Tags.of(DevPortalSecurityGroup).add("DataCategory", DataCategory);
  Tags.of(DevPortalSecurityGroup).add("Environment", Environment);
  Tags.of(DevPortalSecurityGroup).add("SupportGroup", SupportGroup);
  Tags.of(DevPortalSecurityGroup).add("PCI", PCI);
  Tags.of(DevPortalSecurityGroup).add("TQS5", TQS5);
  Tags.of(DevPortalSecurityGroup).add("ReqID", ReqID);
  }
}



