import { customAlphabet } from 'nanoid';

// updated to use the same id size & character set as @kizen/page-builder in the react-app repository
// https://github.com/kizen/react-app/blob/develop/packages/page-builder/utils/id.ts#L13
const nanoid = customAlphabet('1234567890abcdef', 24);

// By default nanoid generate an ID with 21 characters. To reduce the footprint, we default to 10 characters.
// We have a higher probability for collisions, though

/**
 * Generate a random ID. That ID can for example be used as a node ID.
 *
 * @param size The number of characters that are generated for the ID. Defaults to `10`
 * @returns A random id
 */
export const getRandomId = () => nanoid();
