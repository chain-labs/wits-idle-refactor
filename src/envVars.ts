interface EnvVars {
  // Add more environment variables as needed
  TEST_NETWORK: boolean;
}

const getEnvVar = (key: string, required: boolean = true): string => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value || "";
};

const isTrue = (value: string): boolean => {
  return value.toLowerCase() === "true";
};
export const envVars = {
  TEST_NETWORK: isTrue(process.env.NEXT_PUBLIC_ABSTRACT_TESTNET_TOGGLE || ""),
  // Add more environment variables here
};
