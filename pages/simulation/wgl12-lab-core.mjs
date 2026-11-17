// WGL12 independent CPU Fresnel oracle: no shader, no framebuffer, no GGX reuse.
// Four diagnostic pixels are linear RGB, NOT the display's sRGB output.
export const BASE_COLOR = Object.freeze([0.80, 0.30, 0.10]);
export const FRESNEL_PROBES = Object.freeze([
  {label: '非金属・正面', metallic: 0, cosine: 1},
  {label: '非金属・半角', metallic: 0, cosine: 0.5},
  {label: '金属・正面', metallic: 1, cosine: 1},
  {label: '金属・半角', metallic: 1, cosine: 0.5},
]);
export function schlickScalar(cosine, normalReflectance) {
  if (!Number.isFinite(cosine) || cosine < 0 || cosine > 1 ||
      !Number.isFinite(normalReflectance) ||
      normalReflectance < 0 || normalReflectance > 1) {
    throw new RangeError('cosine and F0 must be finite in [0,1]');
  }
  return normalReflectance + (1 - normalReflectance) * (1 - cosine) ** 5;
}
export function ggxDistribution(mu, roughness) {
  if (![mu, roughness].every(Number.isFinite) ||
      mu < 0 || mu > 1 || roughness <= 0 || roughness > 1) {
    throw new RangeError('invalid cosine or roughness');
  }
  const alpha2 = roughness ** 4;
  return alpha2 / (Math.PI * (1 + (alpha2 - 1) * mu ** 2) ** 2);
}
export function expectedWGL12Samples(width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 64 || height < 64 || width > 1024 || height > 1024 ||
      width * height > 524288) throw new RangeError('invalid canvas dimensions');
  return FRESNEL_PROBES.map(({label, metallic, cosine}, x) => ({
    label, x, y: 0, rgba: [
      ...BASE_COLOR.map(base => {
        const f0 = (1 - metallic) * 0.04 + metallic * base;
        return Math.round(255 * schlickScalar(cosine, f0));
      }),
      255,
    ],
  }));
}
export function compareWGL12Readback(actual, width, height, tolerance=2) {
  if (!Number.isFinite(tolerance) || tolerance < 0) throw new RangeError('invalid tolerance');
  return expectedWGL12Samples(width,height).map((reference,i) => {
    const item=actual[i];
    const valid=!!item && item.x===reference.x && item.y===reference.y &&
      Array.isArray(item.rgba) && item.rgba.length===4 &&
      item.rgba.every(v=>Number.isInteger(v) && v>=0 && v<=255);
    const difference=valid ? reference.rgba.map((value,k)=>Math.abs(item.rgba[k]-value)) :
      [Infinity,Infinity,Infinity,Infinity];
    return {...reference,actual:valid?item.rgba:null,difference,
      pass:valid && difference.every(d=>d<=tolerance)};
  });
}
