---

###  amazon-rds-

```markdown
# Amazon Aurora PostgreSQL with AWS CDK

AWS CDK (TypeScript) project to deploy a secure Amazon Aurora PostgreSQL cluster.

## What this creates

- Aurora PostgreSQL cluster (memory-optimized)
- Credentials stored in AWS Secrets Manager
- Storage encryption enabled
- Subnet group using existing VPC
- Useful CloudFormation outputs

## Prerequisites

- Node.js 18+
- AWS CDK CLI
- AWS credentials configured
- Existing VPC with private subnets

## Deploy

```bash
npm install
cdk bootstrap        # only once per account/region
cdk deploy

Cleanup
cdk destroy
Security notes

Credentials are generated and stored in Secrets Manager (never hardcoded)
Storage is encrypted at rest
Intended to run in private subnets


Author: Ishan Ahuja
DevSecOps | Cloud Infrastructure
