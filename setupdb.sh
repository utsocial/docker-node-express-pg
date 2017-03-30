echo "Runnin this script to setup and test everythin in the container (setupdb.sh)"
echo "Starting posgres service ..."
/etc/init.d/postgresql start # starting the service
echo "2.- Configuration the root user and a testdb ..."
sudo -u postgres sh -c 'createuser root & createdb testdb' # creating a root user
echo "3.- Setting up the root password ..."
sudo -u postgres psql -c "ALTER USER root PASSWORD 'password';" # setting up the root password
echo "AVOIDING .. 4.-Install pg client iib in nodejs ... sudo npm install pg"
echo "5.- Running db test via node ..."
node test.js
echo "End of (setupdb.sh) ..."
