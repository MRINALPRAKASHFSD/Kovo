# KOVO — Terraform Infrastructure

> **Phase**: Planned for v0.2.0 deployment sprint.

## Module Structure

```
modules/
  vpc/           VPC, subnets, security groups
  rds/           PostgreSQL RDS (Multi-AZ for prod)
  redis/         ElastiCache Redis cluster
  s3/            Media storage bucket + CloudFront CDN
  ecs/           ECS Fargate task definitions
  cloudfront/    CDN distribution

environments/
  staging/       Staging environment (single-AZ, smaller instances)
  production/    Production environment (Multi-AZ, auto-scaling)
```

## Usage

```bash
cd infrastructure/terraform/environments/production
terraform init
terraform plan
terraform apply
```
