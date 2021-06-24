# Admin Dashboard created using React & Firebase.

### You can see the demo [here.](https://irfan-za.github.io/admin-dashboard)

This is the demo account :
```
email    : demo@demo.com
password : 123hoho
```

## How to use
1. Run `npm install` on your terminal to downloading all the dependencies
2. Open the firebase website at https://console.firebase.google.com/
3. click `add project` button, input your project name and then click `create project`
4. click website icon and register your app
5. open authentication menu on firebase console, on the sign-In method enable email/password
6. open Realtime Database menu, then create database'
7. On the data menu add child with key `stokBarang` and input the value with your first data.
8. Add the `.env` file at root of your application folder. Write this code on your `.env` file and fill it with your firebase config.
 ```
 REACT_APP_API_KEY=xxxxxx
 REACT_APP_AUTH_DOMAIN=xxxxxx
 REACT_APP_PROJECT_ID=xxx
 REACT_APP_DATABASE_URL=xxxx
 REACT_APP_STORAGE_BUCKET=xxxx
 REACT_APP_MESSAGING_SENDER=xxx
 REACT_APP_APP_ID=xxxx
 ```
9. Run `npm start` to starting a development server.
10. Open the browser at http://localhost:3000 to see the webApp.
