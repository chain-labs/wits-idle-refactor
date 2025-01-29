interface EnvVars {
  // Add more environment variables as needed
  TEST_NETWORK: boolean;
}

const getEnvVar = (
  key: string,
  value: string | undefined,
  required: boolean = true,
): string => {
  console.log({ value, key });

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
  // Add more environment variables here
};
