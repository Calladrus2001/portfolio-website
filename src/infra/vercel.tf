resource "vercel_project_environment_variable" "aws_access_key" {
  project_id = var.vercel_project_id
  key        = "AWS_ACCESS_KEY_ID"
  value      = aws_iam_access_key.s3_user_key.id
  target     = ["production", "preview"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "aws_secret_key" {
  project_id = var.vercel_project_id
  key        = "AWS_SECRET_ACCESS_KEY"
  value      = aws_iam_access_key.s3_user_key.secret
  target     = ["production", "preview"]
  sensitive  = true
}
