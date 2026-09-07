/**
 * Publishes a client-facing HTML5 game preview build to preview.crowloop.studio and generates
 * a fresh password for it. Every preview lives at /{game}/{date}/ (date defaults to today, so
 * re-running for the same game on a later day publishes a new, separately-passworded version
 * without touching the old one). Objects expire from S3 after 60 days (bucket lifecycle rule);
 * the password stops working the moment the objects are gone, no separate cleanup needed.
 *
 * Usage:
 *   npm run preview:upload -- <game-name> <build-dir> [YYYY-MM-DD]
 *
 * Requires the AWS CLI (v2) authenticated for account 780976818971 — `aws login`.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { randomInt } from "node:crypto";
import { spawnSync } from "node:child_process";

const BUCKET = "crowloop-game-previews";
const DISTRIBUTION_ID = "E86C5WH38WK2F";
const KVS_ARN = "arn:aws:cloudfront::780976818971:key-value-store/db546f82-8b6c-4936-af5d-38fa0b6ae8f1";
const PASSWORD_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
const PASSWORD_LENGTH = 24;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function generatePassword() {
  let out = "";
  for (let i = 0; i < PASSWORD_LENGTH; i++) out += PASSWORD_ALPHABET[randomInt(PASSWORD_ALPHABET.length)];
  return out;
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: ["ignore", "pipe", "inherit"], encoding: "utf-8" });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited with code ${result.status}`);
  }
  return result.stdout;
}

const [gameName, buildDir, dateArg] = process.argv.slice(2);

if (!gameName || !buildDir) {
  console.error("Usage: npm run preview:upload -- <game-name> <build-dir> [YYYY-MM-DD]");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(gameName)) {
  console.error("game-name must be lowercase letters, digits, and hyphens only (it becomes part of the URL).");
  process.exit(1);
}

const resolvedBuildDir = path.resolve(buildDir);
if (!existsSync(path.join(resolvedBuildDir, "index.html"))) {
  console.error(`No index.html found in ${resolvedBuildDir} — point this at the exported build folder.`);
  process.exit(1);
}

const date = dateArg ?? today();
const kvsKey = `${gameName}/${date}`;
const s3Prefix = `s3://${BUCKET}/${gameName}/${date}/`;

console.log(`Uploading ${resolvedBuildDir} -> ${s3Prefix}`);
run("aws", ["s3", "sync", resolvedBuildDir, s3Prefix, "--delete"]);

const password = generatePassword();

// KVS writes need the store's current ETag (a different ETag than the CloudFront control-plane
// API returns for the same store — see the KeyValueStore data-plane docs).
console.log("Registering password...");
const describeOut = run("aws", [
  "cloudfront-keyvaluestore",
  "describe-key-value-store",
  "--kvs-arn",
  KVS_ARN,
]);
const etag = JSON.parse(describeOut).ETag;

run("aws", [
  "cloudfront-keyvaluestore",
  "put-key",
  "--kvs-arn",
  KVS_ARN,
  "--key",
  kvsKey,
  "--value",
  password,
  "--if-match",
  etag,
]);

console.log("Invalidating CDN cache for this path...");
run("aws", [
  "cloudfront",
  "create-invalidation",
  "--distribution-id",
  DISTRIBUTION_ID,
  "--paths",
  `/${gameName}/${date}/*`,
]);

console.log("\nDone.");
console.log(`URL:      https://preview.crowloop.studio/${gameName}/${date}/`);
console.log(`Password: ${password}`);
console.log("(Any username works in the login prompt — only the password is checked.)");
console.log("This build and its password expire automatically after 60 days.");
