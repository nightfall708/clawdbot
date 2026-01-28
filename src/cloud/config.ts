import type { ClawdbotConfig } from "../config/config.js";

export type CloudConnectionConfig = {
  enabled: boolean;
  endpoint: string;
  licenseKey?: string;
  runtimeId?: string;
  instanceId?: string;
};

const DEFAULT_ENDPOINT = "https://api.os1.ai";

export function resolveCloudConfig(
  cfg: ClawdbotConfig,
  env: NodeJS.ProcessEnv = process.env,
): CloudConnectionConfig | null {
  const enabled =
    cfg.cloud?.enabled === true ||
    cfg.cloud?.headless === true ||
    env.CLAWDBOT_CLOUD_MANAGED === "1";

  if (!enabled) return null;

  return {
    enabled: true,
    endpoint: cfg.cloud?.endpoint ?? env.CLAWDBOT_CLOUD_ENDPOINT ?? DEFAULT_ENDPOINT,
    licenseKey: cfg.cloud?.licenseKey ?? env.CLAWDBOT_CLOUD_LICENSE_KEY,
    runtimeId: cfg.cloud?.runtimeId ?? env.CLAWDBOT_CLOUD_RUNTIME_ID,
    instanceId: cfg.cloud?.instanceId ?? env.CLAWDBOT_CLOUD_INSTANCE_ID,
  };
}
