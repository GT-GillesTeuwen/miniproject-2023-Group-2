# Mini-Project 2023

![Circ_1](https://user-images.githubusercontent.com/99959171/235227370-cd281adc-814c-47e9-838e-7b77fe7324a8.png)


# Circ Application

Circ is an application, mainly targeted at groups such as university first years, to help users meet each other in a Tinder-inspired manner. The application features a time-based economy in which each user has an amount of time they can spend on finding matches and planning meetings. 

When users "match" they are taken to a lobby where they can plan a meeting. Confirming meeting details, such as time and place, and general chatting invests the users' time into that meeting. If they follow through with the meeting, they are awarded the time they invested plus a calculated amount of interest. This encourages users to be mindful when planning meetings and encourages them to follow through.

# Circ Time Economy
Users get a set amount of time (250 minutes) when they first register, each swipe costs them time, 1 minute for the first two in any direction in a row and then if it's more the two in the same direction in a row it costs 5 minutes. When users match they can set up a meeting in which they invest time into that meeting. Once the meeting has happened and has been verified each party gets their invested time back and more based on the multiplier applied to the original time invested. The swiping creates a passive deduction of time so that it limits the amount of time users have on the app.

# Circ Technologies
 + Frontend: Angular-ionic.![angularjs-original](https://user-images.githubusercontent.com/99959171/235228478-e976f12b-a681-45e7-be1c-591fec9f1334.svg)
 + Hosting : Firebase.![firebase-plain](https://user-images.githubusercontent.com/99959171/235228656-c186627c-88a4-4a82-a18e-91ed0cb03e5b.svg)
 + Backend : Typescript.![typescript-original](https://user-images.githubusercontent.com/99959171/235228847-3c4ba330-8ba2-4641-b950-d3335336982a.svg)
 + Database: Firestore.
 + We used Firebase Authentication for the login and "Continue with Google" features.

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
