Run 'npm install' in the backend folder to install the project.
Add an 'images' folder in backend.
The groupomania.sql file gives you commands to execute to reproduce the database's structure required for the project to run.
Place your database's credentials and token key for authentification in a .env file inside the backend folder as follows:

DATABASE_HOST='YourDatabaseHost(localhost)'
DATABASE_USER='YourUserToAccessTheDatabase'
DATABASE_PASSWORD='YourUsersPassword'
DATABASE_NAME='groupomania'
JWT_TOKEN_KEY='YourTokensKeyForCrypting'

Only then can you run 'npm serve' from the backend folder to run the project and open index.html from the frontend folder.