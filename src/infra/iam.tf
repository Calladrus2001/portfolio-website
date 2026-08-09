resource "aws_iam_user" "s3_user" {
  name = "vishesh-portfolio-s3-user"
}

resource "aws_iam_access_key" "s3_user_key" {
  user = aws_iam_user.s3_user.name
}

resource "aws_iam_policy" "s3_access_policy" {
  name        = "vishesh-portfolio-s3-access-policy"
  description = "Allows read and write access to portfolio resume in S3"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = "${aws_s3_bucket.vishesh_general_purpose.arn}/*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "s3_user_attach" {
  user       = aws_iam_user.s3_user.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}
