provider "aws" {
  region     = "eu-west-2"
}

resource "aws_cloudformation_stack" "rai_Lambdas" {
  capabilities = ["CAPABILITY_IAM"]
  name = "Rai-lambdas"
  on_failure = "DELETE"
  template_body = "${ file("lambdas.yml") }"
}
