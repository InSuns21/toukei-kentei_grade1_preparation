// CELEV three-body orbit gallery (equal masses, Newton G=1, no softening).
// Initial conditions are published finite-decimal approximations, not proofs
// of exactly periodic motion. Figures may drift after many repeated periods.
// 2013 Šuvakov–Dmitrašinović table: DOI 10.1103/PhysRevLett.110.114301.
// Figure-eight: Chenciner–Montgomery and published numerical initial conditions.
export const engineId = "celev-threebody-gallery-dopri5-v1";
export const experimentId = "celev-periodic-orbit-gallery-v1";
const SQRT3 = Math.sqrt(3), omegaTriangle = 3 ** (-1 / 4);
const omegaEuler = Math.sqrt(5 / 4);
const circle = (points, omega) => ({
  positions: points, velocities: points.map(([x,y]) => [-omega*y, omega*x]),
});
const collinear = (vx, vy) => ({
  positions: [[-1,0],[1,0],[0,0]],
  velocities: [[vx,vy],[vx,vy],[-2*vx,-2*vy]],
});
const records = {
  "figure-eight": {
    label: "八の字舞踏解", kind: "choreography", period: 6.32591398,
    info: "3質点が同じ8の字を周期の1/3ずつずれて追う。丸と線種で追跡。",
    positions: [[0.97000436,-0.24308753],[-0.97000436,0.24308753],[0,0]],
    velocities: [[0.466203685,0.43236573],[0.466203685,0.43236573],
      [-0.93240737,-0.86473146]],
  },
  "lagrange": {
    label: "Lagrangeの正三角形舞踏解", kind: "choreography",
    period: 2*Math.PI/omegaTriangle,
    info: "正三角形を保って回転する厳密な相対平衡解。3質点が同じ円を追う。",
    ...circle([[1,0],[-0.5,SQRT3/2],[-0.5,-SQRT3/2]],omegaTriangle),
  },
  "euler": {
    label: "Eulerの一直線解", kind: "relative-equilibrium",
    period: 2*Math.PI/omegaEuler,
    info: "一直線の配置を保って回転。中央は静止。舞踏解ではない。",
    ...circle([[-1,0],[0,0],[1,0]],omegaEuler),
  },
  "butterfly-i": {
    label:"蝶 I（Butterfly I）", kind:"periodic",
    period:6.234671, info:"2013年の等質量・角運動量0の周期軌道。初期値は有限桁。",
    ...collinear(0.306893,0.125507),
  },
  "butterfly-ii": {
    label:"蝶 II（Butterfly II）", kind:"periodic",
    period:7.003707, info:"蝶Iと異なる交差構造。初期値は約15桁。",
    ...collinear(0.392955223941802,0.0975792352080344),
  },
  "moth-i": {
    label:"蛾 I（Moth I）", kind:"periodic",
    period:14.8939, info:"2013年の3体周期軌道。初期値は約15桁。",
    ...collinear(0.464445237398184,0.396059973403921),
  },
  "yin-yang-i": {
    label:"陰陽 I（Yin–Yang I）", kind:"periodic",
    period:17.3284, info:"2013年の陰陽軌道。短い初期値では周期閉合に誤差。",
    ...collinear(0.51394,0.30474),
  },
  "dragonfly": {
    label:"トンボ（Dragonfly）", kind:"periodic",
    period:21.2710, info:"2013年の複雑な3体周期軌道。短い初期値では周期閉合に誤差。",
    ...collinear(0.080584,0.588836),
  },
};
export const PRESETS = Object.freeze(Object.fromEntries(
  Object.entries(records).map(([id,r]) => [id,Object.freeze({
    label:r.label,kind:r.kind,period:r.period,info:r.info,
  })]),
));
const REL_TOL_DEFAULT = 1e-12, MIN_H = 1e-13, MAX_H = 0.1;
const MAX_INTERNAL_ATTEMPTS = 120000;
const ENERGY_ERROR_STOP = 5e-5;
const warningDistance = 1e-10;
const A = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84],
];
const B = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
const E = [
  B[0] - 5179 / 57600, 0, B[2] - 7571 / 16695,
  B[3] - 393 / 640, B[4] + 92097 / 339200,
  B[5] - 187 / 2100, -1 / 40,
];

