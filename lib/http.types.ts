import { FailureResponse } from './error.types.ts';

/**
 * An object that represents the length constraints.
 * @typedef {Object} LengthConstraints
 */
export type LengthConstraints =
  | {
      /**
       * Maximum length of generated text (including prefix) in tokens.
       * @type {number}
       */
      max_length: number;
    }
  | {
      /**
       *  Maximum number of newly generated tokens (excluding prefix).
       * @type {number}
       */
      max_new_tokens: number;
    };

/**
 * Represents an HTTP POST request.
 * @typedef {Object} HttpPostRequest
 */
export type HttpPostRequest = Partial<{
  /**
   * Model name. Default: `config.DEFAULT_MODEL_NAME`.
   * @type {string}
   */
  model: string;

  /**
   * New user inputs. May be omitted if you continue generation in an inference
   *   session.
   * @type {string}
   */
  inputs: string;

  /**
   * If 0 (default), runs greedy generation. If 1, performs sampling with
   *   parameters below.
   * @type {string}
   */
  do_sample: string;

  /**
   * The temperature to use for sampling.
   * @type {number}
   */
  temperature: number;

  /**
   * The number of top k predictions to consider.
   * @type {number}
   */
  top_k: number;

  /**
   * The cumulative probability of top p predictions to consider.
   * @type {number}
   */
  top_p: number;
}> &
  LengthConstraints;

/**
 * The HTTP response if request was successful.
 * @typedef {Object} HttpSuccessResponse
 *
 * @property {boolean} ok - Indicates that the request was successfully handled.
 * @property {string} outputs - The generated content.
 */
export type HttpSuccessResponse = {
  ok: 'true';
  outputs: string;
};

/**
 * The response for an `HttpPostRequest`.
 * @typedef {Object} HttpResponse
 */
export type HttpResponse = HttpSuccessResponse | FailureResponse;
