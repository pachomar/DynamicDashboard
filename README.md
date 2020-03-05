Setting Up Application
=====================================================================================================================================
Extract the zip file directly, the folder structure will be ready for the application to run.
To start the application, open VSCode or any environment that runs terminal commands. The startup folder is EventsApp\event-subscription
Install NodeJS if not installed already, then run the following commands:

npm run install
json-server --watch db.json --port 3001
npm run start

The application should be up and running by now

Considerations
=====================================================================================================================================
- The 5 first upcoming events will be ahown on top, and will not be shown in the categories below to avoid duplicates
- All events will be sorted by date in all the lists
- If a new event is created, the screen will reload and put the corresponding ones in the upcoming 5
- By default, the event creation validates all fields are not empty