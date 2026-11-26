# AIが書いた物語の評価方法と、LLM評価役と人間の一致度

調査日: 2026-11-27。各項目の年・会場を併記する。2024年以前の結果は、当時のモデル（GPT-3.5/GPT-4/Claude 1.3〜3.5、Llama 2系）での結果であり、現行モデルでは変わっている可能性がある。

## 人間による創作文の評価枠組みには何があるか（TTCW、専門家と一般読者、対比較とリッカート尺度）

### Takeaway
専門家向けにはTTCW（14項目のはい/いいえ判定）、一般向けにはHANNAの6基準（リッカート尺度）、読者の内面の反応を測るPsychological Depth Scaleなどがある。専門家同士でも一致は中程度（Fleiss κ 0.41）で、専門家と一般読者は別の特徴を重視するため、「人間の評価」は誰が読むかで割れる。

### Cited Findings
- **TTCW（Torrance Test of Creative Writing）**: Chakrabarty, Laban, Agarwal, Muresan, Wu「Art or Artifice? Large Language Models and the False Promise of Creativity」CHI 2024。創造性テストTTCTを作品評価に移し、Fluency・Flexibility・Originality・Elaborationの4次元に14の二値テスト（例: 理解しやすさと一貫性、語りのペース、場面と説明の配分、結末、人物造形、主題の独創性）を置いた — [arXiv 2309.14556](https://arxiv.org/abs/2309.14556v3)
- TTCWの実験設定: The New Yorker掲載の短編12本と、その1文あらすじからGPT-3.5・GPT-4・Claude v1.3に同じ長さ（平均約1,400語）で書かせた36本、計48本。評価者は創作の専門家10人（大学教員、文芸エージェント、MFA作家）で、1作品群を3人が評価。1回の評価に2〜2.5時間、報酬80ドル。二値ラベル2,016件にそれぞれ理由が付く — [arXiv HTML v2](https://arxiv.org/html/2309.14556v2)
- TTCWの合格率: New Yorker 84.7%、GPT-3.5 8.7%、GPT-4 27.9%、Claude v1.3 30.0%（LLM作品は人間作品の1/3〜1/10しか合格しない） — [arXiv HTML v2](https://arxiv.org/html/2309.14556v2)
- 専門家同士の一致: 14テスト平均のFleiss κ = 0.41（中程度）、テストごとに0.27〜0.66。作品ごとの合格数で見るとPearson ρ = 0.69 — [arXiv HTML v2](https://arxiv.org/html/2309.14556v2)
- データとコードは公開され、LLMの評価能力のベンチマークに使える — [GitHub salesforce/creativity_eval](https://github.com/salesforce/creativity_eval)
- **HANNA**: Chhun ら「Of Human Criteria and Automatic Metrics: A Benchmark of the Evaluation of Story Generation」COLING 2022。社会科学の文献から6基準（Relevance, Coherence, Empathy, Surprise, Engagement, Complexity）を定め、10の生成システムの物語1,056本に人手評価を付け、72の自動指標との相関を測った。自動指標は物語評価に弱いと結論 — [arXiv 2208.11646](https://arxiv.org/abs/2208.11646v1); [ACL Anthology](https://aclanthology.org/2022.coling-1.509)
- **Psychological Depth Scale（PDS）**: Harel-Canada ら、EMNLP 2024。読者反応理論にもとづく5次元。人間評価者間のKrippendorff α = 0.72。GPT-4の物語は、Redditで高評価の人間作品を上回るか統計的に区別できなかった — [arXiv 2406.12680](https://arxiv.org/abs/2406.12680)
- **LitBench**: Fein ら（Stanford）、arXiv 2025-07、EACL 2026採録。Reddit r/WritingPrompts の投票から作った対比較で、テスト2,480対・学習43,827対。専門家ではなく一般読者の好みを測る — [arXiv 2507.00769](https://arxiv.org/abs/2507.00769v1); [ACL Anthology 2026.eacl-long.362](https://preview.aclanthology.org/credits/2026.eacl-long.362)
- **専門家と一般読者の違い**: Marco, Gonzalo, Fresno「The Reader is the Metric」Findings of ACL 2025。公開5データセット・物語1,471本・評価者101人（批評家、学生、一般読者）を、17の文章特徴への重みとして分析。読者は2型に分かれ、主に非専門家の「表層重視型」は読みやすさと語彙の豊かさを、主に専門家の「全体重視型」は主題の展開・修辞の変化・感情の起伏を重視する。AI作品の評価が研究ごとに食い違うのはこのためだと論じる — [arXiv 2506.03310](https://arxiv.org/abs/2506.03310)
- **編集者の手直しを好みの信号にする方式**: Chakrabarty, Laban, Wu「AI-Slop to AI-Polish?」COLM 2025。AIが書き専門家が手直しした1,282対（LAMPコーパス）で文章品質の報酬モデルを学習。専門家との好みの一致は66%、報酬差が1点を超える組では72.2% — [arXiv 2504.07532](https://arxiv.org/html/2504.07532v3)

### Inferences
- 評価者を専門家にするか一般読者にするかで、何を「良い」とするかが変わる。人間の感想を基準にする場合、その読み手がどちらの型かを意識する必要がある。
- 二値の項目判定（TTCW）は理由を書かせやすく一致度も測りやすいが、1作品に2時間以上かかり、専門家同士でも一致は中程度にとどまる。

### Gaps
- 対比較とリッカート尺度を同じ物語で直接比べ、どちらが人間同士の一致を高めるかを示した物語専用の研究は、今回の検索では見つからなかった。
- WritingBench・StoryERは今回本文を確認していない。

## LLM評価役は物語の品質について専門家・人間とどれくらい一致するか。どの次元を見落とすか

### Takeaway
専門家の細かい項目判定とはほぼ一致しない（TTCWでCohen κ平均 −0.006〜0.035）。一般読者の好みの対比較では最良でも73%（LitBench, Claude 3.7 Sonnet）、物語単位の相関は弱い（Kendall τ 0.16〜0.25）。一方、システム（モデル）単位の平均順位は人間とよく一致する。理解しやすさ・ペース・場面と説明の配分・人物造形・緊張感の判定が特に弱く、LLM作品を人間の名作より高く採点する例が報告されている。

### Cited Findings
- **TTCWでのLLM評価役（2024、GPT-3.5/GPT-4/Claude v1.3）**: 専門家3人の多数決との Cohen κ 平均は GPT-3.5 0.016、GPT-4 0.035、Claude −0.006。0.2を超えたのはGPT-4の「思考の独創性」0.31と「視点と語りの柔軟性」0.26だけ。「理解しやすさと一貫性」はGPT-3.5 −0.01、GPT-4 −0.01、Claude −0.17、「場面と説明の配分」はClaude −0.23、「人物造形」は −0.08〜0.02。few-shotでも有意な改善なし。LLMの理由は専門家より手順的で長かった — [arXiv HTML v2（Table 9）](https://arxiv.org/html/2309.14556v2)
- **HANNAでのLLM評価役**: Chhun, Suchanek, Clavel「Do Language Models Enjoy Their Own Stories?」TACL 2024。物語単位のKendall相関（6基準平均）はBeluga-13B 0.25、Mistral-7B 0.20、ChatGPT 0.18、Llama-13B 0.16、従来の自動指標は0.18以下。システム単位ではBeluga-13Bが0.70で、人間評価者の0.73に近い。ChatGPTのシステム単位相関は0.07〜0.73と不安定 — [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)
- 同論文: LLMは自己一貫性が非常に高い（最低でもMistral-7BのSurpriseのICC 0.66）。ただし評価の理由づけでは、ガイドラインに従えず主張を裏づけられないことが多い — [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)
- 同論文: LLM評価役はLLM作品に人間作品と同等以上の点をつけた。大きいモデルの点が高いのは既存の書籍に似た出力を作れるためかもしれないと著者は述べる — [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)
- **LitBench（2025）**: 市販モデルの評価役で最良はClaude 3.7 Sonnetの人間の好みとの一致73%。専用に学習した報酬モデル（Bradley-Terry型・生成型）は78% — [arXiv 2507.00769](https://arxiv.org/abs/2507.00769v1)
- **文章品質ベンチマーク（2025）**: 推論が得意な最先端LLMでも、専門家が判断した文章の良し悪しの選択では無作為に近い成績だった — [arXiv 2504.07532](https://arxiv.org/abs/2504.07532v1)
- **PDS（2024）**: GPT-4o＋Mixture-of-Personas の人間との Spearman 相関は平均0.51。Llama-3-70Bの共感の次元で最大0.68 — [arXiv 2406.12680](https://arxiv.org/abs/2406.12680)
- **緊張感の判定（2026）**: Sui, Zhu, Cheng, West, So, Long, Holtzman「Spoiler Alert: Narrative Forecasting as a Metric for Tension in LLM Storytelling」COLM 2026。ルーブリック式のLLM評価役（EQ-Bench）は、AIが一発で書いた物語をNew Yorkerの短編より上に順位づけるが、彼らの100-Endings指標（下記）はNew Yorker作品をLLM作品よりはるかに上に置く — [arXiv 2604.09854](https://arxiv.org/abs/2604.09854)
- 一般論として、人間同士でも意見が割れる課題（創作、意見、ユーモア）ではLLMと人間の一致も下がる。MT-BenchでのGPT-4と専門家の約80%一致は創作には当てはまらない — 二次資料 [galtea.ai](https://galtea.ai/blog/llm-as-a-judge-the-complete-guide)（一次資料ではないので参考程度）

### Inferences
- 「システム単位で高相関、作品単位で低相関」なので、LLM評価役は多数の作品の平均で書き手モデルを比べる用途には使えるが、1作品の改稿の良し悪しを判定する用途には弱い。
- 見落とす次元は、読者が実際に体験して初めて分かるもの（理解しやすさ、ペース、緊張感、人物の言動の自然さ）に偏っている。独創性はわずかに拾える（GPT-4で κ 0.31）。
- LLM評価役はLLMの文章を人間の名作と同等以上に評価する傾向が、2024年（HANNA）と2026年（EQ-Bench対New Yorker）の両方で報告されている。

### Gaps
- 人物の言動のもっともらしさ（キャラクターの行動の一貫性）を独立した次元として測り、LLMと人間の一致を出した研究は見つからなかった（TTCWの「人物造形」が最も近い）。
- 2026年時点の最新モデル（Claude Opus 4.x/5系、GPT-5系）でTTCWを再評価した結果は見つからなかった。
- 推理小説・ミステリーに限った評価役の研究は見つからなかった。

## LLM評価役の既知の偏り（自己優遇・同系列優遇・長さ・位置・甘さ・洗練された文の偏好）

### Takeaway
自己優遇はあり、自分の出力を見分けられるほど強い（Panickssery ら 2024）。同じ開発元の別モデルを優遇する「同系列優遇」もClaude系とGPT系で確認されている（AWS 2025）。長さの偏りは人間にもあるがLLMのほうが強く、位置の偏りはLLMだけに有意。ただし自己優遇の測定には交絡があるという反論もある。

### Cited Findings
- **自己優遇の基礎文献**: Panickssery, Bowman, Feng「LLM Evaluators Recognize and Favor Their Own Generations」NeurIPS 2024（arXiv 2404.13076）。LLM評価役は、人間が同等と判断する出力でも自分の出力に高い点をつける。自己優遇の強さは自己認識能力と線形に相関する（課題は要約） — [arXiv 2404.13076](https://arxiv.org/abs/2404.13076v1)
- **同系列優遇**: Spiliopoulou ら（AWS）「Play Favorites: A Statistical Method to Measure Self-Bias in LLM-as-a-Judge」arXiv 2025-08（査読会場の記載なし）。9モデル・596プロンプト・5,364出力で、品質を統制したうえでの自己優遇を推定。GPT系とClaude 3.5 Sonnetは正の自己優遇、Claude v2とClaude 3 Sonnetはほぼなし、Llama 3 8Bは有意な負の自己優遇。ClaudeとGPTは同じ系列の別モデルにも高い点をつける（例: Claude 3.5 SonnetがClaude v2・Claude 3 Sonnetの点を上げる）。LlamaとMistralには同系列優遇がない。偏りの大きさ（約0.02）はClaude 3.5 SonnetとGPT-4oの点差と同程度で、順位を入れ替えうる。課題は開かれた質問応答と要約で、創作ではない — [arXiv 2508.06709](https://arxiv.org/html/2508.06709v1)
- 同系列優遇は別の研究でも報告されている（ルーブリック評価での自分・同系列モデルの優遇、生成モデルと評価役が同じ・継承関係・同系列のときの「preference leakage」） — [検索結果の要約: arXiv 2502.01534](https://arxiv.org/pdf/2502.01534v3)（本文未確認）
- **反論**: Roytburg ら「Are LLM Evaluators Really Narcissists?」は、従来の自己優遇の測定が評価役の不確かさによる見かけの効果を含み、正解率との比較をしていなかったと指摘する — [検索結果の要約](https://arxiv.org/pdf/2601.22548)（本文未確認）
- 長い思考の連鎖を判定前に生成させると、有害な自己優遇が減るという報告もある — [arXiv 2504.03846](https://arxiv.org/pdf/2504.03846)（本文未確認）
- **物語での自己優遇（2024）**: HANNA拡張実験では、Beluga-13BとMistral-7Bは自分の出力より大きいモデル（Platypus2-70B、Llama-30B）の出力を好んだ。単純なパープレキシティ（自分にとっての読みやすさ）では説明できないと著者は述べる — [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)
- **長さと位置**: Polyrating（arXiv 2409.00696）では、長さの偏りは人間とLLMの両方で有意だがLLMで強く、位置の偏りはLLMだけで有意 — [arXiv 2409.00696](https://arxiv.org/pdf/2409.00696)。対比較の位置の偏りは、候補間の品質差が小さいほど強く、長さの差の影響は小さい — [arXiv 2406.07791](https://arxiv.org/pdf/2406.07791v5)
- EQ-Bench Creative Writingは出力を4,000文字で切って長さをそろえるが、EQ-Bench自身の資料では短い出力ほどルーブリックの点が低いと書かれている（二次報告） — [検索結果: arXiv 2605.27832](https://arxiv.org/pdf/2605.27832)。EQ-Benchの評価役は時期によって変わっている（推奨評価役はclaude-sonnet-4-6） — [GitHub EQ-bench/creative-writing-bench](https://github.com/EQ-bench/creative-writing-bench)
- **甘さ・洗練された文の偏好**: ルーブリック式評価役がAI作品をNew Yorker作品より上に置く（上記 Spoiler Alert, 2026）、LLM評価役がLLM作品に人間作品と同等以上の点をつける（Chhun ら 2024） — [arXiv 2604.09854](https://arxiv.org/abs/2604.09854); [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)

### Inferences
- 同系列優遇の証拠は要約・質問応答で得られたもので、創作に直接当てはめた研究は見つからなかった。ただしClaude系の評価役がClaude系の書き手を優遇する可能性は、創作でも疑っておく理由がある。対策としては、書き手と別系列の評価役（例: Codex/GPT系）を混ぜる構成が妥当。
- 「AIの文章をAIが甘く採点する」傾向は、自己優遇より広い現象（LLM的な文体全般への偏好）として現れている可能性がある。

### Gaps
- 創作文で同系列優遇を測った研究は見つからなかった。
- 評価役の甘さ（点の天井張り付き）を創作で数値化した研究は見つからなかった。

## 人間との一致を高めた方法（ルーブリック、参照作品、読者ペルソナ、理解の要約、複数評価役）

### Takeaway
詳しいガイドラインや参照作品を足しても一致は上がらないか、効果がまちまちだった（2024）。効いたのは、人間の好みデータでの専用学習（73%→78%）、複数ペルソナでの評価（PDSで相関0.51）、評価役に点をつけさせず読者として予測させる方式（100-Endings）など。思考の連鎖の蒸留は創作では逆効果だった。

### Cited Findings
- 基準ごとのプロンプトは有効だが、詳しいガイドライン（Eval-Prompt 3）は相関を上げず、参照用の人間作品を添える（Eval-Prompt 4）と効果はまちまちだった — [TACL 2024](https://aclanthology.org/2024.tacl-1.62.pdf)
- TTCWではfew-shotの例示でも有意な改善なし — [arXiv HTML v2](https://arxiv.org/html/2309.14556v2)
- 人間の好み対で学習した報酬モデルは78%で、市販最良（Claude 3.7 Sonnet 73%）を上回った。より強い評価役の思考の連鎖を蒸留すると、創作の判定はかえって悪くなった — [arXiv 2507.00769](https://arxiv.org/abs/2507.00769v1)
- 専門家の手直しから学習した報酬モデルは専門家と66%（報酬差が大きい組で72.2%）一致し、汎用LLMの無作為に近い成績を上回った — [arXiv 2504.07532](https://arxiv.org/html/2504.07532v3)
- **読者ペルソナ**: Mixture-of-Personas（複数の読者像で評価させて合成）でGPT-4oの人間との相関が平均0.51 — [arXiv 2406.12680](https://arxiv.org/abs/2406.12680)。読者の型（表層重視・全体重視）に合わせた評価を提案する研究もある — [arXiv 2506.03310](https://arxiv.org/abs/2506.03310)
- **読者として予測させる方式**: 100-Endingsは、物語を1文ずつ読ませ、各位置で結末を100回予測させ、外れた割合を緊張感とする。曲線の向きが変わる頻度は、ひねりや意外な事実の明かしを捉える。ルーブリック評価役と違い、New Yorker作品をLLM作品より上に置いた — [arXiv 2604.09854](https://arxiv.org/abs/2604.09854)
- 読者が実際に言及した評価観点を抽出して長編の評価に使う方法が、GPT-4oより人間の評価に近かった — [arXiv 2512.12839](https://arxiv.org/pdf/2512.12839.pdf)（検索結果の要約、本文未確認）
- 位置を入れ替えた全組み合わせで点を平均すると、位置の偏りが見え、人間との相関も上がった — [検索結果: arXiv 2506.22316](https://arxiv.org/pdf/2506.22316v1)（本文未確認）。偏りの除去は有効だがモデルに依存する — [arXiv 2604.23178](https://arxiv.org/html/2604.23178)（本文未確認）

### Inferences
- ルーブリックを細かくする・例を足すといった「評価役への説明を増やす」方向は、物語評価ではほとんど効いていない。効いているのは、評価役を読者の立場に置く方式（結末の予測、ペルソナ）と、人間の判定データそのものを使う方式。
- ミステリーでは「問題編の時点で犯人を予測させ、当たり外れを見る」読者役の設計は、100-Endingsと同じ考え方（予測の失敗率で驚きを測る）にあたり、点数式の評価役より人間との一致が期待できる。

### Gaps
- 評価役に読後の要約（理解の確認）を書かせてから採点させると一致が上がるかを、物語で直接測った研究は見つからなかった。
- 複数の異なる系列の評価役を合議させた場合の、創作での一致度の数値は見つからなかった。
