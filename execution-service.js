class ExecutionService {
  constructor() {
    this.worker = new Worker('python-worker.js');
    this.ready = new Promise((resolve) => {
      const listener = (event) => {
        if (event.data === 'ready') {
          this.worker.removeEventListener('message', listener);
          resolve();
        }
      };
      this.worker.addEventListener('message', listener);
    });
  }

  async run(code) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const handler = (event) => {
        if (event.data.id === id) {
          this.worker.removeEventListener('message', handler);
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data.result);
          }
        }
      };
      this.worker.addEventListener('message', handler);
      this.worker.postMessage({ id, code });
    });
  }
}

window.ExecutionService = ExecutionService;
