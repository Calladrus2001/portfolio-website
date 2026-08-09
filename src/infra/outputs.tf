output "s3_bucket_name" {
  value       = aws_s3_bucket.vishesh_general_purpose.bucket
  description = "Name of the created S3 bucket"
}

output "iam_user_name" {
  value       = aws_iam_user.s3_user.name
  description = "Name of the created IAM user"
}

output "aws_region" {
  value       = var.aws_region
  description = "AWS region of the S3 bucket"
}
