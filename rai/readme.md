# RAI

A proof of concept for a servers less website. Uses aws lambda, s3, api gateway. Managed via cloud formation and deployed via terraform.

Make sure you have terraform file with your aws access key and secret in:
```
variable "access_key" {}
variable "secret_key" {}
variable "region" {
  default = "eu-west-1"
}
```

Simply run "terraform apply -var-file=awssecrets.tf" from within the rai directory.
