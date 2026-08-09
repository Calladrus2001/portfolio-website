terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    vercel = {
      source = "vercel/vercel"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "vercel" {
  api_token = var.vercel_api_token
}
