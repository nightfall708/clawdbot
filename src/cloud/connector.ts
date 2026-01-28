import type { RuntimeEnv } from "../runtime.js";
import { createSubsystemLogger, runtimeForLogger } from "../logging/subsystem.js";
import type { CloudConnectionConfig } from "./config.js";

export type CloudConnectorHandle = {
  stop: () => Promise<void>;
};

const log = createSubsystemLogger("cloud");

export function startCloudConnector(params: {
  config: CloudConnectionConfig;
  runtime?: RuntimeEnv;
}): CloudConnectorHandle {
  const runtime = params.runtime ?? runtimeForLogger(log);
  const { endpoint, runtimeId, instanceId } = params.config;

  runtime.log(
    `cloud: managed mode enabled (endpoint=${endpoint}, runtimeId=${runtimeId ?? "unset"}, instanceId=${instanceId ?? "unset"})`,
  );

  return {
    stop: async () => {
      runtime.log("cloud: connector stopped");
    },
  };
}
