/**
 * Generate a pseudo-random number in the given range [min, max].
 * For reference, the `crypto.randomInt` range is [min, max).
 * @param {Number} min - Minimum number in the range.
 * @param {Number} max - Maximum number in the range.
 * @returns {Number} The pseudo-random number.
 */
export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Asynchronously pauses execution for the specified number of milliseconds.
 * @param {Number} ms - The number of milliseconds to wait.
 * @returns {Promise} A Promise that resolves after the specified number of milliseconds have passed.
 */
export const sleep = (ms: number): Promise<unknown> => new Promise((r) => { setTimeout(r, ms); });

/**
 * Add a timeout to a promise.
 * @param {Promise} promise - The promise you want to timeout.
 * @param {Number} timeout - Amounf of miliseconds to wait before timeout.
 * @param {Function} cb - The callback you want to exec upon promise rejection.
 * @returns {Promise<T>} - A promise.
 */
export function promiseTimeout<T>(promise: Promise<T>, timeout: number, cb: () => void): Promise<T>
{
	let timeoutHandle: number;

	const timeoutPromise = new Promise<T>((_, reject) =>
	{
		timeoutHandle = setTimeout(() => reject(cb), timeout);
	});

	return Promise.race([promise, timeoutPromise]).finally(() =>
	{
		clearTimeout(timeoutHandle);
	});
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @see {@link https://stackoverflow.com/a/11409944|StackOverflow}
 * @param {number} num - The number to clamp within the given range.
 * @param {number} min - The lower boundary of the output range.
 * @param {number} max - The upper boundary of the output range.
 * @returns {number} - A number in the range [min, max].
 */
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
