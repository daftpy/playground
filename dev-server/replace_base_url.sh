#!/bin/bash

# Usage: ./replace_base_url.sh /path/to/your/src "http://your_domain_or_ip:5000"

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 /path/to/your/src \"http://your_domain_or_ip:5000\""
    exit 1
fi

src_path="$1"
new_base_url="$2"
old_base_url="http://localhost:5000"

# Find all files in the source directory and perform the replacement
find "$src_path" -type f -exec sed -i "s|$old_base_url|$new_base_url|g" {} +

echo "Replaced all instances of $old_base_url with $new_base_url in $src_path"
