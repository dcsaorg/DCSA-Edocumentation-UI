#!/usr/bin/env sh
set -eu


# Set correct HTML base tag, so static resources are fetched
# from the right path instead of the root path.
# NOTE: Trailing and leading slashes in base href are important!
# Using `~` separator to avoid problems with forward slashes

if [-z "$BASE_URI"]; then
BASE_URI="/"
fi 
if [ $BASE_URI != "/" ]; then 
    mkdir -p /usr/share/nginx/$BASE_URI
    mv /usr/share/nginx/html/* /usr/share/nginx/$BASE_URI/ 
    mv  /usr/share/nginx/$BASE_URI /usr/share/nginx/html/
    sed --in-place 's~<base href="/">~<base href="/'${BASE_URI}'/">~' /usr/share/nginx/html/$BASE_URI/index.html
fi
exec "$@"
