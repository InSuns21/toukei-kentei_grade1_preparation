# U2-07 数値実験の再実行

標準ライブラリのみを使用するため、Python 3.10 以上で追加インストールは不要です。乱数は使わず、出力は決定論的です。

リポジトリのルートから実行します。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py --scenario wheels
python textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py --scenario arc
python textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py --scenario body-noise
python textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py --scenario covariance
python textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py --self-test
python -m unittest discover -s textbook/volumes/dream_thater/応用系/U/U2-07/assets/tests -v
~~~

ブラウザでは章の Python ラボが公開される同じソースを読み込みます。位置は m、時間は s、向きは rad、共分散の成分は位置・角度の組み合わせに応じて混合単位を持ちます。厳密な円弧と Euler は別の積分法です。共分散伝播は Euler に対する**局所一次近似**です。

自己テストと単体テストは車輪速度、四分円、直進極限、相対オドメトリ、車体雑音の座標回転、共分散行列、数値微分による偏導関数、入力形状・時間刻みのエラーを検査します。
