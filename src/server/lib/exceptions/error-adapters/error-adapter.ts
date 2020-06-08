import { ApplicationError } from '../application-error';

export interface ErrorAdapter {
    (error: any): ApplicationError;
}
