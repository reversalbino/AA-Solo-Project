1. Clone this repo
```
https://github.com/reversalbino/AA-Solo-Project.git
```
2. Install dependencies from the root directory
```
npm install
```
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
```
CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
```
4. Create a .env file in the backend directory based the on the .env.example file found in the directory
5. Enter your username and password for the user you just created  in your .env as well as your desired database name, a secure combination of charactes for your JWT_SECRET, and your desired port (usually 5000)
6. Add the following proxt to your package.json file in your frontend directory, adjusting the '5000' to match the PORT in your .env file
```
"proxy": "http://localhost:5000"
```
7. Create the database, then migrate and seed models 
```
//create the database
npx dotenv sequelize db:create
//migrate the models
npx sequelize db:migrate
//seed the models
npx sequelize db:seed:all
```
8. Start the services in the backend directory
```
npm start
```
9. Navigate to the frontend directory and run the same command. This should open the browser and direct you to the project. If not, navigate to http://localhost:5000, replacing the "5000" with the port used in your backend .env file
10. Congrats!! You can now create user accounts or user the demo user to browse Noise-Storm
