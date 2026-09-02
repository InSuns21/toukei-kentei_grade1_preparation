import fs from 'node:fs';
const p='textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md';
let s=fs.readFileSync(p,'utf8');
const from='D5では、選択公理を使ってVitali集合を作り、';
const to='[D5のVitali集合の非可測性](../F0_00D5_Vitali集合_非可測集合_選択公理/index.md#thm-vitali-nonmeasurable)では、選択公理を使ってVitali集合を作り、';
if(!s.includes(from)) throw new Error('D5 Vitali prose reference not found');
s=s.replace(from,to);
fs.writeFileSync(p,s);
