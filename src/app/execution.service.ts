import { Injectable } from '@angular/core';

export interface ExecutionResult {
  id: string;
  result?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  private worker: Worker;
  private ready: Promise<void>;

  constructor() {
    if (typeof Worker === 'undefined') {
      throw new Error('Web Workers are not supported in this environment.');
    }
    // The worker will load Pyodide and notify when ready
    this.worker = new Worker(new URL('./python-worker.ts', import.meta.url));
    this.ready = new Promise<void>(resolve => {
      const listener = (event: MessageEvent) => {
        if (event.data === 'ready') {
          this.worker.removeEventListener('message', listener);
          resolve();
        }
      };
      this.worker.addEventListener('message', listener);
    });
  }

  async run(code: string): Promise<any> {
    await this.ready;
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const handler = (event: MessageEvent<ExecutionResult>) => {
        if (event.data.id === id) {
          this.worker.removeEventListener('message', handler as any);
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data.result);
          }
        }
      };
      this.worker.addEventListener('message', handler as any);
      this.worker.postMessage({ id, code });
    });
  }
}
