import fs from 'node:fs';

const path = 'textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md';
let s = fs.readFileSync(path, 'utf8');

function replaceOnce(oldText, newText, label) {
  const count = s.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly one match, got ${count}`);
  s = s.replace(oldText, newText);
}

replaceOnce(
`## 1. Cauchy--Schwarz不等式

内積空間の任意の $x,y$ に対して

$$
\\boxed{
|\\langle x,y\\rangle|
\\le
\\|x\\|\\,\\|y\\|
}
$$

が成り立ちます。

これが **Cauchy--Schwarz不等式** です。

等号は $x,y$ が一次従属のとき、つまり一方が他方の実数倍であるときに限って成立します。`,
`## 1. Cauchy--Schwarz不等式

<a id="thm-f0-00e2-cauchy-schwarz"></a>

<!-- formal-statement-start -->
> **定理（Cauchy--Schwarz不等式）**  
> 実内積空間の任意の $x,y$ に対して

$$
\\boxed{
|\\langle x,y\\rangle|
\\le
\\|x\\|\\,\\|y\\|
}
$$

> が成り立ちます。等号が成り立つのは $x,y$ が一次従属であるとき、かつそのときに限ります。
<!-- formal-statement-end -->`,
'Cauchy--Schwarz theorem'
);

replaceOnce(
`## 4. Cauchy--Schwarzから三角不等式を導く

$$`,
`## 4. Cauchy--Schwarzから三角不等式を導く

<a id="thm-f0-00e2-triangle-inequality"></a>

<!-- formal-statement-start -->
> **定理（三角不等式）**  
> 実内積空間で内積から定まるノルム $\\|x\\|=\\sqrt{\\langle x,x\\rangle}$ は、任意の $x,y$ に対して

$$
\\boxed{
\\|x+y\\|\\le\\|x\\|+\\|y\\|
}
$$

> を満たします。
<!-- formal-statement-end -->

この定理はCauchy--Schwarz不等式から次のように従います。

$$`,
'triangle inequality theorem'
);

replaceOnce(
`## 5. 逆三角不等式

三角不等式から`,
`## 5. 逆三角不等式

<a id="thm-f0-00e2-reverse-triangle-inequality"></a>

<!-- formal-statement-start -->
> **定理（逆三角不等式）**  
> 任意の $x,y$ に対して

$$
\\boxed{
|\\|x\\|-\\|y\\||
\\le
\\|x-y\\|
}
$$

> が成り立ちます。特にノルム関数 $x\\mapsto\\|x\\|$ は1-Lipschitz連続です。
<!-- formal-statement-end -->

三角不等式から`,
'reverse triangle theorem'
);

replaceOnce(
`## 6. 正規直交系への射影係数

$q_1,\\dots,q_k$ を正規直交系とします。`,
`## 6. 正規直交系への射影係数

<a id="prop-f0-00e2-orthogonal-projection-coefficients"></a>

<!-- formal-statement-start -->
> **命題（正規直交系への射影係数）**  
> $q_1,\\dots,q_k$ を正規直交系とし、$p$ を $x$ の $\\operatorname{span}(q_1,\\dots,q_k)$ への直交射影とします。このとき

$$
p=\\sum_{i=1}^k\\langle x,q_i\\rangle q_i
$$

> であり、各射影係数は $c_i=\\langle x,q_i\\rangle$ です。
<!-- formal-statement-end -->

以下で係数を直接導きます。`,
'orthogonal projection proposition'
);

replaceOnce(
`## 7. Bessel不等式

$x$ を`,
`## 7. Bessel不等式

<a id="thm-f0-00e2-bessel-inequality"></a>

<!-- formal-statement-start -->
> **定理（Bessel不等式）**  
> $q_1,\\dots,q_k$ を実内積空間の正規直交系とすると、任意の $x$ に対して

$$
\\boxed{
\\sum_{i=1}^k |\\langle x,q_i\\rangle|^2
\\le
\\|x\\|^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

この不等式は直交射影のPythagoras分解から従います。$x$ を`,
'Bessel theorem'
);

replaceOnce(
`## 9. Parseval等式

$q_1,\\dots,q_n$ が有限次元内積空間 $V$ の正規直交基底なら、任意の $x\\in V$ は`,
`## 9. Parseval等式

<a id="thm-f0-00e2-parseval-identity"></a>

<!-- formal-statement-start -->
> **定理（有限次元Parseval等式）**  
> $q_1,\\dots,q_n$ が有限次元実内積空間 $V$ の正規直交基底なら、任意の $x\\in V$ に対して

$$
\\boxed{
\\|x\\|^2
=
\\sum_{i=1}^n |\\langle x,q_i\\rangle|^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

正規直交基底は $V$ 全体を張るので、任意の $x\\in V$ は`,
'Parseval theorem'
);

fs.writeFileSync(path, s);
console.log('Formalized F0-00E2 named results with stable anchors.');
