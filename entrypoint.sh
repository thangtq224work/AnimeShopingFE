#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VITE_BE_URL|'${VITE_BE_URL}'|g' $file 
#   sed -i 's|VUE_APP_CLIENT_ID|'${VUE_APP_CLIENT_ID}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'