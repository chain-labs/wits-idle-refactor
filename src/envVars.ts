interface EnvVars {
  // Add more environment variables as needed
  TEST_NETWORK: boolean;
}

const getEnvVar = (
  key: string,
  value: string | undefined,
  required: boolean = true,
): string => {
  if (!value && required) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value || "";
};

const isTrue = (value: string): boolean => {
  return value.toLowerCase() === "true";
};
export const envVars = {
  TEST_NETWORK: isTrue(
    getEnvVar(
      "NEXT_PUBLIC_TEST_NETWORK",
      process.env.NEXT_PUBLIC_TEST_NETWORK || "",
      false,
    ),
  ),
  MINT_URL: getEnvVar(
    "NEXT_PUBLIC_MINT_URL",
    process.env.NEXT_PUBLIC_MINT_URL,
    false,
  ),
  // Add more environment variables here
};
