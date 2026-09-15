import { describe, expect, it } from "vitest";

import { parseServerEnv } from "../lib/env";

const validEnvironment = {
  DATABASE_URL: "postgresql://app:synthetic@localhost:5432/law_logging",
  DATABASE_SSL: "false",
  APP_URL: "http://localhost:3000",
};

describe("parseServerEnv", () => {
  it("returns validated server configuration", () => {
    expect(parseServerEnv(validEnvironment)).toEqual(validEnvironment);
  });

  it("fails without a database URL", () => {
    expect(() => parseServerEnv({ APP_URL: validEnvironment.APP_URL })).toThrow(
      "Invalid server environment variables: DATABASE_URL",
    );
  });

  it("rejects non-PostgreSQL database URLs", () => {
    expect(() => parseServerEnv({
      ...validEnvironment,
      DATABASE_URL: "https://example.test",
    })).toThrow("Invalid server environment variables: DATABASE_URL");
  });
});
