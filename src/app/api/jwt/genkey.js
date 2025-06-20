import crypto from "crypto";

console.log(
  crypto.createHash("sha256").update("very__secret__token").digest("hex")
);
