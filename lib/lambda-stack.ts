// import * as cdk from 'aws-cdk-lib';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
// import * as rds from 'aws-cdk-lib/aws-rds';
// import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
// import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as iam from 'aws-cdk-lib/aws-iam';


// export class MyStack extends cdk.Stack {
//     constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
//       super(scope, id, props);
  
//       // Define VPC
//       const vpc = new ec2.Vpc(this, 'MyVpc', {
//         // VPC configuration options
//       });
  
     
  
//       // Define Lambda function
//       const lambdaFunction = new lambdaNodejs.NodejsFunction(this, 'MyLambda', {
//         // Lambda function configuration options
//         vpc,
//         // ...
//       });
  
//       // Grant necessary permissions to Lambda function
//       lambdaFunction.addToRolePolicy(new iam.PolicyStatement({
//         effect: iam.Effect.ALLOW,
//         actions: ['rds-data:*'],
//         resources: ['*'],
//       }));
  
//       // Connect Lambda function with RDS database
//       lambdaFunction.addEnvironment('DATABASE_HOST', database.instanceEndpoint.hostname);
//       lambdaFunction.addEnvironment('DATABASE_NAME', database.databaseName);
//       lambdaFunction.addEnvironment('DATABASE_USERNAME', database.secret!.secretValueFromJson('username').toString());
//       lambdaFunction.addEnvironment('DATABASE_PASSWORD', database.secret!.secretValueFromJson('password').toString());
//     }
//   }
  