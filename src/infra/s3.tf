resource "aws_s3_bucket" "vishesh_general_purpose" {
  bucket = "vishesh-general-purpose"
}

resource "aws_s3_bucket_public_access_block" "vishesh_general_purpose_block" {
  bucket = aws_s3_bucket.vishesh_general_purpose.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
