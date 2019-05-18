# Phonebook

This application allows you to add, update and delete contacts in a phonebook.


## Prerequisites

### Versions you should have


Node : 
```
node -v 
v11.9.0
```


Yarn : 
```
yarn -v
1.7.0
```


## Frontend

### Installing

Naviguate to ```frontend/``` and type the command ```yarn``` to install the dependencies.

To run the application, type ```yarn start```. It will launch the application on **port 3000**

### Tests

**The frontend and the backend must have been launched**

To run the tests, type the command ```./node_modules/.bin/cypress open```.
Then, click on ```contact.spec.js``` file. It will launch a window in your browser and run the tests.


## Backend

### Installing

Run a Docker container with the following command 
```docker run -d -p 3306:3306 --name=phonebook --env="MYSQL_ROOT_PASSWORD=root" mysql:5.7```

Create a connection to your MySQL server and create a **phonebook** table in the database.

Naviguate to ```backend/``` and type the command ```yarn``` to install the dependencies.

To run the application, type ```yarn start```. It will launch the applicaton on **port 3003**.

### Tests

To run the tests, type the command ```yarn test```


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Sylv11/phonebook/blob/master/LICENSE.md) file for details

