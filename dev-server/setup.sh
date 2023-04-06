#!/bin/bash

# Update package lists and install necessary packages
sudo apt-get update
sudo apt-get install -y curl

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load nvm and set up Node.js LTS version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts

# Install PM2 globally
npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# Allow incoming traffic on port 80
sudo ufw allow 80

# Create Nginx configuration for your app
sudo bash -c 'cat > /etc/nginx/sites-available/my-app << EOL
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }
}
EOL'

# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Remove default Nginx site
sudo rm /etc/nginx/sites-enabled/default

# Restart Nginx
sudo systemctl restart nginx

# Start your Node.js app with PM2
pm2 start app.js --name "my-app"

# Configure PM2 to start your app on boot
pm2 startup
sudo env PATH=$PATH:$HOME/.nvm/versions/node/$(nvm version)/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
pm2 save

# Prompt the user for SSL configuration
read -p "Do you want to configure SSL with Let's Encrypt and Certbot? (y/n): " configure_ssl
if [ "$configure_ssl" = "y" ]; then
    # Install Certbot and the Nginx plugin
    sudo apt-get install -y certbot python3-certbot-nginx

    # Obtain and install the SSL certificate
    sudo certbot --nginx -d example.com -d www.example.com

    # Test the automatic renewal process
    sudo certbot renew --dry-run
fi

echo "Setup complete!"
