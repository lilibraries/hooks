import JSDOMEnvironment from "jest-environment-jsdom";

type EnvironmentConfig = ConstructorParameters<typeof JSDOMEnvironment>[0];
type EnvironmentContext = ConstructorParameters<typeof JSDOMEnvironment>[1];

/** Test files whose internal unhandled rejections are expected. */
const FILES_WITH_EXPECTED_REJECTIONS = ["useLoad.test.tsx"];

/**
 * jest-circus replaces every `unhandledRejection` listener with its own trap on the
 * parent process before a test file runs (see jest-circus `globalErrorHandlers`),
 * turning any unhandled rejection into a failure of the currently running test. The
 * `process` object inside the test sandbox is a stub, so the trap cannot be removed
 * from test files themselves.
 *
 * Hooks like `useLoad` intentionally leave the promises of their internal loads
 * unconsumed and expose failures through the `error` state instead (the same behavior
 * is accepted by the Vitest setup of the web project), so for the files listed above
 * the trap is replaced with a no-op, while every other file keeps the default strict
 * behavior.
 */
class HooksJSDOMEnvironment extends JSDOMEnvironment {
  private readonly testPath: string;

  private readonly ignoreRejection = () => {};

  constructor(config: EnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    this.testPath = context.testPath;
  }

  handleTestEvent(event: { name: string }) {
    if (
      event.name === "setup" &&
      FILES_WITH_EXPECTED_REJECTIONS.some((file) => this.testPath.endsWith(file))
    ) {
      process.removeAllListeners("unhandledRejection");
      process.on("unhandledRejection", this.ignoreRejection);
    }
  }

  async teardown() {
    process.removeListener("unhandledRejection", this.ignoreRejection);
    await super.teardown();
  }
}

export default HooksJSDOMEnvironment;
