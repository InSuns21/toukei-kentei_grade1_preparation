// ML2-02: scalar Gaussian linear regression, fixed (x,y) observations.
export function computePosterior(data,tau2,sig2,n){
  if(!Array.isArray(data)||!Number.isInteger(n)||n<1||n>data.length)throw new RangeError("invalid n");
  if(!(Number.isFinite(tau2)&&tau2>0&&Number.isFinite(sig2)&&sig2>0))throw new RangeError("variances must be positive");
  let sumX2=0,sumXY=0;
  for(const [x,y] of data.slice(0,n)){
    if(!Number.isFinite(x)||!Number.isFinite(y))throw new RangeError("nonfinite sample");
    sumX2+=x*x;
    sumXY+=x*y;
  }
  const precision=1/tau2+sumX2/sig2;
  const S=1/precision;
  const m=(sumXY/sig2)*S;
  return {precision,S,m,sumX2,sumXY};
}
export function predict(post,sig2,x){
  if(!(post?.S>0&&sig2>0&&Number.isFinite(x)&&Number.isFinite(post.m)))throw new RangeError("invalid input");
  const mean=x*post.m,latentVariance=x*x*post.S;
  return {mean,latentVariance,observationVariance:sig2+latentVariance};
}
export function sequential(post,sig2,x,y){
  if(!(post?.S>0&&sig2>0&&Number.isFinite(x)&&Number.isFinite(y)))throw new RangeError("invalid input");
  const v=sig2+x*x*post.S;
  const k=post.S*x/v;
  return {m:post.m+k*(y-x*post.m),S:post.S-post.S*x*x*post.S/v};
}
