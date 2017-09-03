provider "aws" {
  region     = "eu-west-2"
}

resource "aws_cloudformation_stack" "rai_API_Gateway_and_Lambdas" {
  capabilities = ["CAPABILITY_IAM"]
  name = "Rai-apigateway-lambdas"
  on_failure = "DELETE"
  template_body = "${ file("apigateway_lambdas.yml") }"
}

