To design the JS wrapper for the OarmSimulator, you can follow these steps:

Create a class called OarmSimulator that includes the following properties:

jarPath: A string that represents the path to the Oarm simulator JAR file.
processId: A number that represents the process ID of the Oarm simulator.
connected: A boolean that indicates whether the Oarm simulator is connected to the slave.
logWatcher: A child process that watches the Oarm simulator log file and logs the output to the console.
masterConfigPath: A string that represents the path to the masterConfig.xml file.
stealthAppIp: A string that represents the IP address of the StealthApp.
sendImage: A boolean that indicates whether to send an exam image to the slave.
Add a constructor to the OarmSimulator class that takes the following parameters:

jarPath: A string that represents the path to the Oarm simulator JAR file.
masterConfigPath: A string that represents the path to the masterConfig.xml file.
stealthAppIp: A string that represents the IP address of the StealthApp.
sendImage: A boolean that indicates whether to send an exam image to the slave.
Add a connect method to the OarmSimulator class that attempts to connect to the slave three times. If it fails to connect after three attempts, it should throw an exception. If it succeeds, it should set the connected property to true and log a message indicating that it has connected to the slave.

Add a disconnect method to the OarmSimulator class that disconnects from the slave and sets the connected property to false.

Add a getProcessId method to the OarmSimulator class that returns the process ID of the Oarm simulator.

Add a loadExamXmlFile method to the OarmSimulator class that takes a path to an exam XML file and loads the exam information from it.

Add a getStatus method to the OarmSimulator class that returns the status of the Oarm simulator (connected or not connected).

Add an npmLogWatcher method to the OarmSimulator class that creates a child process to watch the Oarm simulator log file and logs the output to the console. It should also log a message indicating that the log watcher has been started.

Add a createMasterConfigXmlFile method to the OarmSimulator class that creates a masterConfig.xml file from a template and the provided StealthApp IP address.

Add a createExamXmlFile method to the OarmSimulator class that creates an examConfig.xml file from a template if the sendImage property is true.

Export the OarmSimulator class from the module.

Include the Oarm simulator JAR file and its dependencies in the NPM package.

Add a check for JDK installation in the package installation script.

Add ESLint and Prettier configurations to the package.

Document the usage of the package in the README file.



