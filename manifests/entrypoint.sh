#!/bin/bash

echo -n "" > /etc/nginx/conf.d/env.variable

# Configure backend URL
if ! [ -z "$CLPL_BACKEND_URL" ]; then
    echo "CLPL_BACKEND_URL is set to '$CLPL_BACKEND_URL'"
else
    echo "CLPL_BACKEND_URL is not set"
    exit 1
fi
echo "set \$CLPL_BACKEND_URL $CLPL_BACKEND_URL ;" >> /etc/nginx/conf.d/env.variable

# Configure DNS resolver
if ! [ -z "$CLPL_DNS_RESOLVER" ]; then
    echo "CLPL_DNS_RESOLVER is set to '$CLPL_DNS_RESOLVER'"
else
    echo "CLPL_DNS_RESOLVER is not set, set to 10.43.0.10"
    CLPL_DNS_RESOLVER="10.43.0.10"
fi
sed -i "s/\${CLPL_DNS_RESOLVER}/$CLPL_DNS_RESOLVER/g" /etc/nginx/nginx.conf

echo "-------- /etc/nginx/nginx.conf --------"
cat /etc/nginx/nginx.conf
echo "---------------------------------------"

nginx -g 'daemon off;'