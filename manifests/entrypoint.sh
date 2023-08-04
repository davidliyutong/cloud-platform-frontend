#!/bin/bash

echo "set \$CLPL_BACKEND_URL $CLPL_BACKEND_URL ;" > /etc/nginx/conf.d/env.variable

nginx -g 'daemon off;'