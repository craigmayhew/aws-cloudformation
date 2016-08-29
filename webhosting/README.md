# aws webhosting platform

## locations
- /etc/httpd/conf.d
- /srv

## useful commands
Load latest backup of webdirectory
> tar -zxf /tmp/latest-web-directory.tar.gz

Save latest backup
> tar -czvf /tmp/latest-web-directory.tar.gz /srv

Save latest apache configs
> cd /etc/httpd/conf.d/ ; tar -czvf /tmp/apache-config.tar.gz ./
