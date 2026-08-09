variable "aws_region" {
  type        = string
  description = "AWS region for S3 bucket deployment"
  default     = "ap-south-1"
}

variable "vercel_api_token" {
  type        = string
  description = "Vercel API Token for authenticating with Vercel"
  sensitive   = true
}

variable "vercel_project_id" {
  type        = string
  description = "Vercel Project ID to add environment variables to"
}
