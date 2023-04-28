# Mini-Project 2023

# Circ Application
Circ is an application, mainly targeted at groups such as university first years, to help users meet each other in a Tinder-inspired manner. The application features a time-based economy in which each user has an amount of time they can spend on finding matches and planning meetings. 

When users "match" they are taken to a lobby where they can plan a meeting. Confirming meeting details, such as time and place, and general chatting invests the users' time into that meeting. If they follow through with the meeting, they are awarded the time they invested plus a calculated amount of interest. This encourages users to be mindful when planning meetings and encourages them to follow through.

# Circ Time Economy
Users get a set amount of time (250 minutes) when they first register, each swipe costs them time, 1 minute for the first two in any direction in a row and then if it's more the two in the same direction in a row it costs 5 minutes. When users match they can set up a meeting in which they invest time into that meeting. Once the meeting has happened and has been verified each party gets their invested time back and more based on the multiplier applied to the original time invested. The swiping creates a passive deduction of time so that it limits the amount of time users have on the app.

# Circ Technologies
 + Frontend: Angular-ionic.
 + Hosting : Firebase.
 + Backend : Typescript.
 + Database: Firestore.
 + We used Firebase Authentication for the login and "Continue with Google" features.

 # Circ Logo Link
https://firebasestorage.googleapis.com/v0/b/cos301miniprojectg2.appspot.com/o/Circ%201.png?alt=media&token=78b37d22-3a17-4da1-a4bf-d7657c0893cc

# Circ Database ERD
https://firebasestorage.googleapis.com/v0/b/cos301miniprojectg2.appspot.com/o/COS301Mini.png?alt=media&token=b71c61ee-6a26-4e7b-82d1-ffb0f81d7be4

# Circ Login Requests
https://firebasestorage.googleapis.com/v0/b/cos301miniprojectg2.appspot.com/o/LoginRequests.png?alt=media&token=47973013-8eb3-4317-a69d-945d8ab546f7

# Circ Register Requests
https://firebasestorage.googleapis.com/v0/b/cos301miniprojectg2.appspot.com/o/RegisterRequests.PNG?alt=media&token=ae7a8450-9230-4e4d-869a-3674c2c13b05

# Circ Requirements
The following items are required to run Circ:
 + Node 16: Used for Circ, api and cli (use NVM)
 + Java: used by the Firebase emulators (Make sure that JAVA_HOME is set. use JENV)
 + Firebase CLI (See: https://firebase.google.com/docs/cli)

## Get Started

1. Fork the repo

Go to: https://github.com/COS-301/miniproject-2023/fork

2. Clone your fork

```sh
git clone git@github.com:<ACCOUNT>/<PROJECT NAME>.git <PROJECT LOCAL NAME>
```

3. Install dependencies

```sh
cd path/to/project
yarn
```

4. Add Firebase configurations

See files:

- .firebaserc
- .env
- .env.pod

5. Run the stack:

Run these commands in 3 separate terminals:

```sh
yarn start:api:dev
yarn start:emulators
yarn start:app:dev
```

6. CLI:

If you want to run the cli for admin, scripts, migrations etc.

```sh
yarn build:cli:prod
GOOGLE_APPLICATION_CREDENTIALS=.keys/<REPLACE ME WITH SERVICE ACCOUNT KEY.json> FIRESTORE_EMULATOR_HOST=localhost:5003 node dist/apps/cli/main.js <REPLACE ME WITH COMMAND>
```

## Emulators:

Once the emulators are up, go to http://localhost:5001 to see the Emulator UI

## Notes!!:

- When creating your Firebase authentication, hosting, storage, functions. Make sure to use the same location throughout. (MAKE SURE TO SET "Default GCP resource location" in Project Settings in Firebase Console. If you do not do this, the app will not work)
- The app is built to be a PWA. (See: So if you deploy it to prod, you can install the app on iOS by adding to home screen or using Android by installing through Chrome)
