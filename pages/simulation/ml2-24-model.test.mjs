import assert from "node:assert/strict";
import {
  defaultConfig, makeSchedule, forwardConditional, posterior,
  probabilityPositive, theoreticalMoments, createExperiment,
  createRng, summarize,
} from "./ml2-24-model.mjs";

const close = (actual, expected, tolerance = 1e-12) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

const config = { ...defaultConfig, steps: 2, betaStart: 0.75,
  betaEnd: 0.75, schedule: "constant", probabilityPlus: 0.5 };
const s = makeSchedule(config);
close(s.barAlpha[1], 0.25);
close(s.barAlpha[2], 0.0625);
close(forwardConditional(2, 2, s).mean, 0.5);
close(forwardConditional(2, 2, s).variance, 15/16);
close(posterior(2, 0, 2, s).mean, 0.8);
close(posterior(2, 0, 2, s).variance, 0.6);
close(posterior(2, 0, -2, s).mean, -0.8);
close(probabilityPositive(2, 0, s, 0.5), 0.5);
assert.throws(() => posterior(1, 0, 2, s), /t>=2/);

// The two Gaussian posterior formulae and the noise-parameterization formula
// agree for arbitrary input values; KL is the weighted noise MSE.
for (const x0 of [-2, 2]) {
  for (const xt of [-1.3, 0, 1.6]) {
    const epsilon = (xt - Math.sqrt(s.barAlpha[2]) * x0) /
      Math.sqrt(1 - s.barAlpha[2]);
    const muNoise = (xt - s.beta[2] * epsilon /
      Math.sqrt(1 - s.barAlpha[2])) / Math.sqrt(s.alpha[2]);
    close(muNoise, posterior(2, xt, x0, s).mean);
    const predicted = epsilon + 0.5;
    const muPred = (xt - s.beta[2] * predicted /
      Math.sqrt(1 - s.barAlpha[2])) / Math.sqrt(s.alpha[2]);
    const klMean = (muNoise - muPred) ** 2 / (2 * posterior(2, xt, x0, s).variance);
    const weight = s.beta[2] ** 2 /
      (2 * posterior(2, xt, x0, s).variance * s.alpha[2] * (1-s.barAlpha[2]));
    close(weight, 2);
    close(klMean, weight * 0.5**2);
  }
}

// Check the Bayes posterior against direct likelihood ratio, including an
// asymmetric prior so that terminal mismatch is observable.
const asym = { ...config, probabilityPlus: 0.75 };
const as = makeSchedule(asym);
for (const xt of [-3, -1, 0, 1, 3]) {
  const v = 1-as.barAlpha[2],m = 2*Math.sqrt(as.barAlpha[2]);
  const positive = 0.75*Math.exp(-((xt-m)**2)/(2*v));
  const negative = 0.25*Math.exp(-((xt+m)**2)/(2*v));
  close(probabilityPositive(2,xt,as,0.75),positive/(positive+negative));
}

assert.throws(() => makeSchedule({...config, betaStart: 1}), /ノイズ/);
assert.throws(() => makeSchedule({...config, count: 10}), /標本/);
assert.throws(() => makeSchedule({...config, steps: 1}), /時刻/);
const rngA = createRng(1),rngB = createRng(1);
for(let j=0;j<15;j++)close(rngA.normal(),rngB.normal(),1e-15);

function runAll(c) {
  const experiment=createExperiment(c);
  let operations=0;
  while(experiment.step())operations++;
  assert.equal(operations,2*c.steps+1);
  assert.equal(experiment.phase,"done");
  return experiment;
}
const run1=runAll({...defaultConfig, count: 600});
const run2=runAll({...defaultConfig, count: 600});
assert.deepEqual(run1.forward,run2.forward);
assert.deepEqual(run1.reverse,run2.reverse);
const changed=runAll({...defaultConfig, count: 600,seed: 2425});
assert.notDeepEqual(run1.forward[8],changed.forward[8]);
assert.notDeepEqual(run1.reverse[0],changed.reverse[0]);
const altered=runAll({...defaultConfig, count: 600,betaStart:0.15});
assert.notDeepEqual(run1.forward[8],altered.forward[8]);

// True qT + true reverse kernel must recover the original two atoms. Since
// the distribution is asymmetric, their empirical proportions are diagnostic.
const exact=runAll({...defaultConfig, count:1600,steps:5,probabilityPlus:0.75,
  betaStart:0.2,betaEnd:0.3});
assert.ok(exact.reverse[0].every(x => x===2||x===-2));
const ending=summarize(exact.reverse[0]);
assert.equal(ending.nearestAtomMse,0);
assert.ok(Math.abs(ending.proportionPositive-0.75)<0.05);
for(let t=1;t<=5;t++){
  const forwardMoment=theoreticalMoments(t,exact.schedule,0.75);
  const forwardSample=summarize(exact.forward[t]);
  const reverseSample=summarize(exact.reverse[t]);
  assert.ok(Math.abs(forwardSample.mean-forwardMoment.mean)<0.2);
  assert.ok(Math.abs(forwardSample.variance-forwardMoment.variance)<0.35);
  assert.ok(Math.abs(reverseSample.mean-forwardMoment.mean)<0.2);
  assert.ok(Math.abs(reverseSample.variance-forwardMoment.variance)<0.35);
}

const meanApprox=runAll({...exact.config,reverse:"mean"});
assert.ok(summarize(meanApprox.reverse[0]).nearestAtomMse>0.001);
assert.ok(meanApprox.reverse[0].some(x=>x!==2&&x!==-2));
const normalStart=runAll({...exact.config,terminal:"normal"});
assert.notDeepEqual(normalStart.reverse[5],exact.reverse[5]);
const target=theoreticalMoments(5,exact.schedule,0.75);
const normalMean=summarize(normalStart.reverse[5]).mean;
assert.ok(Math.abs(normalMean-target.mean)>0.1);

console.log("ML2-24 diffusion formulas, seeded chains and exact/approximate reverse: PASS");
