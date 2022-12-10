# DiscordClone
<a href=https://leet-cord-aa.herokuapp.com/> Live Link </a>
## Setup
To start the app up after cloning it from https://github.com/AlanDeleon88/DiscordClone, you need to install the dependencies first. Go into the app directory
and run `pipenv install` in the console, then go to the react-app directory and  run `npm install`.

The next step is to setup all the environment variables in the backend. 
1. Create a .env file in the app directory, make sure to follow the .envexample in the folder.
2. start the python shell environment by running 'pipenv shell' in the console.
3. Setup the sql-alchemy database by running
  - `flask db migrate`
  - `flask db upgrade`
  - `flask run db seed all`
4. In the console, run `flask run` in the root directory to start the backend server.
5. Change to the react-app folder and run `npm start` to start the react application.

## About leet-cord
This application features the use of React/Redux libraries for the frontend, and the backend is built off of flask and postgressSQL and SqlAlchemy/Alembic. This Discord clone allows a user to browse the application, and create an account to create servers and channels. The application also has AWS functionality, a user can upload images from their own computer to be displayed as server icons on the application. A user also has the ability to edit their channels/servers. All posts and edits are validated by the backend server to ensure only valid data is passed in.

![image](https://user-images.githubusercontent.com/92609467/206870541-b7451851-94cc-44ae-a93f-7a3cf7e4b684.png)

## Splash page
The initial splash page is similar to the actual discord webapp when a user tries to open discord in their browser. The `Open discord in browser` button prompts the user to either login to an existing account or create a new one if they do not have one. For project purposes a Demo login button has been added. Both login and signup forms have form validations to alert the user if the values they have inputted are valid or not.

![image](https://user-images.githubusercontent.com/92609467/206870761-ba61055c-2c67-499e-94c8-4487d83f9510.png)

After a user logs in, they will be redirected to their DM user list. Although this part of the app is still in development, the user still has access to the app's main navigation bar.

![image](https://user-images.githubusercontent.com/92609467/206870884-6394a8bf-210a-4544-abeb-31b4b63693a5.png)

## Using the server Navbar
In order to navigate through the app, a user can simply click on the server icons on the left.
When an icon is clicked, the app view will be updated with the servers title and the servers channels:
![image](https://user-images.githubusercontent.com/92609467/206871045-ad012376-4a80-4076-86c0-39603cc52743.png)
The user can click on each channel to update the main view to the channel they clicked on. In future updates, the view will display the messages each channel contains.

## Adding a new server
To add a new a server, the user must click on the `+` button at the bottom of the server navbar.
![image](https://user-images.githubusercontent.com/92609467/206871337-aff4ecb6-35ce-47bc-960c-406eaedde1c3.png)

Afterwords, The user has to input the desired name for their new server. The user also has the option to upload an image for the new server or add a description.

![image](https://user-images.githubusercontent.com/92609467/206871484-a46e15e4-bc4d-433b-bc41-6e083de2485a.png)

## Edit an existing server
Users have the ability to edit servers they created. In order to do so, simply click on the server title in the main view and a drop down menu will appear. Click on the edit option and a modal to update the server will pop up.

![image](https://user-images.githubusercontent.com/92609467/206875253-477f6265-04c5-433a-b96b-29daddcbdfae.png)

In the modal, the user has the ability to change the server icon, update the server description, and change the server name. Only when the user clicks on save, the info will be updated. If the user tries to save the settings without any values in the name field, the application will not allow them to save.

![image](https://user-images.githubusercontent.com/92609467/206875536-3f792fc6-8c7a-43ce-86f5-a8ef86a97b6d.png)

## Deleting a server
Servers that the user own can be deleted. In order to delete a server, click on the server title in the main view. In the dropdown menu select the delete server option, and a modal prompt will appear.

![image](https://user-images.githubusercontent.com/92609467/206876338-816e2dee-da2c-4fce-8871-6d7d4eca22ff.png)

## Adding new channels to server
New text channels can be added to servers owned by the user. Click on the `+` button next to the text channels header.

![image](https://user-images.githubusercontent.com/92609467/206876826-792952ae-d3dc-483f-b893-587afd4b8cab.png)
![image](https://user-images.githubusercontent.com/92609467/206876927-71dc431c-47cc-4415-aa07-9a4c549932ac.png)

In order to create a new channel, the user must at least input a name for the channel. Otherwise, the built-in validataion will reject the request to create a new channel.

## Editing a channel
Channels can be edited by the server owner. To edit a server, the user has to hover their cursor over the channel and then click on the gear button.
![image](https://user-images.githubusercontent.com/92609467/206877134-79178e2f-f032-441f-8dc0-9c6650ef45ad.png)
![image](https://user-images.githubusercontent.com/92609467/206877150-e2dd002f-b873-41ba-bbc8-c9693996c32e.png)

The user must at least input a value into the name box, or the form will fail to submit.

## Deleting a channel
The server owner also has the ability to delete a channel on their server. Follow the same steps to edit the channel, but on the modal click the trash can instead. A confirmation modal will pop up, upon selecting yes, the channel will be deleted.

## Future plans
I plan to implement channel message CRUD and direct message CRUD in the future. I also want to implment Socket IO along with user status IE active/away/busy/offline and friend requests. I also plan to add an explore servers nav button to view various servers for a user to join.




