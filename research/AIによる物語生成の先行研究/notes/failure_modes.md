# LLMが書いた物語の弱点（人間の評価による）と、それを減らす手立て

調査日: 2026-11-27。各項目に著者・年・掲載先を添える。2024年以前のモデル（GPT-4、Claude 3、LaMDAなど）を対象にした結果は「旧」と書く。arXivのみで査読先の記載がないものは「プレプリント」と書く。

## 問1: 研究が報告する弱点（決まり文句、出力の均質化、説明過多と行間の欠如、語らせて見せない、無難な結末と教訓、装飾過多、動機の不自然さ、緊張の弱さ）

### Takeaway
専門家の評価では、LLMの物語は文の水準（決まり文句・説明過多・装飾過多・ぎこちない語）と物語の水準（緊張の弱さ・明るく単純な筋・主題の説明しすぎ・道徳的に曖昧でない主人公）の両方で人間の作家に劣り、しかも複数のモデルが同じ癖・同じ筋に寄る（均質化）。素人の読者や評価役のLLMはこの差を見落とし、AIの物語を好むことがある。

### Cited Findings
**文の水準の癖（専門家による編集の分類）**
- Chakrabarty, Laban, Wu「Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits」（CHI 2025、初出arXiv 2024-09）。作家18人がGPT-4o・Claude-3.5-Sonnet・Llama-3.1-70Bの段落1,057個に8,035件の編集を加えた（1段落あたり約8件）。編集の分類は7つ: 決まり文句（Cliché）、不要・重複した説明（Unnecessary/Redundant Exposition）、装飾過多（Purple Prose）、文構造の悪さ、具体性・細部の欠如、ぎこちない語・言い回し、時制の不一致 — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)
- 同論文の頻度: ぎこちない語・言い回し28%、文構造20%、不要な説明18%、決まり文句17%。3モデル間で品質の有意差なし。フィクションはノンフィクションより品質点が低い（平均4.5対約5.0〜5.2） — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)
- 同論文: 3モデルが同じ珍しい語句（"weight of"、"sense of"、"mix of"、"unspoken"）を共有していた。著者は、指示チューニングのデータが重なっているか、別モデルの合成データで学習したためと推測 — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)
- 同論文: 生成時のプロンプトで「決まり文句と装飾的な言葉を避けよ」と指示していたのに、出力には同じ問題が残った — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)

