#!/bin/bash
cd static
# make redirects static pages
cp administration/melania-trump/index.html the-administration/melania-trump/index.html
cp administration/jd-vance/index.html the-administration/jd-vance/index.html
cp administration/donald-j-trump/index.html the-administration/donald-j-trump/index.html
cp administration/usha-vance/index.html the-administration/usha-vance/index.html
# remove whitehouse.gov
perl -pi -e 's( href="https://www.whitehouse.gov)( href=")g' $(find . -name index.html)
# hide search box
perl -pi -e 's(<div class="wp-block-whitehouse-header__search">)(<div class="wp-block-whitehouse-header__search" style="display:none;">)g' $(find . -name index.html)
# disable newletter signup
perl -pi -e 's(<input type="email")(<input disabled type="email")g' index.html
# add gtag analytics
GTAG=$(cat ../analytics.html) perl -pi -e 's/<head>\n/<head>$ENV{GTAG}\n/'  $(find . -name index.html)
find . -name index.html | xargs dirname | sed 's/^.//' | sort -u | perl -ne 'print "https://la-casa-blanca.org$_"' > sitemap.txt
