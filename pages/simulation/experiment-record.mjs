import { assertJsonSnapshot } from "./protocol.mjs";

export const RECORD_VERSION = 1;
export const MAX_RECORD_BYTES = 262144;

export function validateRecord(record) {
  if (record?.schemaVersion !== RECORD_VERSION ||
      record.protocolVersion !== 1 ||
      typeof record.engineId !== "string" || !record.engineId ||
      typeof record.experimentId !== "string" || !record.experimentId ||
      !Number.isSafeInteger(record.seed) || record.seed < 0 ||
      record.seed > 0xffffffff ||
      !record.params || typeof record.params !== "object" ||
      Array.isArray(record.params) ||
      !Array.isArray(record.observations) || record.observations.length > 1000 ||
      typeof record.stopReason !== "string") {
    throw new TypeError("Invalid experiment record");
  }
  assertJsonSnapshot(record, MAX_RECORD_BYTES);
  return record;
}

export function createExperimentRecord({ engineId, experimentId, params, seed,
  rngAlgorithm = "none", engineVersion = "1" }) {
  return validateRecord({
    schemaVersion: RECORD_VERSION, protocolVersion: 1,
    engineId, experimentId, engineVersion, params, seed, rngAlgorithm,
    createdAt: new Date().toISOString(), stopReason: "not-started",
    observations: [], diagnostics: {},
  });
}

export function appendObservation(record, observation, diagnostics = {}) {
  validateRecord(record);
  if (record.observations.length >= 1000) {
    throw new RangeError("Experiment record reached observation limit");
  }
  const next = {
    ...record, observations: [...record.observations, observation], diagnostics,
    stopReason: "in-progress",
  };
  return validateRecord(next);
}

export function exportExperimentJson(record) {
  return JSON.stringify(validateRecord(record), null, 2);
}

export function importExperimentJson(text) {
  if (new TextEncoder().encode(text).byteLength > MAX_RECORD_BYTES) {
    throw new RangeError("Import exceeds size limit");
  }
  return validateRecord(JSON.parse(text));
}

function csvCell(value) {
  let cell = typeof value === "string" ? value : JSON.stringify(value);
  if (/^[=+\-@\t\r]/.test(cell)) cell = "'" + cell;
  return '"' + cell.replaceAll('"', '""') + '"';
}

export function exportObservationsCsv(record) {
  validateRecord(record);
  const keys = [...new Set(record.observations.flatMap((value) => Object.keys(value)))];
  if (!keys.length) return "";
  const lines = [keys.map(csvCell).join(",")];
  for (const row of record.observations) {
    lines.push(keys.map((key) => csvCell(row[key] ?? "")).join(","));
  }
  return lines.join("\r\n") + "\r\n";
}
