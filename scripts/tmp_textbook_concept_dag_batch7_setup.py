from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{path}: expected exactly one match, got {count}: {old!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


# Extend the testing-theory part of the knowledge DAG with precise aliases only.
replace_once(
    "textbook/knowledge-dag.yaml",
    "  - id: p-value\n    name: P値\n    aliases:\n      - p-value\n    introduced_in: I3-01\n    requires: [significance-level, rejection-region]\n",
    "  - id: p-value\n    name: P値\n    aliases:\n      - p-value\n    introduced_in: I3-01\n    requires: [significance-level, rejection-region]\n\n"
    "  - id: power-curve\n    name: 検出力曲線\n    aliases:\n      - power curve\n    introduced_in: I3-01\n    requires: [power-function]\n\n"
    "  - id: most-powerful-test\n    name: 最強力検定\n    aliases:\n      - most powerful test\n      - most-powerful test\n    introduced_in: I3-01\n    requires: [significance-level, power-function]\n\n"
    "  - id: randomized-test\n    name: ランダム化検定\n    aliases:\n      - randomized test\n      - randomised test\n    introduced_in: I3-01\n    requires: [test-function, significance-level]\n\n"
    "  - id: test-confidence-duality\n    name: 検定と信頼集合の双対性\n    aliases:\n      - 検定と信頼区間の双対性\n      - test-confidence set duality\n      - duality between tests and confidence sets\n    introduced_in: I3-01\n    requires: [significance-level, confidence-interval]\n",
)

# Formalize randomized tests before registering them as an introduced concept.
replace_once(
    "textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/index.md",
    "## 9. 離散分布ではランダム化が必要になることがある\n\nコインを5回投げ、表の回数を $X$ とします。\n",
    "## 9. 離散分布ではランダム化が必要になることがある\n\n"
    "<a id=\"def-i3-01-randomized-test\"></a>\n\n"
    "<!-- formal-statement-start -->\n"
    "> **定義（ランダム化検定）**  \n"
    "> 検定関数 $\\varphi(x)$ がある標本点 $x$ で $0<\\varphi(x)<1$ を取るとき、観測値 $x$ に対して確率 $\\varphi(x)$ で帰無仮説を棄却する検定を **ランダム化検定** という。全ての標本点で $\\varphi(x)\\in\\{0,1\\}$ なら非ランダム検定である。\n"
    "<!-- formal-statement-end -->\n\n"
    "コインを5回投げ、表の回数を $X$ とします。\n",
)
replace_once(
    "textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/index.md",
    "$$\n\\boxed{\\gamma=0.12}.\n$$\n\n例えば対立点 $p=0.8$ での検出力は\n",
    "$$\n\\boxed{\\gamma=0.12}.\n$$\n\n"
    "<!-- definition-example-start: def-i3-01-randomized-test -->\n"
    "**定義の確認**  \n"
    "この例の検定関数は $\\varphi(5)=1$、$\\varphi(4)=0.12$、$\\varphi(x)=0$（$x\\le3$）です。$X=4$ では確率0.12で棄却し、$0<\\varphi(4)<1$ となるため、これはランダム化検定です。\n"
    "<!-- definition-example-end -->\n\n"
    "例えば対立点 $p=0.8$ での検出力は\n",
)

# Synchronize chapter metadata with the new formal definition.
replace_once(
    "textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/chapter.yaml",
    "  - { id: I301-DEF-09, name: 一様最強力検定 }\n  - {id: I301-DEF-10, name: 検出力曲線}\n",
    "  - { id: I301-DEF-09, name: 一様最強力検定 }\n  - { id: I301-DEF-10, name: 検出力曲線 }\n  - { id: I301-DEF-11, name: ランダム化検定 }\n",
)
