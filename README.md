# Phonebook

This application allows you to add contacts in a phonebook.


## Versions you should have


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

Naviguate to ```frontend/``` and type the command ```yarn``` to install the dependencies.

To run the application, type ```yarn start```. It will launch the application on **port 3000**

### Tests

To run the tests, type the command ```./node_modules/.bin/cypress open```



## Backend

Run a Docker container with the following command 
```docker run -d -p 3306:3306 --name=phonebook --env="MYSQL_ROOT_PASSWORD=root" mysql:5.7```

Naviguate to ```backend/``` and type the command ```yarn``` to install the dependencies.

To run the application, type ```yarn start```. It will launch the applicaton on **port 3003**.

### Tests

To run the tests, type the command ```yarn test```
