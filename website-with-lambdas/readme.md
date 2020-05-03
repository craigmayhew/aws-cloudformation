# HTML Website with api calls to lambdas

A proof of concept for a serverless website. Uses aws lambda, s3, api gateway. Managed via cloud formation and deployed via terraform. Throughout this example I have used the url "terminalwindow.io" so please change as you see fit.

Make sure you have a terraform file with your aws access key and secret in:
```
variable "access_key" {}
variable "secret_key" {}
variable "region" {
  default = "eu-west-1"
}
```

Simply run "terraform apply -var-file=awssecrets.tf" from within the rai directory.
