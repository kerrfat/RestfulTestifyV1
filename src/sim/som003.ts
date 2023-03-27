import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { readFileSync, writeFileSync } from "fs";

/**
 * A class to manipulate the O-arm simulator app created on Java as a JAR program.
 */
class OarmSimulator {
  private readonly jarPath: string;
  private readonly masterConfigXmlFile: string;
  private process: ChildProcessWithoutNullStreams | null;
  private connected: boolean;

  /**
   * Creates an instance of the OarmSimulator class.
   *
   * @param jarPath - The path to the JAR program.
   * @param masterConfigXmlFile - The path to the masterConfig.xml file.
   * @throws {Error} If the JDK is not installed.
   */
  constructor(jarPath: string, masterConfigXmlFile: string) {
    // Check for JDK installation
    try {
      const { stdout } = require("child_process").execSync("java -version");
      const version = stdout.toString().split("\n")[0].split(" ")[2].replace(/"/g, "");
      console.log(`JDK version: ${version}`);
    } catch (error) {
      console.error("JDK not found. Please install the JDK and try again.");
      process.exit(1);
    }
    this.jarPath = jarPath;
    this.masterConfigXmlFile = masterConfigXmlFile;
    this.process = null;
    this.connected = false;
  }

  /**
   * Starts the JAR program and connects to the slave.
   *
   * @param retries - The number of times to retry connecting to the slave.
   * @returns The process ID of the JAR program.
   * @throws {Error} If the JAR program fails to connect to the slave after the specified number of retries.
   */
  async connect(retries = 3): Promise<number> {
    if (this.process) {
      throw new Error("Already connected to the OarmSimulator.");
    }
    this.process = spawn("java", ["-jar", this.jarPath, this.masterConfigXmlFile], { detached: true });
    let connected = false;
    for (let i = 0; i < retries; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const log = readFileSync("Log/master.txt", { encoding: "utf8" });
      if (log.includes("Connected to the slave.")) {
        connected = true;
        break;
      }
    }
    if (!connected) {
      this.disconnect();
      throw new Error(`Failed to connect to the OarmSimulator after ${retries} retries.`);
    }
    this.connected = true;
    return this.process.pid!;
  }

  /**
   * Disconnects from the OarmSimulator.
   */
  disconnect() {
    if (!this.process) {
      throw new Error("Not connected to the OarmSimulator.");
    }
    this.process.kill("SIGINT");
    this.process = null;
    this.connected = false;
  }

  /**
   * Gets the process ID of the OarmSimulator.
   *
   * @returns The process ID of the OarmSimulator, or null if it is not running.
   */
  getProcessId(): number | null {
    return this.process ? this.process.pid : null;
  }

  /**
   * Loads the exam information from an exam XML file and sends it to the OarmSimulator.
   *
   * @param examXmlFile - The path to the exam XML file.
   * @throws An error if the file cannot be read or the OarmSimulator is not connected.
   */
  loadExamXml(examXmlFile: string) {
    if (!this.connected) {
      throw new Error("OarmSimulator is not connected");
    }
    try {
      const examXml = readFileSync(examXmlFile, { encoding: "utf8" });
      const examData = new TextEncoder().encode(examXml);
      const examDataSize = new TextEncoder().encode(String(examData.byteLength));
      this.socket.write(examDataSize);
      this.socket.write(examData);
    } catch (error) {
      throw new Error(`Error loading exam XML file: ${error.message}`);
    }
  }

/**

Gets the status of the OarmSimulator.
@returns True if the OarmSimulator is connected, false otherwise.
*/
getStatus(): boolean {
return this.connected;
}
/**

Watches the log file of the OarmSimulator and logs the messages to the console.
*/
watchLog() {
const logFile = "Log/master.txt";
const logStream = createWriteStream(logFile, { flags: "a" });
logStream.write([${new Date().toLocaleString()}] Watching log file...\n);
const tail = new Tail(logFile);
tail.on("line", (line: string) => {
console.log(line);
logStream.write([${new Date().toLocaleString()}] ${line}\n);
});
tail.on("error", (error: any) => {
console.error(Error while watching log file: ${error});
});
}
/**

Creates a masterConfig.xml file from a template and a StealthApp IP address.
@param templateFile - The path to the masterConfig.xml template file.
@param stealthAppIp - The IP address of the StealthApp.
@param outputFile - The path to the output masterConfig.xml file.
*/
static createMasterConfigXml(templateFile: string, stealthAppIp: string, outputFile: string) {
const templateXml = readFileSync(templateFile, { encoding: "utf8" });
const xml = templateXml.replace(/{{stealthAppIp}}/g, stealthAppIp);
writeFileSync(outputFile, xml, { encoding: "utf8" });
}
/**

Creates an exam XML file from a template.
@param templateFile - The path to the exam XML template file.
@param outputFile - The path to the output exam XML file.
*/
static createExamXml(templateFile: string, outputFile: string) {
const templateXml = readFileSync(templateFile, { encoding: "utf8" });
writeFileSync(outputFile, templateXml, { encoding: "utf8" });
}
}
export default OarmSimulator;