**物語の水準の弱点**
- Tian ほか「Are Large Language Models Capable of Generating Human-Level Narratives?」（EMNLP 2024、旧）。人間の物語はサスペンスがあり、気持ちを動かし、構造が多様だが、LLMの物語は「一様に明るく、緊張がない」。LLMは(1)一様に幸せで単純な物語の弧をとり、(2)転換点を早く置き、(3)挫折が少なくサスペンスが弱い。大きな挫折とクライマックスを十分に展開できない — [ACL Anthology 2024.emnlp-main.978](https://aclanthology.org/2024.emnlp-main.978) / [arXiv 2407.13248](https://arxiv.org/abs/2407.13248)
- Russell, Rajendhran, Pham, Iyyer, Wieting「StoryScope: Investigating idiosyncrasies in AI fiction」（プレプリント、2026-04初出、2026-08改訂）。10,272個のお題に人間と5つのLLMが答えた約5,000語の物語61,608本から304個の物語上の特徴を抽出。AIの物語は「主題を説明しすぎ」、整った単線の筋を好む。人間の物語は主人公の選択を道徳的に曖昧に描き、時間の構成が複雑。文体を使わず物語の特徴だけで人間かAIかを93.2%（macro-F1）で判別でき、6者の書き手の判別は68.4% — [arXiv 2604.03136](https://arxiv.org/abs/2604.03136)
- 同論文のモデルごとの癖: Claudeは出来事の段階的な高まりが平坦、GPTは夢の場面に寄る、Geminiは人物を外見で描写しがち。AIの物語は物語空間の同じ領域に固まり、人間の物語のほうが多様 — [arXiv 2604.03136](https://arxiv.org/abs/2604.03136)
- Chakrabarty ほか「Art or Artifice? Large Language Models and the False Promise of Creativity」（CHI 2024、旧）。創作の専門家が14項目の二値テスト（TTCW: 流暢さ・柔軟さ・独創性・精緻さ）で48本を評価。LLMの物語が通過したテストはプロの作家の3〜10分の1（ChatGPT 9%〜Claude 30%）。評価役のLLMは専門家の判定と正の相関を示さなかった — [arXiv 2309.14556](https://arxiv.org/abs/2309.14556) / [GitHub salesforce/creativity_eval](https://github.com/salesforce/creativity_eval)
- Marco, Gonzalo, del Castillo, Mateo Girona「Pron vs Prompt」（EMNLP 2024、旧）。GPT-4 Turboと作家パトリシオ・プロンが同じ題で短編を書き、批評家が5,400件の評価で全ての品質の軸でプロンを選んだ。GPT-4はプロンが考えた珍しい題で書くと点が上がった（題＝発想の起点が品質を左右）。GPT-4は英語のほうがスペイン語より良かった — [ACL Anthology 2024.emnlp-main.1096](https://aclanthology.org/2024.emnlp-main.1096) / [arXiv 2407.01119](https://arxiv.org/abs/2407.01119)
- Ippolito, Yuan, Coenen, Burnam「Creative Writing with an AI-Powered Writing Assistant: Perspectives from Professional Writers」（2022、旧、LaMDA）。プロの作家13人がWordcraftで執筆。物語の一貫性のなさ、個性のない退屈な提案が障害と報告（二次資料The Decoderの要約による） — [arXiv 2211.05030](https://arxiv.org/abs/2211.05030) / [The Decoder](https://the-decoder.com/ai-language-tools-for-professional-writers-how-useful-are-they/)
- Subbiah ほか「Reading Subtext」（TACL 2024、旧）。作家が自作の未発表短編についてLLMの要約を評価。半数以上で忠実さの誤りがあり、難しい行間（サブテキスト）の解釈に失敗。LLMは書くだけでなく、行間を読むこと自体が弱い — [arXiv 2403.01061](https://arxiv.org/html/2403.01061v3)

**均質化（出力どうしが似る）**
- Doshi & Hauser「Generative AI enhances individual creativity but reduces the collective diversity of novel content」（Science Advances 10(28) eadn5290, 2024、旧）。LLMの発想を使った書き手の短編は、より創造的・よく書けている・楽しいと評価された（創造性の低い書き手ほど伸びた）が、AIの助けを得た物語どうしは人間だけの物語より似ていた — [PMC11244532](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532) / [arXiv 2312.00506](https://arxiv.org/abs/2312.00506v2)
- Xu ほか（PNAS 2025）: LLMの短編は世代・モデルをまたいで同じ筋の要素の組み合わせを繰り返し、人間の物語のほうが独自性が高い（検索結果の要約による。本文未取得） — [PMC12415252](https://pmc.ncbi.nlm.nih.gov/articles/PMC12415252)
- 「Do Large Language Models Always Tell The Same Stories?」（プレプリント、2026）: 10個のLLMとr/WritingPromptsの人間の物語を比較。LLMの物語どうしは一貫して人間どうしより似ており、最先端のモデルほど「平均的な物語」に収束する（検索結果の要約による） — [arXiv 2606.17350](https://arxiv.org/pdf/2606.17350)
- Ismayilzada ほか「Evaluating Creative Short Story Generation in Humans and Large Language Models」（ICCC 2025）: LLM 60個と人間60人を比較。LLMの物語は文体は複雑だが新規性・驚き・多様性で平均的な人間に劣る。一方で、LLMと非専門家はLLMの物語のほうを創造的と評価した — [arXiv 2411.02316](https://arxiv.org/html/2411.02316v4)

**均質化の原因（RLHFと好みのデータ）**
- Zhang, Yu, Chong, Sicilia, Tomz, Manning, Shi「Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity」（ICML 2026）。モード崩壊（出力が少数の典型に寄る現象）の主因を、人間が見慣れた文を好む「典型性バイアス」が好みのデータに入っていることとする。報酬モデルと最適化が完璧でも起こりうる — [arXiv 2510.01171](https://arxiv.org/abs/2510.01171) / [PMLR v306](https://proceedings.mlr.press/v306/zhang26hy.html)
- Juzek & Ward（arXiv 2508.01930）: RLHFの人間の好みがAI特有の語（buzzwords）を増幅すると提案。追試では英語話者の評価者がそうした語を含む出力を好んだ（Reuters Instituteの記事による） — [Reuters Institute 2025-12-09](https://reutersinstitute.politics.ox.ac.uk/news/how-ai-generated-prose-diverges-human-writing-and-why-it-matters)

**評価者による差**
- Chakrabarty, Ginsburg, Dhillon「Readers Prefer Outputs of AI Trained on Copyrighted Books over Expert Human Writers」（プレプリント、v4 2026-03）。文脈内の指示だけで作家の文体を真似させると、MFA（創作修士）の読者は文体の忠実さ・品質の両方でAIを強く嫌ったが、一般の読者は品質ではAIを好んだ — [arXiv 2510.13939](https://arxiv.org/abs/2510.13939)
- 素人の読者はAIの物語を好み、文学の専門家は人間の物語を好むという結果が混在している — [arXiv 2506.03310](https://arxiv.org/html/2506.03310v1)

### Inferences
- 依頼にある弱点のうち、決まり文句・説明過多・装飾過多・具体性の欠如は文の水準の研究（Chakrabarty 2025）で、緊張の弱さ・明るく無難な結末・主題の説明しすぎ・道徳的な単純さは物語の水準の研究（Tian 2024、StoryScope 2026）で裏づけがある。「教訓くさい（moralizing）」は、StoryScopeの「主題の説明しすぎ」と「主人公の選択が道徳的に曖昧でない」が最も近い。
- 「専門家は嫌うが素人や評価役のLLMは好む」という結果が複数あるため、評価役のLLMの点は、人間の専門家が嫌う癖を見逃す方向に偏りうる。
- モデルをまたいで同じ語句・同じ筋に寄るため、別のモデルに書き直させても均質さは消えにくい。

### Gaps
- 「人物の動機が不自然」を独立の項目として人間が評価した研究は見つからなかった（Ippolitoの「一貫性のなさ」が近いが、2022年のLaMDA）。
- 「語らせて見せない（show, don't tell）」を直接の評価項目にした人間評価の研究は見つからなかった。Chakrabarty 2025の「不要な説明」とStoryScopeの「主題の説明しすぎ」が最も近い。
- Xu ほか（PNAS 2025）と arXiv 2606.17350 は本文を読んでおらず、数値は確認していない。
- ミステリー（推理小説）に特化した人間評価の研究は今回の範囲では見つからなかった。

## 問2: 英語以外（特に日本語）での翻訳調・不自然な言い回し

### Takeaway
LLMの多言語出力に「英語なまり」や翻訳調が出ることは研究で示されつつあるが、日本語の小説生成で翻訳調を人間が評価した研究は見つからなかった。

### Cited Findings
- 「Do Large Language Models Have an English Accent? Evaluating and Improving the Naturalness of Multilingual LLMs」（arXiv 2410.15956、2024、旧）: 語彙と統語の分布でLLM出力の自然さを測る指標を提案。フランス語と中国語で英語に影響された傾向を示し、対象言語の自然さを上げる簡単な調整法も提案。日本語は対象外 — [arXiv 2410.15956](https://arxiv.org/pdf/2410.15956)
- Valentini ほか「An Investigation of Translationese in the Generations of Multilingual Large Language Models」（COLM 2026採録）: 5言語でLLMの生成文が翻訳調に似るかを分類器・言語特徴の分散分析・人手の注釈（ドイツ語・スペイン語）で調べる。検索結果の要約では「英語を含む全言語で翻訳調があり、英語以外で特に強い」とされるが、要旨ページでは数値・結論・日本語を含むかを確認できなかった — [arXiv 2608.17399](https://arxiv.org/abs/2608.17399)
- 「Lost in Literalism: How Supervised Training Shapes Translationese in LLMs」（2025）: 教師あり学習が翻訳タスクの直訳調を形作ると論じる（題と要旨のみ確認） — [arXiv 2503.04369](https://arxiv.org/html/2503.04369)
- Marco ほか（EMNLP 2024、旧）: GPT-4の短編は英語のほうがスペイン語より良かった — [arXiv 2407.01119](https://arxiv.org/abs/2407.01119)
- 日本語の生成評価: pfgen-bench（Preferred Networksほか、言語処理学会2024）は、評価役のLLMが英語の回答を高く評価し、日本語としての流暢さを十分に評価しない問題を指摘し、流暢さを軸に含むベンチマークを作った — [言語処理学会2024 D11-3](https://www.anlp.jp/proceedings/annual_meeting/2024/pdf_dir/D11-3.pdf)
- Fukuda ほか（ACL SRW 2025）: 日本語でのLLMの創造性ベンチマーク（Japanese Creativity Questions、物語の改変課題など）。翻訳調は扱っていない — [ACL Anthology 2025.acl-srw.69](https://aclanthology.org/2025.acl-srw.69)
- 日本の文学賞: 星新一賞では2026年にAIを使った応募が491作（前回の5倍超）、AIがほぼ全てを書いた作品が最終候補に残った。審査員がAI作品の弱点を具体的に講評した記述は見つからなかった — [koubo.jp](https://koubo.jp/article/85603) / [KAI-YOU](https://kai-you.net/article/91774)

### Inferences
- 学習データが英語に偏っていることから、日本語の物語でも英語の小説の決まり文句を直訳したような言い回しが出ると予想されるが、これは推測で、日本語の小説での実証は見つからなかった。

### Gaps
- 日本語のLLM生成小説で、翻訳調・不自然な言い回しを人間が評価した論文は見つからなかった（日本語・英語の両方で検索）。
- arXiv 2608.17399 の本文（日本語を含むか、数値）は未取得。

## 問3: 人間の評価で効果が示された手立て

### Takeaway
最も強い証拠があるのは、専門家の編集データや作家本人の作品で学習させる方法（癖が消え、専門家の評価が逆転する）。推論時の手立てとしては、専門家の編集から学んだ報酬モデルで「生成→編集→選別」する方法、転換点を指示するプロンプト、確率付きで複数案を出させる方法、禁止語句で戻って引き直すサンプラー、人間が編集する共作に、効果の報告がある。どの方法も専門家の水準には届いていない。

### Cited Findings
**専門家の編集・作家の作品で学習させる**
- Chakrabarty ほか（CHI 2025）: 好みの順は「作家が編集した文 ＞ LLMが編集した文 ＞ 未編集のLLMの文」で統計的に有意。LLMに自分の癖の箇所を検出させると、一般の精度は最高0.46で専門家どうしの一致0.57より低い。自己編集のプロンプトは段落以上の長さではうまくいかない（LLMは何をどこまで直すべきか分からない） — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)
- Chakrabarty, Laban, Wu「AI-Slop to AI-Polish? Aligning Language Models through Edit-Based Writing Rewards and Test-time Computation」（COLM 2025）。AIの段落と専門家の編集の組1,282個（LAMP）で文章品質の報酬モデル（WQRM）を学習。最先端のLLMは文章品質の判定でほぼ偶然の水準だった。プロの作家9人の評価で、報酬モデルが選んだ最良の編集の平均順位1.58、ランダムな編集2.09、最初の下書き2.26。報酬モデルと専門家の一致は66%（報酬の差が1点を超えると72.2%）。著者自身「癖は減るが専門家の水準にはほど遠い」 — [arXiv 2504.07532](https://arxiv.org/html/2504.07532v3)
- Chakrabarty, Ginsburg, Dhillon（プレプリント 2026）: 作家ごとの全作品でChatGPTを微調整すると評価が逆転し、MFAの読者も文体の忠実さ（OR=8.16）と品質（OR=1.87）でAIを選んだ。媒介分析では、微調整がAIの検出可能な癖（決まり文句の密度など）を消したことが逆転の原因。AI検出器に検出された率は微調整後3%、文脈内指示では97% — [arXiv 2510.13939](https://arxiv.org/abs/2510.13939)

**推論時の手立て**
- Tian ほか（EMNLP 2024、旧）: 転換点（大きな挫折・クライマックス）の情報をプロンプトに入れると、サスペンスと引き込みが素のプロンプトより約40%良くなった。物語の弧を指定するとむしろ多様性が上がった — [arXiv 2407.13248](https://arxiv.org/abs/2407.13248)
- Verbalized Sampling（ICML 2026）: 「複数の答えを確率付きで出せ」と頼む学習不要のプロンプト。創作で多様性が直接のプロンプトの1.6〜2.1倍、人間の評価点が25.7%向上（著者の報告）。能力の高いモデルほど効果が大きい — [arXiv 2510.01171](https://arxiv.org/abs/2510.01171)
- Paech, Roush, Goldfeder, Shwartz-Ziv「Antislop」（ICLR 2026）: 禁止した語句・正規表現が出たら最初のトークンまで戻って確率を下げて引き直すサンプラーと、学習時の手法（FTPO）。8,000以上のパターンを扱え（単純なトークン禁止は約2,000で破綻）、FTPOで癖の語句を90%減らし、創作の性能は維持か向上（自動評価が中心で、人間の評価の規模は未確認）。サンプラーは処理量が69〜96%落ちる — [arXiv 2510.15061](https://arxiv.org/abs/2510.15061) / [GitHub](https://github.com/sam-paech/antislop-sampler)
- Wan & Kalman（プレプリント 2025）: Doshi & Hauserの設計で、AIの筋の案をペルソナで多様にすると、AI支援の物語の集団としての多様性がAIなしと同じ水準に保たれた — [arXiv 2504.13868](https://arxiv.org/html/2504.13868v1)

**人間が関わる共作**
- Jo & Raghavan「Incentives Shape How Humans Co-Create with Generative AI」（プレプリント、2026）: 事前登録した2つのランダム化比較試験。仲間と比べた独創性で報酬を受けた参加者は、品質だけで報酬を受けた参加者より集団として多様な文を書き、AIは使い続けたがAIの文をそのまま取り込む量が減った — [arXiv 2604.03529](https://arxiv.org/abs/2604.03529)
- 同論文について、検索結果の要約では「AIに全文の下書きを書かせると物語どうしが非常に似て、参加者が編集・改稿すると多様さが人間だけの分布に近づいた」とされるが、要旨ページでは確認できなかった — [arXiv 2604.03529](https://arxiv.org/abs/2604.03529)
- Marco ほか（EMNLP 2024、旧）: 人間の作家が考えた珍しい題を与えるとGPT-4の点がほぼ全ての軸で上がった。発想の起点を人間が与えることが効く — [arXiv 2407.01119](https://arxiv.org/abs/2407.01119)

### Inferences
- 効果の大きさの順は「作家の作品・専門家の編集での学習 ＞ 専門家の編集から学んだ報酬モデルで選別 ＞ プロンプトでの工夫」に見える。プロンプトだけで使えるのは、転換点の指定、確率付きの複数案、人間が与える珍しい起点、禁止語句での引き直しなど。
- 「LLMに自分で直させる」は、何を直すかの知識が無いと効きにくい（Chakrabarty 2025）。直させるなら、専門家の編集の分類（不要な説明、決まり文句など）のように直す種類を具体的に渡すのが筋（推論）。

### Gaps
- 否定例（悪い例）をプロンプトに示す方法の効果を、人間の評価で単独に測った研究は見つからなかった。
- 「説明過多を取り除く」介入を単独で人間評価した研究は見つからなかった（Chakrabarty 2025の編集の一部として含まれる）。
- Antislopの人間による評価の有無・規模は要旨からは確認できなかった。

## 問4: プロンプトに規則・制約を足すと創作の質は上がるか下がるか

### Takeaway
制約の数そのものを変えて人間が質を評価した研究は見つからなかった。間接的な証拠では、「〜を避けよ」という規則は守られず、制約を増やすと一貫性が崩れる一方、筋の中身（人間が書いた詳しい内容や転換点）を与えると質は上がる。規則と中身で効果が逆になると読むのが妥当。

### Cited Findings
- Chakrabarty ほか（CHI 2025）: 決まり文句と装飾過多を避けるよう指示しても、出力に同じ問題が残った — [arXiv 2409.14509v5](https://arxiv.org/html/2409.14509v5)
- CS4（Atmakuru ほか、arXiv 2410.04197、2024、旧）: 最大39個の制約を持つお題で創造性を測る。制約を増やすと学習データの物語を写しにくくなるが、物語が支離滅裂になりやすい — [arXiv 2410.04197](https://arxiv.org/html/2410.04197v1)
- AI-Slop to AI-Polish（COLM 2025）: 最小限のお題と詳しい内容のお題を比べると、新しいモデル（GPT-4.5、Claude 3.7-Sonnet、Gemini-2.5-pro）は詳しい内容のお題で品質が上がった（中央値約7.0）。ただしMFAの学生（中央値8.6）には全モデルが届かず、ばらつきも大きい。ここでの「詳しい」は筋の内容の詳しさで、文体の規則ではない — [arXiv 2504.07532](https://arxiv.org/html/2504.07532v3)
- Tian ほか（EMNLP 2024、旧）: 転換点という構造の情報を足すとサスペンスと引き込みが約40%向上 — [arXiv 2407.13248](https://arxiv.org/abs/2407.13248)
- EMNLP 2025 Findingsの物語生成の論文: 型の厳しいモジュールで組むパイプラインは創造性と多様性を制限しうると述べる（検索結果の要約による） — [ACL Anthology 2025.findings-emnlp.750](https://aclanthology.org/2025.findings-emnlp.750.pdf)
- 評価役の側: 物語の評価で、プロンプトを複雑にしても人間との一致は上がらなかったという報告がある（サーベイ経由の二次情報） — [arXiv 2602.15851](https://arxiv.org/pdf/2602.15851)

### Inferences
- 規則を足すより、(1)筋の中身（転換点、意外な起点）を与える、(2)癖は生成後に別の工程（編集・選別・禁止語句での引き直し）で取る、のほうが証拠に沿う。
- 規則の列を増やすと、CS4の結果のように一貫性が落ちる方向と、論理の条件を満たすことに筆が割かれる方向の両方が考えられる（推論）。

### Gaps
- 規則の数（例: 文体ガイドの行数）を変えて人間が創作の質を評価した対照実験は見つからなかった。
- 規則が多いと人物の自然さや引き込みが落ちるかを直接測った研究は見つからなかった。
