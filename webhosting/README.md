# aws webhosting platform
eu-west-1 hosted web service across 3 availibility zones. Takes ~10 mins from cloudfront create event to start serving traffic.

## locations
- Web: /etc/httpd/conf.d
- Puppet: /etc/puppet/files
- All: /srv

## useful commands
Load latest backup of webdirectory
> tar -zxf /tmp/latest-web-directory.tar.gz

Save latest backup
> tar -czvf /tmp/latest-web-directory.tar.gz /srv

Save latest apache configs (if doing manually from web server)
> cd /etc/httpd/conf.d/ ; tar -czvf /tmp/apache-config.tar.gz ./

Save latest apache configs (from puppet master)
> cd /etc/puppet/files/sites/ ; tar -czvf /tmp/apache-config.tar.gz ./
