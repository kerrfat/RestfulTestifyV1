/**
 * Attempts to connect to the OarmSimulator by starting the JAR program and initiating a connection to the StealthApp IP address
 * specified in the `masterConfig.xml` file.
 *
 * @returns A Promise that resolves with the child process ID if a successful connection is established, or rejects with an error
 * message if a connection cannot be established after three attempts.
 * @throws An error if the `oarm-sim.jar` file is not found at the specified path.
 */
public async connect(): Promise<number> {
  // Check if the `oarm-sim.jar` file exists at the specified path. If not, throw an error.
  if (!fs.existsSync(this.jarPath)) {
    throw new Error(`Could not find oarm-sim.jar at path '${this.jarPath}'`);
  }

  // Construct the command to start the JAR program with the given `masterConfig.xml` file path, StealthApp IP address,
  // and `sendImage` flag.
  const command = `java -jar ${this.jarPath} ${this.masterConfigPath} ${this.stealthAppIp} ${this.sendImage ? this.examConfigPath : ''}`;

  let processId = -1;
  let attempts = 0;

  // Try to start the JAR program and connect to the StealthApp IP address up to three times if necessary.
  while (attempts < 3) {
    // Attempt to start the JAR program by executing the command in a child process.
    const child = exec(command, { detached: true });

    // Wait for the JAR program to output the message "Connected to slave" to indicate a successful connection to the StealthApp.
    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          child.kill();
          reject(new Error(`Timeout waiting for OarmSimulator to connect to StealthApp after ${this.connectionTimeout}ms`));
        }, this.connectionTimeout);

        child.stdout?.on('data', (data: string) => {
          if (data.includes('Connected to slave')) {
            clearTimeout(timeout);
            resolve();
          }
        });
      });
      processId = child.pid!;
      break;
    } catch (error) {
      console.log(`Attempt ${attempts + 1} to connect to OarmSimulator failed: ${error.message}`);
      attempts++;
    }
  }

  // If a successful connection is established, save the child process ID for future use.
  if (processId === -1) {
    throw new Error('Could not connect to OarmSimulator after 3 attempts');
  }
  this.processId = processId;
  console.log(`OarmSimulator connected successfully (PID: ${processId})`);
  return processId;
}
