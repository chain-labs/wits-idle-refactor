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
  TEST_NETWORK: isTrue(getEnvVar("NEXT_PUBLIC_TEST_NETWORK", false)),
  // Add more environment variables here
};
