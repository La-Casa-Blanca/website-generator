#!/bin/bash
# make redirects static pages
cp static/administration/melania-trump/index.html static/the-administration/melania-trump/index.html
cp static/administration/jd-vance/index.html static/the-administration/jd-vance/index.html
cp static/administration/donald-j-trump/index.html static/the-administration/donald-j-trump/index.html
cp static/administration/usha-vance/index.html static/the-administration/usha-vance/index.html
# remove whitehouse.gov
perl -pi -e 's( href="https://www.whitehouse.gov)( href=")g' $(find static/ -name index.html)
# hide search box
perl -pi -e 's(<div class="wp-block-whitehouse-header__search">)(<div class="wp-block-whitehouse-header__search" style="display:none;">)g' $(find static/ -name index.html)
# disable newletter signup
perl -pi -e 's(<input type="email")(<input disabled type="email")g' static/index.html
# add gtag analytics
GTAG=$(cat analytics.html) perl -pi -e 's/<head>\n/<head>$ENV{GTAG}\n/'  $(find static/ -name index.html)
