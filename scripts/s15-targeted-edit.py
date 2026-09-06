from pathlib import Path

changed = False


def replace_once(path, old, new, marker=None):
    global changed
    p = Path(path)
    text = p.read_text()
    if marker and marker in text:
        return
    count = text.count(old)
    if count == 0:
        if new in text:
            return
        raise SystemExit(f"{path}: old text not found and replacement marker absent")
    if count != 1:
        raise SystemExit(f"{path}: expected exactly one old match, got {count}")
    p.write_text(text.replace(old, new, 1))
    changed = True


replace_once(
    'textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md',
    '任意の $a\\in A,b\\in B$ について三角不等式から',
    '任意の $a\\in A,b\\in B$ を取ります。Euclidean距離は距離なので、距離空間の定義から',
    'Euclidean距離は距離なので、距離空間の定義から',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md',
    '[前節の$L^2$表現補題](#lem-f0-00p2-l2-representation)から',
    '[前節のL^2表現補題](#lem-f0-00p2-l2-representation)から',
    '[前節のL^2表現補題]',
)
replace_once(
    'textbook/volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/knowledge.yaml',
    'forward_references:\n  - prob.expectation\n  - prob.lotus\n',
    'forward_references:\n  - prob.expectation\n  - prob.lotus\n  - functional.linear-functional\n  - functional.continuous-linear-functional\n  - stat.statistical-model\n',
    '  - stat.statistical-model\n',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00P2A_期待値_LOTUS/index.md',
    '押し出し測度の積分公式から',
    'ここでは次の押し出し積分公式（LOTUS）を先に導入します。完全証明はP3Dで与えます。',
    '押し出し積分公式（LOTUS）を先に導入します',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md',
    'なら、第1補題から各 $k$ で',
    'なら、Borel--Cantelli第1補題から各 $k$ で',
    'なら、Borel--Cantelli第1補題から各 $k$ で',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00P5_大数の強法則/index.md',
    '区間内の増分 $S_n-S_{2^k}$ に最大不等式を適用すると',
    '区間内の増分 $S_n-S_{2^k}$ にKolmogorov最大不等式を適用すると',
    '区間内の増分 $S_n-S_{2^k}$ にKolmogorov最大不等式を適用すると',
)
replace_once(
    'textbook/volumes/00_foundations/F0_00P5_大数の強法則/knowledge.yaml',
    'forward_references:\n  - prob.iid-integrable-slln\n',
    'forward_references:\n  - prob.iid-integrable-slln\n  - prob.iid-clt\n',
    '  - prob.iid-clt\n',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md',
    '''とします。tail-sum公式から

$$\\sum_{n=1}^\\infty P(|X_1|>n)\\le E|X_1|<\\infty.$$''',
    '''とします。ここで使うtail-sum評価は

$$
\\sum_{n=1}^\\infty P(|X_1|>n)\\le E|X_1|<\\infty
$$

です。実際、点ごとに

$$
\\sum_{n=1}^\\infty \\mathbf 1_{\\{|X_1|>n\\}}\\le |X_1|
$$

なので、Tonelliの定理で期待値と和を交換すれば従います。''',
    'ここで使うtail-sum評価は',
)

replace_once(
    'textbook/volumes/00_foundations/F0_02C7A_representer_kernel_SVM/index.md',
    '''Pythagorasの定理から

$$
\\|f\\|^2
=\\|f_{\\parallel}\\|^2
+\\|f_{\\perp}\\|^2
\\ge\\|f_{\\parallel}\\|^2.
$$''',
    '''$f_{\\parallel}\\perp f_{\\perp}$ なので、内積を展開すると

$$
\\begin{aligned}
\\|f\\|^2
&=\\langle f_{\\parallel}+f_{\\perp},f_{\\parallel}+f_{\\perp}\\rangle\\\\
&=\\|f_{\\parallel}\\|^2+\\|f_{\\perp}\\|^2\\\\
&\\ge\\|f_{\\parallel}\\|^2.
\\end{aligned}
$$''',
    '内積を展開すると',
)

