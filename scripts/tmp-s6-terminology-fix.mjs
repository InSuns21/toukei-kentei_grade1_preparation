import fs from 'node:fs';

const path = 'textbook/volumes/04_linear_models/L1_04_回帰診断_一般化最小二乗_正則化/index.md';
let text = fs.readFileSync(path, 'utf8');
const before = '$\\Omega=I_n$ なら $Q(\\beta)=\\|y-X\\beta\\|^2$ となるので、GLS は通常最小二乗法に戻ります。';
const after = '$\\Omega=I_n$ なら $Q(\\beta)=\\|y-X\\beta\\|^2$ となるので、一般化最小二乗法は通常最小二乗法に戻ります。';
if (text.includes(before)) text = text.replace(before, () => after);
else if (!text.includes(after)) throw new Error('GLS terminology target not found');
fs.writeFileSync(path, text, 'utf8');
