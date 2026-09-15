CREATE TABLE IF NOT EXISTS "app_metadata" (
  "key" text PRIMARY KEY NOT NULL,
  "value" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
