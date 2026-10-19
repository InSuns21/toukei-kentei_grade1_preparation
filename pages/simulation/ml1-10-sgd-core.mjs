// ML1-10: actual seeded SGD sampler for F(w)=(w^2+1)/2.
// Each independent draw selects a = -1 or +1 with probability 1/2.
export function check(c) {
  if (![c.alpha,c.w0,c.b,c.seed,c.trials].every(Number.isFinite)
      || c.alpha<=0 || c.alpha>=2 || c.b<1 || c.b>16
      || !Number.isInteger(c.b) || Math.abs(c.w0)>10
      || !Number.isInteger(c.seed) || c.seed<0 || c.seed>4294967295
      || !Number.isInteger(c.trials) || c.trials<1 || c.trials>500)
    throw new RangeError("0<α<2、1≤b≤16、|w₀|≤10、seedは0〜4294967295の整数、試行数は1〜500");
  return c;
}
export function rng(seed) {
  let state=seed>>>0;
  return function () {
    state=(state+0x6D2B79F5)>>>0;
    let x=state;
    x=Math.imul(x^(x>>>15),x|1);
    x^=x+Math.imul(x^(x>>>7),x|61);
    return ((x^(x>>>14))>>>0)/4294967296;
  };
}
export function step(w,alpha,b,random) {
  let sum=0;
  for(let j=0;j<b;j++) sum+=(random()<0.5?-1:1);
  const mean=sum/b;
  const gradient=w-mean;
  const next=(1-alpha)*w+alpha*mean;
  if(!Number.isFinite(next)||Math.abs(next)>1e10) throw new RangeError("数値計算が発散しました");
  return { w:next, gradient, mean, lossGap:next*next/2 };
}
export function theory(c,k) {
  check(c);
  if(!Number.isInteger(k)||k<0||k>200) throw new RangeError("反復数は0〜200");
  const q=Math.pow(1-c.alpha,2*k);
  const ew=Math.pow(1-c.alpha,k)*c.w0;
  const ew2=q*c.w0*c.w0+c.alpha/(c.b*(2-c.alpha))*(1-q);
  return { k,ew,ew2,lossGap:ew2/2,floor:c.alpha/(2*c.b*(2-c.alpha)) };
}
export function trace(c,count=40,trial=0) {
  check(c);
  if(!Number.isInteger(count)||count<0||count>200||!Number.isInteger(trial)||trial<0)
    throw new RangeError("反復は0〜200、試行番号は非負整数");
  const random=rng((c.seed+Math.imul(trial,0x9E3779B9))>>>0);
  const out=[{k:0,w:c.w0,gradient:null,mean:null,lossGap:c.w0*c.w0/2}];
  for(let k=1;k<=count;k++)out.push({k,...step(out[k-1].w,c.alpha,c.b,random)});
  return out;
}
export function average(c,count=40) {
  check(c);
  if(!Number.isInteger(count)||count<0||count>200)throw new RangeError("反復は0〜200");
  const sums=Array(count+1).fill(0);
  for(let j=0;j<c.trials;j++){
    const points=trace(c,count,j);
    for(let k=0;k<=count;k++)sums[k]+=points[k].lossGap;
  }
  return sums.map((s,k)=>({k,observed:s/c.trials,expected:theory(c,k).lossGap}));
}