function minimumSeparation(y) {
  let min = Infinity;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    min = Math.min(min, Math.hypot(y[i * 2] - y[j * 2],
      y[i * 2 + 1] - y[j * 2 + 1]));
  }
  if (!(min > warningDistance) || !Number.isFinite(min)) {
    throw new RangeError("NEAR_ENCOUNTER: singular Newton force (distance <= 1e-10); no regularization is applied");
  }
  return min;
}
function derivative(y) {
  const d = new Float64Array(12);
  for (let i = 0; i < 6; i++) d[i] = y[i + 6];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const dx = y[j * 2] - y[i * 2], dy = y[j * 2 + 1] - y[i * 2 + 1];
    const r2 = dx * dx + dy * dy;
    if (!(r2 > warningDistance ** 2) || !Number.isFinite(r2)) {
      throw new RangeError("NEAR_ENCOUNTER: unresolved Newton singularity");
    }
    const factor = 1 / (r2 * Math.sqrt(r2));
    const vx = dx * factor, vy = dy * factor;
    d[6 + i * 2] += vx;
    d[7 + i * 2] += vy;
    d[6 + j * 2] -= vx;
    d[7 + j * 2] -= vy;
  }
  return d;
}
function embeddedStep(y, h, rtol) {
  const k = [derivative(y)];
  for (let stage = 1; stage < 7; stage++) {
    const trial = new Float64Array(12);
    for (let component = 0; component < 12; component++) {
      let slope = 0;
      for (let j = 0; j < stage; j++) slope += A[stage][j] * k[j][component];
      trial[component] = y[component] + h * slope;
    }
    k.push(derivative(trial));
  }
  const next = new Float64Array(12);
  let scaledError = 0;
  for (let component = 0; component < 12; component++) {
    let slope = 0, diff = 0;
    for (let j = 0; j < 7; j++) {
      slope += B[j] * k[j][component];
      diff += E[j] * k[j][component];
    }
    next[component] = y[component] + h * slope;
    const allowed = rtol * 0.01 + rtol * Math.max(
      Math.abs(y[component]), Math.abs(next[component]));
    scaledError = Math.max(scaledError, Math.abs(h * diff) / allowed);
  }
  if (![...next, scaledError].every(Number.isFinite)) {
    throw new RangeError("NEAR_ENCOUNTER: nonfinite integrator state");
  }
  return { next, scaledError };
}
function stateVector(s) {
  return Float64Array.from([...s.positions.flat(), ...s.velocities.flat()]);
}
function fromVector(y, s) {
  return {
    ...s,
    positions: Array.from({ length: 3 }, (_, i) => [y[2 * i], y[2 * i + 1]]),
    velocities: Array.from({ length: 3 }, (_, i) => [y[6 + 2 * i], y[7 + 2 * i]]),
  };
}

