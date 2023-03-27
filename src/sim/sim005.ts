import { spawn } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { EventEmitter } from 'events';

interface OarmSimulatorOptions {
  masterConfigFile: string;
  sendImage: boolean;
  stealthAppIp: string;
  examConfigFile?: string;
}

interface OarmSimulatorStatus {
  connected: boolean;
  processId?: number;
}

export class OarmSimulator extends EventEmitter {
  private readonly jarFilePath = join(__dirname, '../lib/oarm-sim.jar');
  private process: any;
  private examConfigFile?: string;
  private status: OarmSimulatorStatus = {
    connected: false,
  };

  constructor(private readonly options: OarmSimulatorOptions) {
    super();
  }

  /**
   * Runs the O-arm simulator jar and connects to the slave.
   * Tries to connect to the slave 3 times if unsuccessful.
   * Throws an exception if it cannot connect after 3 attempts.
   * @returns Process id of the O-arm simulator.
   */
  async connect(): Promise<number> {
    let attempts = 1;
    while (!this.status.connected && attempts <= 3) {
      this.process = spawn('java', this.buildJarArguments());

      this.process.stdout.on('data', (data: Buffer) => {
        const message = data.toString();
        if (message.includes('connected to the slave')) {
          this.status.connected = true;
          this.status.processId = this.process.pid;
          this.emit('connect');
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      attempts++;
    }

    if (!this.status.connected) {
      throw new Error('Could not connect to the slave.');
    }

    return this.status.processId!;
  }

  /**
   * Disconnects from the slave and kills the O-arm simulator process.
   */
  disconnect() {
    this.process.kill();
    this.emit('disconnect');
  }

  /**
   * Gets the process id of the O-arm simulator.
   * @returns Process id of the O-arm simulator.
   */
  getProcessId(): number {
    return this.status.processId!;
  }

  /**
   * Loads exam information from an XML file.
   * @param examFile The path to the exam XML file.
   * @returns The exam information as a string.
   */
  loadExamFile(examFile: string): string {
    if (!existsSync(examFile)) {
      throw new Error('Exam file does not exist.');
    }

    const examXml = readFileSync(examFile, 'utf8');
    return examXml;
  }

  /**
   * Gets the status of the O-arm simulator.
   * @returns The status of the O-arm simulator.
   */
  getStatus(): OarmSimulatorStatus {
    return this.status;
  }

  private buildJarArguments(): string[] {
    const args = ['-jar', this.jarFilePath, this.options.masterConfigFile];

    if (this.options.sendImage) {
      this.examConfigFile = join(__dirname, '../tmp/examConfig.xml');
      this.createExamFile();
      args.push(this.examConfigFile);
    }

    args.push(this.options.stealthAppIp);

    return args;
  }

  private createExamFile() {
    const examTemplateFile = join(__dirname, '../templates/examConfig.xml');
    const examTemplate = readFileSync(examTemplateFile, 'utf8');
    const examXml = examTemplate.replace('$PATIENT_ID$', '1234').replace('$ACQUIS
