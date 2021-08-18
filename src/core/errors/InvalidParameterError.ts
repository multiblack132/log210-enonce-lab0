import AbstractError from "./AbstractError";


/**
 * @see Applying UML and Patterns, Chapter A35/F30
 */
export class InvalidParameterError extends AbstractError {
    public readonly code = 400;
}