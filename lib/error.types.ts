/**
 * The response if there is a failure.
 * @typedef {Object} FailureResponse
 *
 * @property {boolean} ok - Indicates that the request was not successfully handled.
 * @property {string} traceback - The Python traceback.
 */
export type FailureResponse = {
  ok: 'false';
  traceback: string;
};
