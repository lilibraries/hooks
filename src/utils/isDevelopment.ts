// Only `NODE_ENV` is needed from Node, so it is declared here instead of depending on the Node types.
declare const process: { env: { NODE_ENV?: string } };

/**
 * Whether the code runs in development. Evaluated once at module scope so bundles can
 * strip development-only code by replacing `process.env.NODE_ENV`.
 */
const isDevelopment = process.env.NODE_ENV !== "production";

export default isDevelopment;
