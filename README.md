# Getting Started with the Munch App

Munch is an item focused food finder app created for the COMP550 Advanced Software\
Engineering class.

Authors: Nathanael Paulus, Mitchell Dennen, Austin Hedrick, Kelsey Helling, Lean Xu

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Lean Xu DateTime: 2023-02-24 
## how to install set model locally
1. download and install mairadb, the download url
   WIN: https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.11.2&os=windows&cpu=x86_64&pkg=msi&m=xtom_fre
2, login the mysql instance, 
   mysql -uroot -p
   run the below command in mysql
   create user 'root'@'%' identified by '123456';
   grant all on *.* to 'root'@'%';
   flush privileges;
3, make sure you already installed the mysql2 and sequelize
   npm install mysql2 sequelize
4, go to the src folder, run db.js to generate the tables
   node db.js
DB guide details:
https://docs.google.com/document/d/1Tcwqm02uZAkpyp45TWSms5VUwF5ddQdyfY_KXC-XqjM

Austin Hedrick
Kelsey Helling
mitchell 
Lean Xu
Nathanael Paulus