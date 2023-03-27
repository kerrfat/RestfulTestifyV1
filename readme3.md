oarm-sim-js
This is a Node.js wrapper for the O-arm simulator, a software designed to simulate a server mode of O-arm. It sends O-arm communication protocol and DICOM files, and it initiates the socket connection to the slave.

The wrapper allows you to manipulate the O-arm simulator app created on Java as a JAR program using TypeScript OOP. It provides an OarmSimulator class with the following features:

Run a JAR program and get the process ID (connect the O-arm simulator) and try 3 times to run it to connect to slave, otherwise raise an exception. To know if it's connected, the JAR program should show a message "connected to the slave".
Disconnect the simulator.
Get the OS process ID for it.
Load an XML file containing exam information.
Get the O-arm simulator status (connected or not).
Add an NPM command to the package to watch the JAR log also (the log file is a txt file inside Log/master.txt) and create itself log who initiated every time we create an instance of OarmSimulator class.
Create a MasterConfig XML file from a template and StealthApp IP Address.
Create an Exam XML file from a template too.
The JAR program and its library are included in the NPM package.
Make sure the JDK is installed before installing and using this package.
Use eslint and prettier for format.
Installation
To install the package, you need to have the JDK (Java Development Kit) installed on your machine. You can download the JDK from the Oracle website.

Once you have the JDK installed, you can install the package using npm:

Copy code
npm install oarm-sim-js
Usage
To use the package, you first need to import the OarmSimulator class from the package:

typescript
Copy code
import { OarmSimulator } from 'oarm-sim-js';
Then, you can create an instance of the OarmSimulator class with a masterConfig.xml file, a StealthApp IP address, and a Boolean sendImage flag that, if true, creates an examConfig.xml file from a template and includes it in the JAR arguments:

typescript
Copy code
const simulator = new OarmSimulator({
  masterConfigPath: '/path/to/masterConfig.xml',
  stealthAppIp: '192.168.1.100',
  sendImage: true,
});
Once you have an instance of the OarmSimulator class, you can use its methods to manipulate the simulator. For example, to run the JAR program and connect to the simulator:

typescript
Copy code
simulator.connectToSimulator();
To disconnect the simulator:

typescript
Copy code
simulator.disconnectFromSimulator();
To get the OS process ID for the simulator:

typescript
Copy code
const processId = simulator.getProcessId();
To load an XML file containing exam information:

typescript
Copy code
simulator.loadExamConfig('/path/to/examConfig.xml');
To get the O-arm simulator status:

typescript
Copy code
const isSimulatorConnected = simulator.isSimulatorConnected();
To watch the JAR log, you can use the following NPM command:

arduino
Copy code
npm run watch-log
This command will start a process that watches the JAR log file and outputs any changes to the console. You can stop the process with Ctrl-C.

License
This package is licensed under the MIT License.