replace_once(
    'textbook/volumes/00_foundations/F0_00H1_常微分方程式_線形系_行列指数/index.md',
    '''### 5.3 複素根

$$
r=\\alpha\\pm i\\beta
$$

ならEulerの公式から実数解として

$$
\\boxed{
y(t)=e^{\\alpha t}
\\{C_1\\cos(\\beta t)+C_2\\sin(\\beta t)\\}.
}
$$''',
    '''### 5.3 複素根

ここで使うEulerの公式は

$$
\\boxed{e^{i\\theta}=\\cos\\theta+i\\sin\\theta}
$$

です。したがって

$$
r=\\alpha\\pm i\\beta
$$

に対応する複素指数解の実部・虚部を取ると、実数解は

$$
\\boxed{
y(t)=e^{\\alpha t}
\\{C_1\\cos(\\beta t)+C_2\\sin(\\beta t)\\}.
}
$$''',
    'ここで使うEulerの公式は',
)
replace_once(
    'textbook/volumes/00_foundations/F0_00H1_常微分方程式_線形系_行列指数/knowledge.yaml',
    'prerequisites:\n  - F0-00F1\n\nconcepts:\n',
    'prerequisites:\n  - F0-00F1\n\nforward_references:\n  - fourier.transform-l1\n  - pde.partial-differential-equation\n  - pde.heat-equation\n  - pde.separation-of-variables\n  - pde.sturm-liouville-problem\n\nconcepts:\n',
    'forward_references:\n',
)
replace_once(
    'textbook/volumes/00_foundations/F0_00H1_常微分方程式_線形系_行列指数/knowledge.yaml',
    '''  - id: ode.matrix-exponential-solution
    name: 線形系の行列指数解''',
    '''  - id: complex.euler-formula
    name: Eulerの公式
    kind: term
    aliases: [Eulerの公式]
    introduction: inline
    requires: []

  - id: ode.matrix-exponential-solution
    name: 線形系の行列指数解''',
    'id: complex.euler-formula',
)

replace_once(
    'textbook/volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md',
    '''---

## 7. MFCQ の下では $T_C(x^*)=L_C(x^*)$''',
    '''---

## 6.5 証明で使う陰関数定理

<a id="thm-f0-02c5a-implicit-function"></a>

<!-- formal-statement-start -->
> **定理（陰関数定理：有限次元の局所グラフ表示）**  
> $h:\\mathbb R^{p+q}\\to\\mathbb R^q$ を $C^1$ 級とし、$h(u^*,z^*)=0$、$D_zh(u^*,z^*)$ が正則であるとします。このとき $(u^*,z^*)$ の近くで $h(u,z)=0$ は

$$
z=\\varphi(u)
$$

> と一意に表せる $C^1$ 級写像 $\\varphi$ を持ち、

$$
\\boxed{
D\\varphi(u^*)
=-D_zh(u^*,z^*)^{-1}D_uh(u^*,z^*)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

この定理により、等式制約を壊さない接方向を実際の曲線として実現できます。

---

## 7. MFCQ の下では $T_C(x^*)=L_C(x^*)$''',
    '## 6.5 証明で使う陰関数定理',
)
replace_once(
    'textbook/volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/knowledge.yaml',
    '''  - id: optimization.mfcq-tangent-equality
    name: MFCQ下の接錐一致
    kind: theorem
    aliases: [MFCQ下の接錐一致]
    requires:
      - optimization.mfcq
      - optimization.tangent-subset-linearized
      - optimization.linearized-cone-recap-c5a
''',
    '''  - id: analysis.implicit-function-theorem
    name: 陰関数定理
    kind: theorem
    aliases: [陰関数定理, 陰関数定理の微分公式]
    requires:
      - functional.frechet-derivative

  - id: optimization.mfcq-tangent-equality
    name: MFCQ下の接錐一致
    kind: theorem
    aliases: [MFCQ下の接錐一致]
    requires:
      - optimization.mfcq
      - optimization.tangent-subset-linearized
      - optimization.linearized-cone-recap-c5a
      - analysis.implicit-function-theorem
''',
    'id: analysis.implicit-function-theorem',
)

replace_once(
    'scripts/audit-dream-theater-explicit-dependencies.mjs',
    '''    if (aliasBase.length >= 4 && base.endsWith(aliasBase) && isResultLike(item.concept, item.alias)) return item.concept;
  }
  return null;
}''',
    '''    if (aliasBase.length >= 4 && base.endsWith(aliasBase) && isResultLike(item.concept, item.alias)) return item.concept;
    if (candidateType === 'result' && base.length >= 6 && aliasBase.startsWith(`${base}は`) && isResultLike(item.concept, item.alias)) return item.concept;
  }
  return null;
}''',
    'aliasBase.startsWith(`${base}は`)',
)

print('changed' if changed else 'already-applied')
