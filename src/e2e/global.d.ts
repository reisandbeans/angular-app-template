import { ChildProcess } from 'child_process';

declare global {
    let serverProcess: ChildProcess;
}
