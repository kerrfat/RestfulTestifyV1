class OarmSimulator {
    constructor() {
      this.jarPath = null;
      this.processId = null;
      this.connected = false;
      this.logWatcher = null;
    }
  
    async connect(jarPath, xmlPath, retries = 3) {
      // Set jarPath and try to connect to slave
      this.jarPath = jarPath;
      let connected = false;
      for (let i = 0; i < retries && !connected; i++) {
        // Run the jar program and get process ID
        const { stdout } = await exec(`java -jar ${this.jarPath} ${xmlPath}`);
        this.processId = parseInt(stdout.trim(), 10);
  
        // Wait for the jar program to show "connected to slave" message
        const logPath = path.join(path.dirname(jarPath), 'Log', 'Master.txt');
        const { tail } = new Tail(logPath);
        await new Promise((resolve, reject) => {
          tail.on('line', (line) => {
            if (line.includes('Connected to slave')) {
              connected = true;
              tail.unwatch();
              resolve();
            }
          });
          tail.on('error', reject);
        });
        tail.unwatch();
  
        // If not connected, kill the process and try again
        if (!connected) {
          await this.disconnect();
        }
      }
      if (!connected) {
        throw new Error('Could not connect to slave');
      }
      this.connected = true;
    }
  
    async disconnect() {
      if (this.processId) {
        await exec(`taskkill /pid ${this.processId} /f`);
        this.processId = null;
        this.connected = false;
      }
      if (this.logWatcher) {
        this.logWatcher.stop();
        this.logWatcher = null;
      }
    }
  
    async getStatus() {
      if (this.processId) {
        try {
          await exec(`tasklist /fi "PID eq ${this.processId}"`);
          return 'connected';
        } catch {
          return 'disconnected';
        }
      } else {
        return 'disconnected';
      }
    }
  
    async watchLog() {
      const logPath = path.join(path.dirname(this.jarPath), 'Log', 'Master.txt');
      this.logWatcher = new Tail(logPath);
      this.logWatcher.on('line', (line) => {
        console.log(line);
      });
    }
  
    async createMasterConfig(templatePath, stealthAppIp) {
      const templateXml = await fs.promises.readFile(templatePath, 'utf-8');
      const xml = templateXml.replace('$STEALTH_APP_IP$', stealthAppIp);
      const outputPath = path.join(path.dirname(this.jarPath), 'MasterConfig.xml');
      await fs.promises.writeFile(outputPath, xml);
    }
  
    async createExam(templatePath, examName) {
      const templateXml = await fs.promises.readFile(templatePath, 'utf-8');
      const xml = templateXml.replace('$EXAM_NAME$', examName);
      const outputPath = path.join(path.dirname(this.jarPath), `${examName}.xml`);
      await fs.promises.writeFile(outputPath, xml);
    }
  
    async loadExam(xmlPath) {
      const sourcePath = path.join(path.dirname(this.jarPath), 'Source');
      await fs.promises.copyFile(xmlPath, path.join(sourcePath, path.basename(xmlPath)));
    }
  }
  