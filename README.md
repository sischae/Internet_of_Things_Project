# Internet_of_Things_Project


## Description

VentPro is a web interface for controlling an ABB ventilation controller. The interface displays all available information about the connected IoT device and enables the user to control the ventilation system using a website.
The system consists of an IoT device, a server, and a web interface. The IoT device controls the speed of a connected fan and measures the current air pressure regularly. The device is connected to the server which provides the web interface allowing users to set a specific pressure or fan speed. Also, the interface displays current and former sensor data received from the IoT device to the user.

## Installation

The project requires Node (LTS or latest version). Node can be installed via https://nodejs.org/.
The following packages are necessary to run the code. Install packages using "npm install [package]".
  - body-parser
  - cookie-parser
  - express
  - ejs
  - express-session
  - sqlite3
  - ws  

The initial admin passwort is "admin" and can be used to sign in on the web interface. Please change the admin password on the settings page afterward.

Further information about setting up the server can be found at chapter 1.1 Installation of the [Technical Documentation](https://github.com/sischae/Internet_of_Things_Project/blob/main/doc/documentation/documentation.pdf).
  
## Usage

To start the server, go to the /src directory and run "node server.js". The Server will listen to port 3000 and will be accessible threw any browser via http://localhost:3000.

All information about using the web interface can be found in the [User Manual](https://github.com/sischae/Internet_of_Things_Project/blob/main/doc/user_manual/user_manual.pdf).

Technical information about the implementation of front and back and can be found in the [Technical Documentation](https://github.com/sischae/Internet_of_Things_Project/blob/main/doc/documentation/documentation.pdf).
  

## Team

This project was developed as a student project by the following team:

  - Janine Paschek
  - Maya Hornschuh
  - Theresa Brankl
  - Simon Schädler


## License

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
