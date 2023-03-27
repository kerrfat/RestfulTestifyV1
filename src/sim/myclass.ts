const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class OarmSimulator {
  /**
   * Creates an instance of OarmSimulator.
   * @param {string} jarPath - The path to the Oarm simulator JAR file.
   * @param {string} masterConfigPath - The path to the masterConfig.xml file.
   * @param {string} stealthAppIp - The IP address of the StealthApp.
   * @param {boolean} sendImage - Whether to send an exam image to the slave.
   * @memberof OarmSimulator
   */
  constructor(jarPath, masterConfigPath, stealthAppIp, sendImage) {
    this.jarPath = jarPath;
    this.processId = null;
    this.connected = false;
    this.logWatcher = null;
    this.masterConfigPath = masterConfigPath;
    this.stealthAppIp = stealthAppIp;
    this.sendImage = sendImage;
  }

  /**
   * Attempts to connect to the slave three times.
   * Throws an exception if it fails to connect after three attempts.
   * Sets the connected property to true if it succeeds.
   * Logs a message indicating that it has connected to the slave.
   * @memberof OarmSimulator
   */
  connect() {
    let connectionAttempts = 0;

    const connectionInterval = setInterval(() => {
      connectionAttempts++;

      console.log(`Attempting to connect to slave. Attempt ${connectionAttempts} of 3.`);

      const oarmProcess = spawn('java', ['-jar', this.jarPath, 'connect']);

      oarmProcess.on('close', (code) => {
        if (code === 0) {
          this.processId = oarmProcess.pid;
          this.connected = true;
          console.log('Connected to slave.');
          clearInterval(connectionInterval);
        } else {
          console.log(`Connection failed with error code ${code}.`);
          if (connectionAttempts === 3) {
            clearInterval(connectionInterval);
            throw new Error('Failed to connect to slave.');
          }
        }
      });
    }, 5000);
  }

  /**
   * Disconnects from the slave and sets the connected property to false.
   * @memberof OarmSimulator
   */
  disconnect() {
    console.log('Disconnecting from slave.');

    const oarmProcess = spawn('java', ['-jar', this.jarPath, 'disconnect']);

    oarmProcess.on('close', () => {
      this.processId = null;
      this.connected = false;
      console.log('Disconnected from slave.');
    });
  }

  /**
   * Returns the process ID of the Oarm simulator.
   * @returns {number|null} The process ID of the Oarm simulator.
   * @memberof OarmSimulator
   */
  getProcessId() {
    return this.processId;
  }
  
 /**
 * Loads the exam information from the specified XML file path.
 * @param {string} examXmlPath - The path to the exam XML file.
 * @throws {Error} If the file cannot be read or parsed.
 */
async loadExamXmlFile(examXmlPath) {
    try {
      const examXml = await fs.promises.readFile(examXmlPath, 'utf8');
      this.examInfo = parseXml(examXml); // parseXml is a custom function that parses the XML string into a JSON object
    } catch (err) {
      throw new Error(`Failed to load exam XML file: ${err.message}`);
    }
  }
  
    /**
     * Returns the status of the Oarm simulator (connected or not connected).
     *
     * @returns {boolean} Whether the Oarm simulator is connected to the slave.
     */
    getStatus() {
      return this.connected;
    }
  
    /**
     * Creates a child process to watch the Oarm simulator log file and logs
     * the output to the console. Also logs a message indicating that the
     * log watcher has been started.
     */
   
        npmLogWatcher() {
            const logFilePath = `${this.jarPath.replace('.jar', '')}.log`;
            const tailArgs = ['-f', logFilePath];
            const tailProcess = spawn('tail', tailArgs);
            tailProcess.stdout.on('data', (data) => {
              console.log(data.toString());
            });
            console.log('Log watcher started');
          }
   
  
    /**
     * Creates a masterConfig.xml file from a template and the provided StealthApp IP address.
     */
    async createMasterConfigXmlFile() {
        const templatePath = path.join(__dirname, 'templates', 'masterConfig.xml.ejs');
        const template = await readFileAsync(templatePath, 'utf8');
        const renderedTemplate = ejs.render(template, { stealthAppIp: this.stealthAppIp });
        const masterConfigFilePath = path.join(__dirname, 'config', 'masterConfig.xml');
        await writeFileAsync(masterConfigFilePath, renderedTemplate, 'utf8');
      }
  
    /**
     * Creates an examConfig.xml file from a template if the sendImage property is true.
     */
    createExamXmlFile() {
      if (!this.sendImage) {
        return; // no need to create examConfig.xml if sendImage is false
      }
  
      const template = fs.readFileSync('examConfig.xml.ejs', 'utf8');
      const renderedTemplate = ejs.render(template);
  
      fs.writeFileSync('examConfig.xml', renderedTemplate);
    }
  }
  
  module.exports = OarmSimulator;

import { execSync } from 'child_process';

function checkJdkInstallation(): void {
  try {
    const output = execSync('java -version').toString('utf8');
    if (output.includes('java version') || output.includes('openjdk version')) {
      console.log('JDK or OpenJDK is installed.');
    } else {
      console.log('JDK or OpenJDK is not installed.');
    }
  } catch (error) {
    console.log('JDK or OpenJDK is not installed.');
  }
}
  
