provider "aws" {
  region     = "eu-west-2"
}

resource "aws_s3_bucket_object" "index" {
  bucket = "rai.mayhew.io"
  content_type = "text/html"
  key    = "index.html"
  source = "s3/index.html"
  etag   = "${md5(file("s3/index.html"))}"
}

resource "aws_cloudformation_stack" "rai_Lambdas" {
  capabilities = ["CAPABILITY_IAM"]
  name = "Rai-lambdas"
  on_failure = "DELETE"
  template_body = "${ file("lambdas.yml") }"
}

