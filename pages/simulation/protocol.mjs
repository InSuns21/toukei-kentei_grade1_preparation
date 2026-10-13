// DREAM THEATER interactive simulation protocol v1.
// Pure validation: Worker lifecycle and domain-specific calculations live elsewhere.
export const PROTOCOL_VERSION = 1;
export const REQUEST_TYPES = Object.freeze([
  "initialize", "computeOnce", "runBatch", "singleStep", "pause",
  "resume", "updateParameters", "reset", "cancel", "dispose",
]);
export const RESPONSE_TYPES = Object.freeze([
  "ready", "progress", "result", "paused", "running",
  "cancelled", "disposed", "error",
]);
export const DEFAULT_LIMITS = Object.freeze({
  maxBatchSteps: 1000,
  maxTotalSteps: 100000,
  maxBatchMs: 250,
  maxSnapshotBytes: 262144,
  maxObservations: 1000,
});

const TRANSITIONS = Object.freeze({
  idle: ["initializing", "disposed"],
  initializing: ["ready", "error", "disposed"],
  ready: ["initializing", "running", "error", "disposed"],
  running: ["paused", "ready", "error", "disposed"],
  paused: ["running", "initializing", "ready", "error", "disposed"],
  error: ["initializing", "disposed"],
  disposed: [],
});

export function canTransition(from, to) {
  return Boolean(TRANSITIONS[from]?.includes(to));
}

export function validateLimits(limits = DEFAULT_LIMITS) {
  if (!limits || typeof limits !== "object" || Array.isArray(limits)) {
    return { ok: false, errors: ["limits must be an object"] };
  }
  const errors = [];
  for (const [name, maximum] of Object.entries(DEFAULT_LIMITS)) {
    const value = limits[name];
    if (!Number.isSafeInteger(value) || value <= 0 || value > maximum) {
      errors.push(name + " must be an integer in 1.." + maximum);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateEnvelope(message, direction = "request") {
  const errors = [];
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return { ok: false, errors: ["message must be an object"] };
  }
  const knownTypes = direction === "request" ? REQUEST_TYPES :
    direction === "response" ? RESPONSE_TYPES : null;
  if (!knownTypes) errors.push("unknown direction");
  if (message.protocolVersion !== PROTOCOL_VERSION) errors.push("unsupported protocolVersion");
  if (!knownTypes?.includes(message.type)) errors.push("unknown message type");
  for (const name of ["sessionId", "requestId", "engineId", "experimentId"]) {
    if (typeof message[name] !== "string" ||
        !/^[A-Za-z0-9_.:-]{1,128}$/.test(message[name])) {
      errors.push(name + " must be a nonempty bounded identifier");
    }
  }
  if (!Number.isSafeInteger(message.generation) || message.generation < 0) {
    errors.push("generation must be a nonnegative safe integer");
  }
  if (direction === "request") {
    if (["initialize", "updateParameters", "reset", "computeOnce"].includes(message.type)) {
      if (!message.params || typeof message.params !== "object" ||
          Array.isArray(message.params)) errors.push("params must be an object");
      if (!Number.isSafeInteger(message.seed) ||
          message.seed < 0 || message.seed > 0xffffffff) {
        errors.push("seed must be an unsigned 32-bit integer");
      }
    }
    if (["runBatch", "singleStep"].includes(message.type)) {
      const validSteps = message.type === "singleStep" ? message.steps === 1 :
        Number.isSafeInteger(message.steps) && message.steps > 0 &&
        message.steps <= DEFAULT_LIMITS.maxBatchSteps;
      if (!validSteps) errors.push("invalid batch steps");
    }
  }
  if (direction === "response" && message.type === "error") {
    if (typeof message.errorCode !== "string" || !message.errorCode ||
        typeof message.message !== "string" ||
        typeof message.retryable !== "boolean") {
      errors.push("error responses need errorCode, message, retryable");
    }
  }
  return { ok: errors.length === 0, errors };
}

// Ignore responses whose identity or generation is no longer current.
// This is an exact match, not an ordering comparison; cancelled jobs cannot
// overwrite snapshots or exported experiments.
export function matchesPendingResponse(response, pending) {
  return validateEnvelope(response, "response").ok &&
    response.sessionId === pending.sessionId &&
    response.requestId === pending.requestId &&
    response.generation === pending.generation &&
    response.engineId === pending.engineId &&
    response.experimentId === pending.experimentId;
}

export function assertJsonSnapshot(snapshot, maxBytes = DEFAULT_LIMITS.maxSnapshotBytes) {
  const seen = new Set();
  function inspect(value, depth) {
    if (depth > 32) throw new Error("snapshot depth exceeded");
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error("snapshot contains NaN or Infinity");
    }
    if (value === undefined || typeof value === "function" ||
        typeof value === "symbol" || typeof value === "bigint") {
      throw new Error("snapshot must be JSON-compatible");
    }
    if (value && typeof value === "object") {
      if (seen.has(value)) throw new Error("snapshot contains a cycle");
      seen.add(value);
      for (const item of Object.values(value)) inspect(item, depth + 1);
      seen.delete(value);
    }
  }
  inspect(snapshot, 0);
  const json = JSON.stringify(snapshot);
  if (typeof json !== "string" || new TextEncoder().encode(json).byteLength > maxBytes) {
    throw new Error("snapshot exceeds size limit");
  }
  return json;
}
