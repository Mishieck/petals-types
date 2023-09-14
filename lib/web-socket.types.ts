import { FailureResponse } from './error.types.ts';
import { HttpPostRequest, HttpSuccessResponse } from './http.types.ts';

/**
 * The request for opening a reference session. It should be the first request
 *   for a `WebSocket` connection. The inference session created by this
 *   request is unique to this WebSocket connection and cannot be reused in
 *   other connections. It is closed automatically when the connection is
 *   closed.
 * @typedef {Object} OpenReferenceSessionRequest
 *
 * @property {string} type - Indicates that the request is for opening a
 *   session.
 * @property {number} max_length - Maximum length of generated text
 *   (including prefix) in tokens.
 * @property {string} [model] - Model name. Default:
 *   `config.DEFAULT_MODEL_NAME`.
 */
export type OpenReferenceSessionRequest<ModelName = string> = {
  type: 'open_inference_session';
  max_length: number;
  model?: ModelName;
};

/**
 * The response if a reference session has been successfully opened.
 * @typedef {Object} OpenReferenceSessionSuccessResponse
 *
 * @property {boolean} ok - Indicates that the session was opened successfully.
 */
export type OpenReferenceSessionSuccessResponse = { ok: true };

/**
 * The request for generating responses using `WebSocket`.
 * @typedef {Object} GenerateRequest
 *
 * @property {string} type - Indicates that the response should be generated
 *   token-by-token and accepting intermediate prompts from a user
 *   (e.g., to make a chatbot).
 * @property {string} [stop_sequence] - If you set it, the server will continue
 *   generation with the same parameters unless it generates the stop_sequence,
 *   so you may get multiple responses without having to send the request again
 *   and wait for the round trip's latency.
 */
export type GenerateRequest = HttpPostRequest & {
  type: 'generate';
  stop_sequence?: string;
};

/**
 * The request for a `WebSocket` connection.
 * @typedef {Object} WebSocketRequest
 */
export type WebSocketRequest = OpenReferenceSessionRequest | GenerateRequest;

/**
 * The response for a `GenerateRequest`.
 * @typedef {Object} GenerateSuccessResponse
 */
export type GenerateSuccessResponse = HttpSuccessResponse & {
  /**
   * Intermediate responses contain the field stop: false, and the last
   *   response contains stop: true. For example, you can set max_new_tokens:
   *   1 and receive tokens one by one, as soon as they are generated. Check
   *   out the chat's
   *   [frontend code](https://github.com/petals-infra/chat.petals.dev/blob/main/static/chat.js)
   *   for a detailed example of how to do that.
   * @type {boolean}
   */
  stop: boolean;

  /**
   * The number of tokens in the response.
   * @type {number}
   */
  token_count: number;
};

/**
 * A response for a `GenerateRequest`.
 * @typedef {Object} GenerateResponse
 */
export type GenerateResponse = GenerateSuccessResponse | FailureResponse;
