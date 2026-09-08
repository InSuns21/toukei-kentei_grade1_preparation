# FA1 design note

このファイルは実装中の設計確認用。FA1は「Banach空間の商・Baire・一様有界性原理」を担当し、FA2の開写像定理・閉グラフ定理へ接続する。

- 既存正本: LA2（線形商空間）、TOP6（Baire）、F0-02C1（Banach）、F0-02C3（有界線形作用素・作用素ノルム）
- 新規: 商ノルム、標準商写像の開性、商Banach性、pointwise/uniform boundedness、Banach–Steinhaus
- 反例: supノルム付き c00 上の T_n(x)=n x_n
- 系: pointwise収束作用素列の一様有界性、一様非有界作用素族の発散点稠密性
- 禁止: Hahn–Banachを証明装置として使わない。商写像の開性をFA2の開写像定理から逆輸入しない。

このメモは設計確認後に削除する。
