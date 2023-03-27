import { spawn, ChildProcess } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";

/**
 * A wrapper class for the Oarm simulator app.
 */
export class OarmSimulator {
  private process: ChildProcess | undefined;
  private connected: boolean = false;
  private readonly masterConfigPath: string;
  private readonly stealthAppIP: string;
  private readonly sendImage: boolean;

  /**
   * Creates a new instance of the `OarmSimulator` class.
   * @param masterConfigPath The path to the master configuration XML file.
   * @param stealthAppIP The IP address of the StealthApp server.
   * @param sendImage Whether to send an exam image to the Oarm simulator.
   */
  constructor(
    masterConfigPath: string,
    stealthAppIP: string,
    sendImage: boolean = false
  ) {
    this.masterConfigPath = masterConfigPath;
    this.stealthAppIP = stealthAppIP;
    this.sendImage = sendImage;
  }

  /**
   * Connects to the Oarm simulator app.
   * @returns A Promise that resolves when the connection is successful, or rejects after three failed attempts.
   */
  async connect(): Promise<void> {
    let attempts = 0;
    const maxAttempts = 3;

    while (!this.connected && attempts < maxAttempts) {
      try {
        const args = this.buildArgs();
        this.process = spawn("java", ["-jar", "oarm-sim.jar", ...args]);
        await this.waitForConnection();
        this.connected = true;
        console.log("Connected to the Oarm simulator.");
      } catch (error) {
        console.error(`Failed to connect to the Oarm simulator: ${error.message}`);
        attempts++;
      }
    }

    if (!this.connected) {
      throw new Error(`Failed to connect to the Oarm simulator after ${maxAttempts} attempts.`);
    }
  }

  /**
   * Disconnects from the Oarm simulator app.
   */
  disconnect(): void {
    if (this.process) {
      this.process.kill();
      this.process = undefined;
      this.connected = false;
      console.log("Disconnected from the Oarm simulator.");
    }
  }

  /**
   * Gets the process ID of the Oarm simulator app.
   * @returns The process ID, or `null` if the app is not running.
   */
  getProcessId(): number | null {
    return this.process ? this.process.pid : null;
  }

  /**
   * Loads an exam XML file into the Oarm simulator app.
   * @param examConfigPath The path to the exam configuration XML file.
   * @throws An error if the exam configuration file does not exist.
   */
  loadExam(examConfigPath: string): void {
    if (!existsSync(examConfigPath)) {
      throw new Error(`Exam configuration file not found: ${examConfigPath}`);
    }

    const args = ["-loadExam", examConfigPath];
    this.sendCommand(args);
    console.log(`Loaded exam configuration file: ${examConfigPath}`);
  }

  /**
   * Gets the status of the Oarm simulator app.
   * @returns `true` if the app is connected to the slave, `false` otherwise.
   */
  getStatus(): boolean {
    return this.connected;
  }

  /**
   * Builds the command-line arguments for the Oarm simulator app.
   * @returns An array of command-line arguments.
   */
  private buildArgs(): string[] {
    const
