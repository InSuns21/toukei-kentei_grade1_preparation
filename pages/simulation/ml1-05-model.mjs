// ML1-05: finite fixed-design ridge model, deterministic seeded simulations.
const finite = (x, label) => {
  if (!Number.isFinite(x)) throw new RangeError(label + " は有限数で入力してください");
  return x;
};
export const TRUE_BETA = Object.freeze([1.5, -0.5]);
export const PATH_LAMBDAS = Object.freeze([0, 0.01, 0.03, 0.1, 0.3, 1, 3, 10]);

export function buildCorrelatedDesign(rho, n = 24) {
  finite(rho, "相関"); 
  if (Math.abs(rho) > 0.99 || !Number.isInteger(n) || n < 4 || n > 1000) {
    throw new RangeError("相関の絶対値は0.99以下、行数は4から1000にしてください");
  }
  const s = Math.sqrt(1 - rho * rho);
  // Orthogonal centered Fourier vectors: norms sqrt(n), inner product zero.
  return Array.from({length:n},(_,i)=>{
    const t=2*Math.PI*i/n;
    const u=Math.SQRT2*Math.cos(t), v=Math.SQRT2*Math.sin(t);
    return [u, rho*u + s*v];
  });
}
export function predict(rows, beta) {
  if (!Array.isArray(rows)||!Array.isArray(beta)||beta.length!==2||!beta.every(Number.isFinite)) {
    throw new RangeError("設計と係数が不正です");
  }
  return rows.map(row=>row[0]*beta[0]+row[1]*beta[1]);
}
export function fitRidge(rows,y,lambda) {
  finite(lambda,"Ridge係数");
  if (lambda<0||!Array.isArray(rows)||!Array.isArray(y)||rows.length<1||rows.length!==y.length) {
    throw new RangeError("正則化係数と行数を確認してください");
  }
  const n=rows.length;
  let g00=0,g01=0,g11=0,z0=0,z1=0;
  for(let i=0;i<n;i++){
    if(!Array.isArray(rows[i])||rows[i].length!==2||!rows[i].every(Number.isFinite)||!Number.isFinite(y[i])) {
      throw new RangeError("特徴量と応答は有限の2列数値にしてください");
    }
    const [x0,x1]=rows[i];
    g00+=x0*x0;g01+=x0*x1;g11+=x1*x1;z0+=x0*y[i];z1+=x1*y[i];
  }
  const a=g00+n*lambda,b=g01,d=g11+n*lambda;
  const det=a*d-b*b;
  if (!(det>0&&Number.isFinite(det))) throw new RangeError("この設定では解が非一意または数値的に不安定です");
  const beta=[(d*z0-b*z1)/det,(a*z1-b*z0)/det];
  return {beta,gram:[[g00,g01],[g01,g11]],inverse:[[d/det,-b/det],[-b/det,a/det]],
    fitted:predict(rows,beta),det,lambda,n};
}
export function theory(rows,truth,lambda,sigma) {
  finite(sigma,"雑音標準偏差");
  if (sigma<0 || !Array.isArray(truth)||truth.length!==2||!truth.every(Number.isFinite)) {
    throw new RangeError("真の係数と雑音を確認してください");
  }
  const mu=predict(rows,truth), fit=fitRidge(rows,mu,lambda);
  const mean=fit.beta,bias=mean.map((v,j)=>v-truth[j]);
  const [g0,g1]=fit.gram;const [[a,b],[,d]]=fit.inverse;
  const variance=sigma*sigma;
  const cov00=variance*(a*a*g0[0]+2*a*b*g0[1]+b*b*g1[1]);
  const cov11=variance*(b*b*g0[0]+2*b*d*g0[1]+d*d*g1[1]);
  const cov01=variance*(a*b*g0[0]+(a*d+b*b)*g0[1]+b*d*g1[1]);
  const covariance=[[cov00,cov01],[cov01,cov11]];
  const bias2=bias[0]**2+bias[1]**2,traceCov=cov00+cov11;
  const fitBias2=(g0[0]*bias[0]**2+2*g0[1]*bias[0]*bias[1]+g1[1]*bias[1]**2)/rows.length;
  const fitVariance=(g0[0]*cov00+2*g0[1]*cov01+g1[1]*cov11)/rows.length;
  return {mean,bias,covariance,bias2,traceCov,risk:bias2+traceCov,
    fitBias2,fitVariance,fitRisk:fitBias2+fitVariance};
}
export function rng(seed) {
  if (!Number.isInteger(seed)||seed<0||seed>2147483647) throw new RangeError("seedは0以上の整数にしてください");
  let state=seed>>>0;
  return ()=>{
    state=(state+0x6D2B79F5)>>>0;
    let t=state;
    t=Math.imul(t^(t>>>15),t|1);
    t^=t+Math.imul(t^(t>>>7),t|61);
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
export function gaussian(random) {
  let u=0;
  while(u===0) u=random();
  const v=random();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
}
export function noisyResponse(rows,truth,sigma,random) {
  const mu=predict(rows,truth);
  return mu.map(v=>v+sigma*gaussian(random));
}
export function experiment({rho,lambda,sigma,repetitions,seed}) {
  if(!Number.isInteger(repetitions)||repetitions<2||repetitions>2000) {
    throw new RangeError("反復回数は2から2000の整数にしてください");
  }
  const rows=buildCorrelatedDesign(rho), truth=[...TRUE_BETA], random=rng(seed);
  const moments=theory(rows,truth,lambda,sigma);
  const fits=[], sampleY=noisyResponse(rows,truth,sigma,random);
  const sampleFit=fitRidge(rows,sampleY,lambda);
  fits.push(sampleFit.beta);
  for(let i=1;i<repetitions;i++){
    fits.push(fitRidge(rows,noisyResponse(rows,truth,sigma,random),lambda).beta);
  }
  const means=[0,0];
  for(const f of fits){means[0]+=f[0];means[1]+=f[1];}
  means[0]/=repetitions;means[1]/=repetitions;
  const empiricalVariance=[0,0];
  let empiricalRisk=0;
  for(const f of fits){
    empiricalVariance[0]+=(f[0]-means[0])**2;
    empiricalVariance[1]+=(f[1]-means[1])**2;
    empiricalRisk+=(f[0]-truth[0])**2+(f[1]-truth[1])**2;
  }
  empiricalVariance[0]/=repetitions;empiricalVariance[1]/=repetitions;
  empiricalRisk/=repetitions;
  const empiricalBias=means.map((v,j)=>v-truth[j]);
  const path=PATH_LAMBDAS.map(lam=>({lambda:lam,
    beta:fitRidge(rows,sampleY,lam).beta}));
  return {rows,truth,sampleFit,empirical:{mean:means,bias:empiricalBias,
    variance:empiricalVariance,risk:empiricalRisk},
    theoretical:moments,path,settings:{rho,lambda,sigma,repetitions,seed}};
}
