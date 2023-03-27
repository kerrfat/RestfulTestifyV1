import { spawn } from "child_process";
import { createConnection, Socket } from "net";
import { readFileSync } from "fs";

export class OarmSimulator {
  private processId: number | undefined;
  private socket: Socket | undefined;
  private connected: boolean = false;

  /**
   * Creates an instance of OarmSimulator and connects it to the specified StealthApp IP address.
   *
   * @param masterConfigFile - The path to the masterConfig.xml file.
   * @param stealthAppIp - The IP address of the StealthApp server.
   * @throws An error if the OarmSimulator process cannot be started or if it fails to connect to the StealthApp server.
   */
  constructor(masterConfigFile: string, stealthAppIp: string) {
    const command = "java";
    const args = ["-jar", "oarm-sim.jar", masterConfigFile];
    const options = {
      detached: true,
      stdio: "ignore",
    };
    const simulatorProcess = spawn(command, args, options);
    this.processId = simulatorProcess.pid;
    this.log("Started OarmSimulator process with PID " + this.processId);

    let retries = 3;
    const connectToSlave = () => {
      if (retries === 0) {
        throw new Error("Failed to connect to OarmSimulator slave");
      }
      const socket = createConnection(5000, stealthAppIp, () => {
        this.connected = true;
        this.socket = socket;
        this.log("Connected to OarmSimulator slave");
      });
      socket.on("error", (error) => {
        this.log("Connection error: " + error.message);
        retries--;
        setTimeout(connectToSlave, 2000);
      });
    };
    connectToSlave();
  }

  // ... other methods ...
}


  /**
   * Creates a new instance of the OarmSimulator class.
   *
   * @param jarPath - The path to the OarmSimulator jar file.
   * @param masterConfigFile - The path to the master config XML file.
   * @param stealthAppIp - The IP address of the StealthApp server.
   * @param sendImage - A boolean indicating whether to send an exam image to the simulator.
   * @throws An error if the jar file cannot be found or the simulator fails to start.
   */
  constructor(jarPath: string, masterConfigFile: string, stealthAppIp: string, sendImage: boolean = false) {
    super();

    try {
      this.jarProcess = spawn("java", [
        "-jar",
        jarPath,
        masterConfigFile,
        sendImage ? this.createExamXmlFile(stealthAppIp) : "",
      ]);
      this.connected = false;
      this.socket = new Socket();
    } catch (error) {
      throw new Error(`Error starting OarmSimulator: ${error.message}`);
    }

    this.jarProcess.stdout?.on("data", (data) => {
      const message = data.toString().trim();
      if (message === "Connected to slave.") {
        this.connected = true;
      }
      console.log(`OarmSimulator: ${message}`);
    });

    this.jarProcess.stderr?.on("data", (data) => {
      console.error(`OarmSimulator Error: ${data}`);
    });

    this.jarProcess.on("exit", (code, signal) => {
      console.log(`OarmSimulator exited with code ${code} and signal ${signal}`);
    });
  }



  import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

interface OarmSimulatorOptions {
  masterConfigFile: string;
  stealthAppIp: string;
  sendImage?: boolean;
}

export class OarmSimulator {
  private readonly jarFile: string;
  private readonly masterConfigFile?: string;
  private readonly stealthAppIp: string;
  private process: ChildProcess | null = null;

  constructor(jarFilePath: string, options: OarmSimulatorOptions) {
    this.jarFile = jarFilePath;
    this.masterConfigFile = options.masterConfigFile;
    this.stealthAppIp = options.stealthAppIp;

    if (options.sendImage) {
      this.createExamConfig();
    }
  }

  async connectToSlave(retryCount = 3): Promise<void> {
    let connected = false;

    for (let i = 0; i < retryCount; i++) {
      try {
        await this.connect();
        console.log('Connected to the slave.');
        connected = true;
        break;
      } catch (e) {
        console.error(`Connection failed. Retrying in 5 seconds. (${i + 1}/${retryCount})`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (!connected) {
      throw new Error('Failed to connect to the slave.');
    }
  }

  disconnect(): void {
    if (this.process !== null) {
      this.process.kill();
      console.log('Disconnected from the slave.');
      this.process = null;
    }
  }

  getStatus(): boolean {
    return this.process !== null;
  }

  getProcessId(): number | undefined {
    return this.process?.pid;
  }

  private async connect(): Promise<void> {
    if (this.process !== null) {
      throw new Error('Already connected to the slave.');
    }

    const args = [];

    if (this.masterConfigFile !== undefined) {
      args.push(`-mc=${this.masterConfigFile}`);
    }

    args.push(`-sip=${this.stealthAppIp}`);

    if (existsSync('examConfig.xml')) {
      args.push(`-ec=examConfig.xml`);
    }

    const jarArgs = ['java', '-jar', this.jarFile, ...args];

    this.process = spawn(jarArgs[0], jarArgs.slice(1), { detached: true });

    return new Promise((resolve, reject) => {
      this.process!.stdout!.on('data', (data) => {
        const message = data.toString().trim();
        console.log(message);
        if (message === 'Connected to the slave.') {
          resolve();
        }
      });

      this.process!.stderr!.on('data', (data) => {
        const message = data.toString().trim();
        console.error(message);
        if (message === 'Failed to connect to the slave.') {
          reject(new Error('Failed to connect to the slave.'));
        }
      });
    });
  }

  private createExamConfig(): void {
    const examConfigFile = 'examConfig.xml';
    if (!existsSync(examConfigFile)) {
      const template = readFileSync(join(__dirname, 'templates', 'exam