export function validateParameters(p) {
  const errors=[];
  if (!records[p?.preset]) errors.push("軌道の種類を選んでください");
  if (!(Number.isFinite(p?.dt) && p.dt>=0.01 && p.dt<=0.25)) {
    errors.push("描画時間間隔は0.01〜0.25");
  }
  if (p?.rtol !== undefined && ![1e-10,1e-11,1e-12].includes(p.rtol)) {
    errors.push("許容誤差は1e-10、1e-11、1e-12");
  }
  return errors;
}
export function diagnostics(s) {
  const y=stateVector(s), separation=minimumSeparation(y), m=s.masses;
  let kinetic=0,potential=0,L=0;
  const momentum=[0,0],centerOfMass=[0,0];
  for(let i=0;i<3;i++){
    const [x,yy]=s.positions[i],[vx,vy]=s.velocities[i];
    kinetic+=0.5*m[i]*(vx*vx+vy*vy);
    L+=m[i]*(x*vy-yy*vx);
    momentum[0]+=m[i]*vx;momentum[1]+=m[i]*vy;
    centerOfMass[0]+=m[i]*x/3;centerOfMass[1]+=m[i]*yy/3;
    for(let j=i+1;j<3;j++){
      potential-=m[i]*m[j] / Math.hypot(
        x-s.positions[j][0],yy-s.positions[j][1]);
    }
  }
  const energy=kinetic+potential;
  let closureDistance=0, closureVelocity=0;
  const original=records[s.preset];
  for(let i=0;i<3;i++){
    closureDistance=Math.max(closureDistance,Math.hypot(
      s.positions[i][0]-original.positions[i][0],
      s.positions[i][1]-original.positions[i][1]));
    closureVelocity=Math.max(closureVelocity,Math.hypot(
      s.velocities[i][0]-original.velocities[i][0],
      s.velocities[i][1]-original.velocities[i][1]));
  }
  const result={energy,initialEnergy:s.initialEnergy,energyDrift:energy-s.initialEnergy,
    angularMomentum:L,momentum,centerOfMass,minimumDistance:separation,
    periodReference:original.period,
    closureDistance,closureVelocity,
    acceptedSubsteps:s.acceptedSubsteps,rejectedSubsteps:s.rejectedSubsteps,
    lastInternalDt:s.internalDt,preset:original.label,
    orbitClass:original.kind,
  };
  if (![energy,result.energyDrift,L,closureDistance,closureVelocity,
    ...momentum,...centerOfMass].every(Number.isFinite)) {
    throw new RangeError("NEAR_ENCOUNTER: nonfinite orbit diagnostics");
  }
  return result;
}
function mechanicalEnergy(s){
  let e=0;
  for(let i=0;i<3;i++){
    const v=s.velocities[i];
    e+=0.5*(v[0]**2+v[1]**2);
    for(let j=i+1;j<3;j++){
      const a=s.positions[i],b=s.positions[j];
      e-=1/Math.hypot(a[0]-b[0],a[1]-b[1]);
    }
  }
  return e;
}
export function initialize(params) {
  const errors=validateParameters(params);
  if(errors.length) throw new RangeError(errors.join("; "));
  const initial=records[params.preset];
  const state={
    positions:initial.positions.map(p=>[...p]),
    velocities:initial.velocities.map(v=>[...v]),
    masses:[1,1,1],preset:params.preset,
    dt:params.dt,rtol:params.rtol??REL_TOL_DEFAULT,
    stepIndex:0,physicalTime:0,internalDt:Math.min(params.dt,0.01),
    acceptedSubsteps:0,rejectedSubsteps:0,
  };
  state.initialEnergy=mechanicalEnergy(state);
  return {state,diagnostics:diagnostics(state)};
}
export function snapshot(s){
  return {positions:s.positions.map(p=>[...p]),
    velocities:s.velocities.map(v=>[...v]),masses:[...s.masses],
    stepIndex:s.stepIndex,physicalTime:s.physicalTime,
    diagnostics:diagnostics(s)};
}
export function stepBatch(state,steps,limits={maxBatchSteps:1000}){
  if(!Number.isSafeInteger(steps)||steps<1||steps>limits.maxBatchSteps){
    throw new RangeError("invalid output-frame count");
  }
  const next={...state,
    positions:state.positions.map(p=>[...p]),
    velocities:state.velocities.map(v=>[...v])};
  let y=stateVector(next),t=next.physicalTime,h=next.internalDt;
  let attempts=0,accepted=next.acceptedSubsteps,rejected=next.rejectedSubsteps;
  const observations=[];
  for(let frame=0;frame<steps;frame++){
    const target=(state.stepIndex+frame+1)*next.dt;
    while(t<target-1e-12*Math.max(1,target)){
      if(++attempts>MAX_INTERNAL_ATTEMPTS){
        throw new RangeError("RESOURCE_LIMIT: too many adaptive substeps; select fewer frames");
      }
      const trialH=Math.min(h,target-t);
      if(trialH<MIN_H){
        throw new RangeError("NEAR_ENCOUNTER: minimum internal timestep reached");
      }
      const {next:candidate,scaledError}=embeddedStep(y,trialH,next.rtol);
      const factor=Math.min(4,Math.max(0.2,
        scaledError===0?4:0.9*scaledError**-0.2));
      if(scaledError<=1){
        y=candidate;t+=trialH;minimumSeparation(y);accepted++;
      } else rejected++;
      h=Math.min(MAX_H,Math.max(MIN_H,trialH*factor));
      if(h<=MIN_H&&scaledError>1){
        throw new RangeError("NEAR_ENCOUNTER: error unresolved at minimum step");
      }
    }
    t=target;next.stepIndex++;next.physicalTime=target;
    next.acceptedSubsteps=accepted;next.rejectedSubsteps=rejected;
    next.internalDt=h;
    const physical=fromVector(y,next);
    next.positions=physical.positions;
    next.velocities=physical.velocities;
    const snap=snapshot(next);
    if(Math.abs(snap.diagnostics.energyDrift)>ENERGY_ERROR_STOP){
      throw new RangeError("ENERGY_DRIFT: invariant discrepancy exceeds 5e-5");
    }
    observations.push(snap);
  }
  return {state:next,diagnostics:diagnostics(next),observations};
}
