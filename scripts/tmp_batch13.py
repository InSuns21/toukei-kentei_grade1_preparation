from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DAG = ROOT / "textbook/knowledge-dag.yaml"
dag = DAG.read_text(encoding="utf-8")

concept_ids = [
    "bayes-theorem",
    "prior-distribution",
    "posterior-distribution",
    "marginal-likelihood",
    "conjugate-prior-distribution",
    "bayes-posterior-update",
]
for concept_id in concept_ids:
    if f"  - id: {concept_id}\n" in dag:
        raise RuntimeError(f"knowledge-dag: {concept_id} already exists")

new_nodes = '''  - id: bayes-theorem
    name: ベイズの定理
    aliases:
      - Bayes theorem
      - Bayes' theorem
    introduced_in: P1-02

  - id: prior-distribution
    name: 事前分布
    aliases:
      - prior distribution
      - prior probability distribution
    introduced_in: I4-01

  - id: posterior-distribution
    name: 事後分布
    aliases:
      - posterior distribution
      - posterior probability distribution
    introduced_in: I4-01
    requires: [prior-distribution, likelihood-function, bayes-theorem]

  - id: marginal-likelihood
    name: 周辺尤度
    aliases:
      - marginal likelihood
      - evidence
    introduced_in: I4-01
    requires: [prior-distribution, likelihood-function]

  - id: conjugate-prior-distribution
    name: 共役事前分布
    aliases:
      - conjugate prior
      - conjugate prior distribution
    introduced_in: I4-01
    requires: [prior-distribution, posterior-distribution]

  - id: bayes-posterior-update
    name: ベイズの定理による事後分布
    aliases:
      - ベイズ更新による事後分布
      - Bayesian posterior update
      - posterior distribution by Bayes' theorem
    introduced_in: I4-01
    requires: [bayes-theorem, likelihood-function, prior-distribution, marginal-likelihood, posterior-distribution]
'''

dag = dag.rstrip("\n") + "\n\n" + new_nodes.rstrip("\n") + "\n"
DAG.write_text(dag, encoding="utf-8")
print("Batch 13 Bayesian core concepts appended")
