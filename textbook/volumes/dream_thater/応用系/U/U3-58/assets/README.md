# U3-58 信用損失の数値検算

Python 3.11 以降。外部パッケージ・乱数・外部API・市場データは不要です。

~~~sh
python assets/credit_risk.py --scenario single --alpha 0.95
python assets/credit_risk.py --scenario independent --alpha 0.95
python assets/credit_risk.py --scenario clustered --alpha 0.95
python assets/credit_risk.py --scenario wrong-way --alpha 0.95
python -m unittest discover -s assets/tests -v
~~~

いずれも章ディレクトリから実行。金額単位は万円。基準 alpha=0.95 の
期待値 / VaR / ES は一社 1.2 / 0 / 24、独立二社 12 / 60 / 72、
完全同時二社 12 / 120 / 120、担保なし相手先 6 / 60 / 60 です。

状態数を n とするとソートが O(n log n)、確率尾部走査が O(n)、
メモリは O(n)。Fraction で確率の和・境界同順位を厳密に扱います。
誤った確率和・負の確率・不正な alpha は ValueError にします。
