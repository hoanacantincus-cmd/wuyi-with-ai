export const aiCodingBasicsTopics = [
  {
    id: "model-choice",
    no: "01",
    title: "大语言模型：先理解，再比较",
    art: "模型入门",
    hook: "这块只讲三件事：大语言模型是什么、普通人怎么训练自己的模型、怎么用最低成本选到合适模型。",
    detail:
      "大语言模型不是一个 App，而是一套会根据上下文预测、生成和推理的模型能力。普通用户先别急着背排名，先理解它怎么被训练出来、能解决什么问题、不同模型为什么表现不同，再看自己到底是要调用现成模型、微调模型，还是只需要做知识库和提示词工程。",
    keyQuestion: "我现在是在理解模型、训练模型，还是要选一个最划算的模型来完成任务？",
    practicalOutcome:
      "读完这一页，可以理解大语言模型的基本原理、训练路径和性价比判断方法，也会知道火山引擎方舟控制台里单模型每日 200 万 token 免费额度这类活动权益需要以实际控制台规则为准。",
    sections: [
      {
        title: "大语言模型是什么意思",
        body:
          "它先在海量文本、代码和多模态数据上做预训练，学会语言规律、知识关联和任务模式；再通过指令微调、人工反馈或偏好优化，变得更会按人的要求回答。它能写作、总结、翻译、写代码、做客服、读文档、规划流程，但不同模型在中文、代码、长上下文、速度、价格、多模态上差异很大。",
      },
      {
        title: "我们怎么训练模型",
        body:
          "普通人通常不从零训练千亿参数模型，而是三条路：准备高质量问答数据做微调；把自己的资料接成知识库/RAG；用提示词、工作流和评测集训练使用方法。真正要训练前，先整理数据、清洗隐私、定义评测题，再决定用火山方舟、ModelScope、Hugging Face 还是本地开源模型。",
      },
      {
        title: "模型性价比怎么判断",
        body:
          "看三项：效果够不够、响应快不快、价格和免费额度能不能覆盖日常用量。火山引擎方舟这类国内平台经常适合新手试 API：重点看控制台是否有单模型每日 200 万 token 免费额度、并发限制、有效期和超额计费，别只看模型名。",
      },
    ],
    checklist: ["先分清预训练、微调、RAG", "训练前先做评测题", "优先用免费额度试 API", "重要活动权益以控制台为准"],
    links: [
      ["火山方舟", "https://console.volcengine.com/ark"],
      ["豆包大模型", "https://www.volcengine.com/product/doubao"],
      ["ModelScope", "https://modelscope.cn/"],
      ["Hugging Face Learn", "https://huggingface.co/learn"],
    ],
    hidePrompts: true,
    questionPrinciples: [
      {
        title: "先说目标和验收标准",
        body:
          "不要只问“帮我写一下”。先告诉模型你要完成什么、给谁看、什么算成功。Anthropic 的公开文档把定义成功标准和可测试的评估方式放在提示工程之前。",
        tip: "问法：我的目标是……成功标准是……请按这些标准给方案。",
      },
      {
        title: "给上下文，不让模型猜",
        body:
          "把背景、资料、限制、角色和已有结论放进问题里。OpenAI 和 Google 的提示指南都强调清晰指令、参考资料和任务边界能减少泛泛回答。",
        tip: "资料很长时，先要求模型只基于资料回答，再让它标出依据。",
      },
      {
        title: "复杂任务拆成步骤",
        body:
          "Google Gemini 文档建议把复杂提示拆成组件：分解指令、串联多步提示、并行处理后汇总。新手不要一次要求模型完成调研、方案、文案和执行。",
        tip: "顺序：先分析问题 -> 再列方案 -> 再输出最终文本。",
      },
      {
        title: "给例子和输出格式",
        body:
          "大模型更擅长模仿清晰样例。给一个好答案样例、表格字段或项目符号格式，比只说“专业一点”“详细一点”更稳定。",
        tip: "要求：用表格输出，列包括：结论、依据、风险、下一步。",
      },
      {
        title: "让模型先问缺失信息",
        body:
          "当信息不全时，不要逼模型硬答。让它先列出还缺什么，再给基于现有信息的暂定判断，可以减少幻觉和误判。",
        tip: "问法：如果信息不足，先问我最多 3 个关键问题。",
      },
      {
        title: "检查事实和来源",
        body:
          "涉及价格、政策、排行榜、安装命令等会变化的信息，要求模型给来源和日期。高风险内容要让模型区分“确定”“推测”“需要验证”。",
        tip: "问法：请标注哪些结论来自来源，哪些只是推断。",
      },
    ],
    prompts: [
      {
        title: "用免费额度做模型选择",
        desc: "复制给 AI，让它帮你按任务、成本和火山方舟免费额度规划模型试用。",
        body: `你是我的 AI 模型选择顾问。请基于我的任务，帮我选择适合的新手模型试用方案。

我的任务：
1. 我要做的事：
2. 输入内容类型：文字 / 图片 / 文档 / 代码 / 数据
3. 每天大概调用次数：
4. 是否必须中文效果好：
5. 是否需要 API：

请按下面格式输出：
- 推荐模型 1：适合什么任务，为什么
- 推荐模型 2：适合什么任务，为什么
- 免费额度使用建议：优先在火山方舟管理控制台查看“单日单模型 200w tokens”这类权益，说明如何避免超额
- 第一次测试用的 3 个问题
- 如何判断这个模型是否够用
- 不建议我现在做的事`,
      },
    ],
    tint: "from-cyan-200 via-blue-200 to-white",
  },
  {
    id: "domestic-route",
    no: "02",
    title: "无魔法路线：国产 AI 编程怎么开始",
    art: "无魔法路线",
    hook: "不折腾网络环境，先用国内能下载、能登录、能读项目的 AI 编程应用，把一次小修改完整跑通。",
    detail:
      "无魔法路线的目标不是证明哪个工具最强，而是让新手今天就能开始。先安装国产 AI IDE 或插件，打开一个能运行的小项目，让 AI 解释项目结构，再让它完成一个可验证的小任务。稳定可用比炫技更重要。",
    keyQuestion: "我能不能在国内网络环境下安装工具、登录账号、打开项目，并完成一次可验证的小修改？",
    practicalOutcome: "你会拿到一条不用复杂网络条件也能开始 AI 编程的下载和使用路线。",
    sections: [
      {
        title: "Trae：先装桌面 AI IDE",
        body:
          "Trae 官网提供 Windows 和 macOS 桌面版本。新手第一次打开本地项目时，适合先让 AI 解释入口文件、启动命令、页面目录和可安全修改的位置，再进入具体改动。",
      },
      {
        title: "通义灵码 / MarsCode：适合中文新手",
        body:
          "如果你已经用 VS Code 或 JetBrains，就装通义灵码插件；如果想直接用云端/桌面编程环境，可以试 MarsCode。第一周只练三件事：解释代码、生成小函数、根据报错修复。",
      },
      {
        title: "标准练习流程",
        body:
          "一条稳妥练习线是：安装工具 -> 打开示例项目 -> 让 AI 读项目 -> 指定一个小改动 -> 运行验证 -> 根据报错继续修复 -> 复盘改动文件。每次任务越小，越容易判断 AI 是否真的做对。",
      },
    ],
    checklist: ["只从官网下载安装", "先打开可运行项目", "一次只改一个小功能", "必须运行或截图验证"],
    links: [
      ["Trae", "https://www.trae.ai/"],
      ["通义灵码", "https://lingma.aliyun.com/"],
      ["MarsCode", "https://www.marscode.cn/"],
      ["腾讯云 AI 代码助手", "https://cloud.tencent.com/product/acc"],
      ["B站：Trae AI 编程教程", "https://search.bilibili.com/all?keyword=Trae%20AI%E7%BC%96%E7%A8%8B%E6%95%99%E7%A8%8B"],
      ["B站：通义灵码教程", "https://search.bilibili.com/all?keyword=%E9%80%9A%E4%B9%89%E7%81%B5%E7%A0%81%20AI%E7%BC%96%E7%A8%8B%E6%95%99%E7%A8%8B"],
      ["B站：MarsCode 教程", "https://search.bilibili.com/all?keyword=MarsCode%20AI%E7%BC%96%E7%A8%8B%E6%95%99%E7%A8%8B"],
      ["抖音：国产 AI 编程", "https://www.douyin.com/search/%E5%9B%BD%E4%BA%A7%20AI%20%E7%BC%96%E7%A8%8B%20%E6%95%99%E7%A8%8B"],
    ],
    prompts: [
      {
        title: "国产 AI 编程第一次上手",
        desc: "适合复制到 Trae、通义灵码、MarsCode，让 AI 先读项目再做小改动。",
        body: `你是我的 AI 编程入门教练。我是新手，不要一次性大改项目。

请按下面流程带我完成第一次 AI 编程：
1. 先解释这个项目的目录结构，用大白话说明每个主要文件夹是干什么的。
2. 找到启动命令、入口文件、页面文件、样式文件。
3. 只选择一个最小可验证改动，例如：改一个按钮文案、改一段页面说明、加一个小卡片。
4. 在动手前先告诉我：准备改哪些文件、为什么改这些文件、风险是什么。
5. 改完后告诉我如何运行验证。
6. 如果报错，先解释报错含义，再给最小修复方案。
7. 最后总结：改了哪些文件、我学到了什么、下一次可以练什么。

限制：
- 不要改无关文件。
- 不要安装新依赖，除非先说明必要性。
- 不要删除已有功能。
- 每次只做一个小目标。`,
      },
      {
        title: "让 AI 解释报错",
        desc: "把报错贴进去，让 AI 用新手能听懂的话定位问题。",
        body: `你是我的报错解释器。请用新手能听懂的话帮我分析下面的报错。

报错内容：
【把报错粘贴在这里】

请输出：
1. 这个报错大概是什么意思
2. 最可能出问题的文件或位置
3. 我应该先检查哪 3 件事
4. 最小修复方案
5. 修复后怎么验证

要求：
- 不要直接给一堆代码。
- 先解释原因，再给修复。
- 如果信息不够，请告诉我还需要贴什么。`,
      },
    ],
    tint: "from-emerald-200 via-cyan-200 to-white",
  },
  {
    id: "task-agents",
    no: "03",
    title: "AI工具：按任务选择国内热门工具",
    art: "AI工具",
    hook: "不是所有事都要写代码。问答、搜索、Agent、图片、视频、PPT、转写和模型平台，先按任务选择合适的国内 AI 工具。",
    detail:
      "AI工具适合普通用户快速交付。这一版按 AICPB 2026-05-09 更新的中国 AI 月榜和各垂类榜单重做：头部产品看豆包、DeepSeek、千问、夸克、腾讯元宝；搜索和 Agent 看纳米AI、百度 AI 搜索、秘塔；内容创作看即梦、可灵、MiniMax/海螺、AiPPT、讯飞听见。先确定交付物，再选择工具，而不是把所有需求都丢给聊天窗口。",
    keyQuestion: "我是在开发软件，还是只想把一个具体任务完成并交付？",
    practicalOutcome: "AI 工具不是炫技入口，而是把资料检索、初稿生成、内容制作、会议整理和重复办公变成更快、更稳的交付流程。",
    impactHighlights: [
      {
        label: "工作效率",
        value: "+14%",
        body:
          "NBER 真实客服场景研究中，AI 助手让每小时解决问题数平均提升，适合客服、资料问答和标准流程处理。",
      },
      {
        label: "产出速度",
        value: "+66%",
        body:
          "NN/g 汇总客服、商业写作、编程三类实验后显示，生成式 AI 能明显提高真实业务任务吞吐。",
      },
      {
        label: "学习曲线",
        value: "2个月",
        body:
          "新人用 AI 辅助两个月，表现接近未用 AI 员工六个月以上经验水平，适合小白快速补齐方法。",
      },
      {
        label: "生活减负",
        value: "60-70%",
        body:
          "麦肯锡估算 AI 有潜力覆盖大量日常工作活动，把时间让给判断、创意、沟通和复核。",
      },
    ],
    sections: [],
    checklist: ["只收录中国公司或国内产品", "优先看 2026-05-09 公开榜单", "先定义交付物", "内容类保留来源和授权"],
    links: [
      ["AICPB China AI Rankings", "https://www.aicpb.com/ai-rankings/products/china-ai-rankings"],
      ["AICPB AI Search Rankings", "https://www.aicpb.com/ai-rankings/products/ai-search-rankings"],
      ["AICPB AI Agent Rankings", "https://www.aicpb.com/ai-rankings/products/ai-agent-rankings"],
      ["AICPB AI Video Rankings", "https://www.aicpb.com/ai-rankings/products/ai-video-generators-rankings"],
      ["AICPB AI PPT Rankings", "https://www.aicpb.com/ai-rankings/products/ai-ppt-rankings"],
      ["即梦 AI", "https://jimeng.jianying.com/"],
      ["可灵 AI", "https://klingai.kuaishou.com/"],
      ["腾讯元宝", "https://yuanbao.tencent.com/"],
      ["纳米 AI", "https://www.n.cn/"],
    ],
    hidePrompts: true,
    toolRankings: [
      {
        category: "通用聊天 / 搜索问答",
        name: "豆包",
        company: "字节跳动",
        href: "https://www.doubao.com/",
        reason:
          "国内普通用户覆盖最广的通用 AI 助手之一，适合中文问答、写作、图片理解、学习陪练和日常搜索。",
        signal: "AICPB 2026-05-09：中国 AI App MAU #1，336.04M",
      },
      {
        category: "模型问答 / 推理",
        name: "DeepSeek",
        company: "深度求索",
        href: "https://chat.deepseek.com/",
        reason:
          "国内推理、代码解释和长文本分析的代表入口。适合复杂问题拆解、学习陪练、代码解释和低成本模型体验。",
        signal: "AICPB 2026-05-09：中国 AI 网站 #1，486.50M visits；App #4",
      },
      {
        category: "办公学习",
        name: "千问",
        company: "阿里巴巴",
        href: "https://www.qianwen.com/",
        reason:
          "阿里官方 AI 助手入口，适合办公写作、学习问答、资料整理和从网页助手过渡到 Qwen / 阿里云模型生态。",
        signal: "AICPB 2026-05-09：中国 AI App MAU #2，220.35M；网站 #4",
      },
      {
        category: "搜索 / 学习 / 浏览器",
        name: "夸克",
        company: "阿里巴巴",
        href: "https://www.quark.cn/",
        reason:
          "面向大众搜索、学习、扫描、网盘和 AI 助手的一体化入口，适合不想从纯聊天框开始的新手。",
        signal: "AICPB 2026-05-09：中国 AI App MAU #3，162.30M",
      },
      {
        category: "微信生态",
        name: "腾讯元宝",
        company: "腾讯",
        href: "https://yuanbao.tencent.com/",
        reason:
          "接入腾讯生态和 DeepSeek 后，在资料阅读、长文精读、图片理解和微信/QQ 用户心智里更容易被国内用户使用。",
        signal: "AICPB 2026-05-09：中国 AI App MAU #5，111.13M；网站 #10",
      },
      {
        category: "Agent / 多步任务",
        name: "纳米AI",
        company: "360",
        href: "https://www.n.cn/",
        reason:
          "国内 Agent / AI 搜索入口里访问量最靠前的产品之一，适合搜索、资料整理、多智能体问答和任务拆解。",
        signal: "AICPB 2026-05-09：AI Agent 网站 #1，168.43M；中国 AI 网站 #2",
      },
      {
        category: "图片 / 视频创作",
        name: "即梦AI",
        company: "字节跳动 / 剪映生态",
        href: "https://jimeng.jianying.com/",
        reason:
          "国内图像和视频创作常用入口，和剪映生态连接紧，适合短视频封面、分镜、图片生成和图生视频。",
        signal: "AICPB 2026-05-09：中国 AI App 增长 #1，92.49M，MoM +15.70%；图片生成网站 #4",
      },
      {
        category: "视频生成",
        name: "可灵 Kling",
        company: "快手",
        href: "https://klingai.kuaishou.com/",
        reason:
          "国内视频生成代表工具之一，适合文生视频、图生视频、镜头测试和短片分镜验证。",
        signal: "AICPB 2026-05-09：中国 AI App 增长 #2，7.85M，MoM +6.78%；视频生成网站 #3",
      },
      {
        category: "视频生成 / Agent",
        name: "MiniMax / 海螺 AI",
        company: "MiniMax",
        href: "https://hailuoai.video/",
        reason:
          "国内多模态和视频生成代表团队之一，适合视频生成、角色对话、通用 Agent 和创意内容测试。",
        signal: "AICPB 2026-05-09：中国 AI App 增长 #3，3.93M；视频生成网站 #10",
      },
      {
        category: "AI 搜索",
        name: "百度 AI 搜索",
        company: "百度",
        href: "https://chat.baidu.com/",
        reason:
          "国内搜索场景的 AI 化入口，适合新闻、资料、网页结果整合和搜索增强问答。",
        signal: "AICPB 2026-05-09：AI Search 网站 #4，32.68M",
      },
      {
        category: "AI 搜索 / 研究",
        name: "秘塔AI搜索",
        company: "秘塔科技",
        href: "https://metaso.cn/",
        reason:
          "适合中文资料搜索、论文/网页聚合和带来源的研究型问答，是国内 AI 搜索的常见替代入口。",
        signal: "AICPB 2026-05-09：AI Search 网站 #7；中国 AI App 增长 #8",
      },
      {
        category: "PPT / 演示文稿",
        name: "AiPPT",
        company: "像素绽放",
        href: "https://www.aippt.com/",
        reason:
          "国内 AI PPT 垂类里排名靠前，适合把提纲、文章或主题快速生成演示文稿。",
        signal: "AICPB 2026-05-09：AI PPT 网站 #4，7.48M；中文站 #6",
      },
      {
        category: "录音转写 / 会议",
        name: "讯飞听见",
        company: "科大讯飞",
        href: "https://www.iflyrec.com/",
        reason:
          "国内会议纪要、录音转文字、实时翻译和采访整理的高认知度工具，适合办公和内容生产。",
        signal: "AICPB 2026-05-09：中国 AI App 增长 #10，3.68M",
      },
      {
        category: "开发者 / 模型平台",
        name: "阿里云 / 腾讯云 / 火山引擎",
        company: "阿里 / 腾讯 / 字节",
        href: "https://www.volcengine.com/product/ark",
        reason:
          "面向开发者和企业的国内模型/API 平台，新手从工具使用升级到自动化、工作流和产品化时会用到。",
        signal: "AICPB 2026-05-09：AI Cloud 网站 #1 阿里云、#2 腾讯云、#3 火山引擎",
      },
    ],
    prompts: [
      {
        title: "任务工具选择器",
        desc: "适合复制给 AI，让它判断该用 Coze、Dify、Lovart、剪映还是代码。",
        body: `你是我的 AI 任务工具选择顾问。请不要默认让我写代码，先判断最省事的交付路径。

我的任务：
1. 我想交付的结果：
2. 使用对象：自己 / 客户 / 粉丝 / 公司内部
3. 是否需要长期重复：
4. 是否需要接入知识库或文件：
5. 是否需要发布到公众号、抖音、网页或小程序：

请输出：
- 最推荐工具：Coze / Dify / Lovart / 即梦 / 剪映 / 代码开发 / 其他
- 为什么选它
- 需要准备的输入材料
- 第一步怎么做
- 什么时候应该升级成自动化流程
- 什么时候才需要写代码`,
      },
    ],
    tint: "from-fuchsia-200 via-violet-200 to-white",
  },
  {
    id: "terminal-agents",
    no: "04",
    title: "AI 变现：先看赚钱公司，再选国内打法",
    art: "AI 变现",
    hook: "别从“卖课”开始，先看真正收钱的 AI 产品：订阅、API、企业席位、内容工具和自动化交付。",
    detail:
      "这一页把原来的 Claude Code 终端编程模块换成 AI 变现。左列放公开报道中收入、ARR 或商业化信号较强的 AI 初创公司；右列放更适合国内普通人、小团队和服务商落地的赚钱方法。重点不是追热点，而是找到愿意付钱的场景、可复用的交付流程和能持续收费的产品入口。",
    keyQuestion: "我现在能不能找到一个明确付费人群，把 AI 能力包装成可交付、可复购、可报价的服务或小产品？",
    practicalOutcome:
      "读完这一页，你会知道高营收 AI 公司通常靠什么收钱，也能从国内内容、电商、私域、企业自动化和培训陪跑里挑一条更现实的起步路线。",
    sections: [
      {
        title: "先看收入，不只看估值",
        body:
          "AI 公司融资和估值很热，但真正值得学习的是收入结构：个人订阅、团队席位、API 用量、企业合同、内容工具会员、模板市场和专业服务。普通人做 AI 变现，也要先问客户到底愿意为什么结果付钱。",
      },
      {
        title: "国内起步要找高频刚需",
        body:
          "国内更容易落地的场景通常不是“做一个通用 ChatGPT”，而是帮商家出图出视频、帮销售做私域跟进、帮老板整理资料报表、帮团队做客服知识库、帮内容账号稳定生产选题和脚本。",
      },
      {
        title: "方法论：先服务化，再产品化",
        body:
          "新手不要一开始就做大 SaaS。先用 AI 帮 3 个真实客户交付，沉淀模板、提示词、流程、报价和复盘；当交付步骤稳定后，再做成表单、自动化工作流、知识库或会员工具。",
      },
    ],
    checklist: ["找真实付费场景", "先卖结果不卖概念", "交付流程模板化", "能复购再产品化"],
    links: [
      ["Axios：OpenAI / Anthropic 年化收入", "https://www.axios.com/2026/04/13/anthropic-revenue-growth-ai"],
      ["Axios：Anthropic 收入增速", "https://www.axios.com/2026/04/13/anthropic-revenue-growth-ai"],
      ["TechCrunch：Cursor ARR", "https://techcrunch.com/2025/06/05/cursors-anysphere-nabs-9-9b-valuation-soars-past-500m-arr/"],
      ["Economic Times：Perplexity 收入", "https://m.economictimes.com/tech/artificial-intelligence/perplexity-ceo-says-revenue-hit-500-million-after-computer-pivot/articleshow/130251436.cms"],
      ["Economic Times：ElevenLabs ARR", "https://m.economictimes.com/tech/funding/voice-ai-firm-elevenlabs-tops-500-million-arr-announces-additional-funding/articleshow/130833329.cms"],
      ["WSJ：MiniMax 财务表现", "https://www.wsj.com/finance/stocks/chinese-ai-firm-minimax-more-than-doubles-revenue-in-first-post-ipo-results-64498f3d"],
    ],
    monetizationColumns: {
      leftTitle: "国内外高收入 AI 初创公司",
      leftNote:
        "私营公司收入多来自公开报道、融资材料或管理层口径，不等同审计财报；这里看的是“它们靠什么收钱”。",
      companies: [
        {
          name: "OpenAI",
          region: "美国 / 基础模型",
          metric: "Axios 文中引用 OpenAI 年化收入约 250 亿美元",
          model: "ChatGPT 订阅、企业版、API、模型授权和开发者生态，是“模型能力 + 应用入口 + 企业合同”的组合。",
          signal: "2026-04 Axios annualized revenue comparison",
          href: "https://www.axios.com/2026/04/13/anthropic-revenue-growth-ai",
        },
        {
          name: "Anthropic",
          region: "美国 / 企业模型",
          metric: "Axios 称 2026 年 4 月年化收入 run-rate 达 300 亿美元",
          model: "Claude 订阅、API 和企业大客户是核心，强项是企业合规、代码、知识工作和高客单价合同。",
          signal: "2026-04 Axios annualized revenue",
          href: "https://www.axios.com/2026/04/13/anthropic-revenue-growth-ai",
        },
        {
          name: "Cursor / Anysphere",
          region: "美国 / AI 编程",
          metric: "TechCrunch 报道 2025 年 6 月 ARR 超 5 亿美元",
          model: "把 AI 编程能力塞进 IDE，用个人 Pro、团队席位、企业安全和增值工具收费。",
          signal: "2025-06 TechCrunch ARR",
          href: "https://techcrunch.com/2025/06/05/cursors-anysphere-nabs-9-9b-valuation-soars-past-500m-arr/",
        },
        {
          name: "Perplexity",
          region: "美国 / AI 搜索",
          metric: "报道称 CEO 称收入在产品转向后达到 5 亿美元",
          model: "用 AI 搜索入口聚合订阅、企业知识检索、广告/商业入口和高频查询流量。",
          signal: "2026-04 Economic Times revenue note",
          href: "https://m.economictimes.com/tech/artificial-intelligence/perplexity-ceo-says-revenue-hit-500-million-after-computer-pivot/articleshow/130251436.cms",
        },
        {
          name: "ElevenLabs",
          region: "英国/美国 / AI 语音",
          metric: "报道称 2026 年 ARR 超 5 亿美元",
          model: "语音合成、配音、音频 Agent、API 和企业授权，把“声音生产”做成可计费能力。",
          signal: "2026-05 Economic Times ARR",
          href: "https://m.economictimes.com/tech/funding/voice-ai-firm-elevenlabs-tops-500-million-arr-announces-additional-funding/articleshow/130833329.cms",
        },
        {
          name: "MiniMax",
          region: "中国 / 多模态应用",
          metric: "WSJ 报道 2025 年收入约 7900 万美元，70%+ 来自海外",
          model: "Hailuo 视频、Talkie/星野陪伴、语音和模型平台，路径是“模型 + 消费应用 + 出海”。",
          signal: "2026-03 WSJ post-IPO results",
          href: "https://www.wsj.com/finance/stocks/chinese-ai-firm-minimax-more-than-doubles-revenue-in-first-post-ipo-results-64498f3d",
        },
      ],
      rightTitle: "国内 AI 业务赚钱方法论",
      rightNote:
        "这些打法不是承诺收益，而是把 AI 能力转成客户能理解的结果、报价和交付节奏。先小单验证，再做复购。",
      methods: [
        {
          title: "电商素材工厂",
          price: "按套 / 月包",
          fit: "适合淘宝、抖店、小红书、跨境卖家：商品图、卖点文案、短视频脚本、详情页和投放素材都需要持续更新。",
          action: "先做 10 个 SKU 样板，报价时卖“每周更新多少套素材”，不要只卖一张图。",
        },
        {
          title: "短视频账号代运营增强版",
          price: "服务费 + 绩效",
          fit: "用 AI 做选题库、爆款拆解、口播稿、分镜、封面和剪辑初稿，人负责判断、拍摄和发布节奏。",
          action: "把交付物固定成选题表、脚本、封面、发布时间和复盘表，客户才知道钱花在哪。",
        },
        {
          title: "私域销售助手",
          price: "项目费 + 维护费",
          fit: "适合教育、门店、本地生活、ToB 销售：用知识库和话术库帮销售快速回复、跟进线索、整理客户问题。",
          action: "先从 100 条真实聊天记录提炼 FAQ 和话术，再做飞书/企微/表单入口。",
        },
        {
          title: "企业资料知识库",
          price: "部署费 + 席位",
          fit: "适合有大量 PDF、制度、产品手册、合同模板的公司，痛点是新人问答、客服检索和内部资料难找。",
          action: "先做一个只读问答库，要求每个答案带来源；稳定后再接审批、工单或 CRM。",
        },
        {
          title: "老板报表和竞品情报",
          price: "周报 / 月报",
          fit: "很多小企业不缺工具，缺的是有人每周把数据、竞品、舆情、爆品和行动建议整理成能看的报告。",
          action: "从一个垂直行业开始，交付固定字段：市场变化、竞品动作、机会清单、下周动作。",
        },
        {
          title: "AI 培训加陪跑",
          price: "课费 + 项目费",
          fit: "培训最容易空泛，真正能收钱的是带学员做出一个可用成果：店铺素材库、客服知识库、自动化表格或内容流程。",
          action: "课程只讲 20%，80% 用来做学员自己的项目；最后交付模板和复盘，而不是只发提示词。",
        },
      ],
    },
    prompts: [
      {
        title: "AI 变现选题诊断",
        desc: "复制给 AI，让它帮你判断一个 AI 赚钱想法是否值得做。",
        body: `你是我的 AI 商业化顾问。请帮我判断下面这个 AI 变现想法是否值得做。

我的想法：
【写下人群、场景、想卖的服务或产品】

请按下面结构输出：
1. 目标客户是谁，是否有明确付费能力
2. 客户现在不用 AI 时怎么解决，成本是多少
3. AI 能减少什么成本、提高什么结果
4. 第一版交付物是什么，不要超过 7 天完成
5. 可以怎么报价：一次性 / 月费 / 按量 / 绩效
6. 需要哪些输入材料
7. 交付风险和人工复核点
8. 如何用 3 个真实客户验证
9. 不建议做的部分
10. 下一步最小行动清单`,
      },
      {
        title: "把服务做成可复购产品",
        desc: "适合已经接过一两单后，整理流程、报价和复购机制。",
        body: `请把我的 AI 服务整理成可复购的小产品。

当前服务：
【写下你现在怎么交付】

请输出：
1. 标准化交付包名称
2. 适合的客户画像
3. 每周 / 每月固定交付物
4. 客户需要提交哪些资料
5. 哪些步骤由 AI 生成，哪些必须人工审核
6. 三档报价方案：入门版 / 标准版 / 高级版
7. 交付周期和验收标准
8. 复购理由和续费触发点
9. 可以沉淀成模板、知识库或自动化的环节
10. 第一版销售页文案`,
      },
    ],
    tint: "from-emerald-100 via-amber-100 to-white",
  },
  {
    id: "concept-aesthetics",
    no: "05",
    title: "热门概念解析：短视频里的 AI 黑话",
    art: "热门概念解析",
    hook: "AI、LLM、Token、Transformer、RAG、Agent、MCP 这些词听起来很玄，其实都能用大白话讲清楚。",
    detail:
      "很多 AI 教程最大的问题不是错，而是把一个简单动作包装成很吓人的名词。这里先讲底层逻辑：模型怎样把内容变成数字、怎样预测下一个 Token、怎样接资料和工具；再讲应用层概念。你不用先背定义，先看它到底让 AI 多了哪种能力。",
    keyQuestion: "这个概念到底在讲哪一层：底层模型、训练推理、资料检索、工具调用、流程自动化，还是只是换了个说法？",
    practicalOutcome: "读完这一页，再刷抖音、B 站、公众号里的 AI 教程，至少能听懂他们在讲哪一层能力，也能判断是不是在堆词、卖课或夸大效果。",
    sections: [
      {
        title: "AI / 机器学习 / 深度学习：范围从大到小",
        body:
          "AI 是让机器表现出智能的总称；机器学习是让机器从数据里学规律；深度学习是用多层神经网络学复杂规律。现在大家常说的生成式 AI、大语言模型，大多属于深度学习的应用。别把“AI”当成一个具体产品，它是一整类技术。",
      },
      {
        title: "LLM 大语言模型：本质是预测下一个 Token",
        body:
          "大语言模型不是像人一样真正“懂了一切”，而是在海量文本和代码里学会语言、知识和模式，然后根据上下文预测接下来最可能的 Token。它之所以看起来会推理，是因为训练数据、模型规模和指令对齐让它能把很多模式组合起来。",
      },
      {
        title: "Token：AI 眼里的文字颗粒",
        body:
          "Token 是模型处理文本的基本单位，可以是一个字、一个词，也可以是一段字符。你输入、模型输出、上下文窗口、价格计费，很多都按 Token 计算。理解 Token，就能明白为什么长文更贵、为什么模型有时会截断、为什么提示词要写得清楚。",
      },
      {
        title: "Transformer / Attention：让模型知道重点看哪里",
        body:
          "Transformer 是现代大模型的核心结构，Attention 是里面最关键的机制：让模型在生成每个 Token 时，判断上下文里哪些信息更相关。它不是魔法，只是比旧方法更擅长处理长文本、并行训练和捕捉词与词之间的关系。",
      },
      {
        title: "参数 / 算力 / 数据：模型能力的三块地基",
        body:
          "参数像模型学到的可调旋钮，数据决定它见过什么，算力决定它能训练到什么规模。参数多不一定绝对更好，数据质量、训练方法、推理效率和产品工程同样重要。看模型别只看“多少 B”，还要看具体任务表现。",
      },
      {
        title: "预训练 / 后训练 / 推理：模型生命周期",
        body:
          "预训练让模型从大规模数据里学通用能力；后训练让它更会按人类指令回答、更安全；推理是用户真正提问时模型生成答案的过程。普通人调用 ChatGPT、豆包、DeepSeek，本质上是在使用已经训练好的模型做推理。",
      },
      {
        title: "AIGC / AGI：一个是生成内容，一个是通用智能愿景",
        body:
          "AIGC 是用 AI 生成文字、图片、音频、视频和代码，已经是可落地的生产工具。AGI 指接近人类通用能力的智能，目前仍是目标和争议话题。短视频里把 AIGC 效果直接说成 AGI，通常是在放大概念。",
      },
      {
        title: "幻觉：AI 一本正经地编错",
        body:
          "幻觉不是模型“坏了”，而是它在缺少可靠依据时仍然按概率生成看似合理的答案。解决办法不是迷信更大的模型，而是给来源、让它引用资料、使用 RAG、加验证步骤，并把高风险决策交给人复核。",
      },
      {
        title: "MCP：给 AI 接工具的插座",
        body:
          "MCP 可以理解成 AI 调用外部工具的标准接口。没有 MCP，AI 主要靠聊天；接上 MCP 后，它可以按规则去查文件、连数据库、用浏览器、读 GitHub、调用你允许的工具。重点不是“装了 MCP 就无敌”，而是你开放了哪些工具、权限多大、有没有日志和确认。",
      },
      {
        title: "RAG：让 AI 带着资料回答",
        body:
          "RAG 是“先检索资料，再让模型回答”。比如把公司文档、产品手册、课程讲义放进知识库，用户提问时先找相关片段，再交给 AI 组织答案。它适合资料问答、客服、内部知识库；不适合拿来解决所有推理问题。",
      },
      {
        title: "向量数据库：给相似内容做索引",
        body:
          "向量数据库不是普通表格，而是把文字、图片等内容变成向量后，按“语义相似度”查找。用户问“退款多久到账”，系统能找到“售后、退款、到账时间”相关资料。RAG 常用它，但小项目也可以先用普通搜索或轻量知识库，不必一上来就上复杂架构。",
      },
      {
        title: "Embedding：把内容变成可比较的坐标",
        body:
          "Embedding 就是把一句话、一段文档、一张图变成一串数字。数字之间距离近，代表语义更相似。它是知识库检索、推荐、去重、相似图片搜索的基础。你不需要背公式，只要知道它负责“让机器知道两段内容像不像”。",
      },
      {
        title: "Agent：会拆任务、会调工具的 AI",
        body:
          "Agent 不是更会聊天，而是能围绕目标做多步动作：先计划，再调用工具，再观察结果，再继续修正。比如让它读项目、改代码、跑测试、看报错、再修复。好 Agent 一定有边界、日志、验证和人工接管。",
      },
      {
        title: "Workflow：固定流程自动跑",
        body:
          "Workflow 是把步骤串起来：收集资料 -> 清洗 -> 生成 -> 审核 -> 发布。它适合重复、确定、可拆分的流程。能用 Workflow 的地方，不一定需要 Agent；Workflow 更稳，Agent 更灵活。",
      },
      {
        title: "Skill：把经验打包给 AI 复用",
        body:
          "Skill 可以理解成给 AI 的“操作手册”。比如代码评审怎么做、前端页面怎么验收、性能怎么检查、上线前怎么过清单。它不是一个模型，而是一套可复用步骤，让 AI 下次遇到同类任务时少走弯路。",
      },
      {
        title: "Prompt：把需求说清楚的任务说明",
        body:
          "Prompt 不是咒语，而是任务说明。好 Prompt 通常说清楚角色、目标、输入、限制、输出格式和验收标准。新手不要追“神级提示词”，先学会把自己的需求讲具体。",
      },
      {
        title: "Function Calling / Tool Calling：让模型按格式调函数",
        body:
          "Tool Calling 是让模型不只输出文字，而是按结构化格式调用某个工具，比如查天气、下单、查库存、改文件。它是 Agent 和自动化系统的基础。关键是工具结果要可验证，不能让 AI 随便编。",
      },
      {
        title: "多模态：不只看文字",
        body:
          "多模态是模型能处理文字、图片、音频、视频等多种输入。比如看图写文案、读截图找问题、根据产品图生成卖点。多模态很强，但也要注意图片隐私、版权和识别错误。",
      },
      {
        title: "微调：让模型适应特定风格或任务",
        body:
          "微调不是普通用户每天都需要做的事。它适合你有稳定数据、固定格式、明确评测标准的场景，比如客服话术、行业问答、固定格式抽取。资料更新频繁时，RAG 往往比微调更合适。",
      },
      {
        title: "LoRA / QLoRA：更省资源的微调方式",
        body:
          "LoRA 可以理解成不给整个大模型重训，只训练一小部分适配参数；QLoRA 则进一步压缩资源消耗。它们常见于开源模型训练教程。新手先理解用途，不要一看到教程就租显卡开练。",
      },
      {
        title: "数字人 / 声音克隆：内容生产能力",
        body:
          "数字人和声音克隆常用于短视频、电商、课程和客服，但必须注意肖像权、声音授权和平台规则。能生成不代表能商用，尤其是仿真人声和真人形象。",
      },
      {
        title: "AI 泔水：低质量批量生成内容",
        body:
          "AI 泔水指为了流量批量生成、信息密度低、事实不可靠的内容。判断标准很简单：有没有真实例子、有没有来源、有没有验证、是不是只在堆热词。",
      },
      {
        title: "上下文窗口：AI 一次能看多少内容",
        body:
          "上下文窗口越大，AI 一次能读的资料越多，但不等于一定更聪明。长文档任务还要看检索、分段、引用和总结能力。不要只看 128K、1M 这些数字，重点看你的任务是否真的需要。",
      },
    ],
    checklist: ["先判断它属于哪一层", "看有没有输入输出示例", "区分模型能力、资料能力和工具能力", "警惕只堆热词的教程"],
    links: [
      ["B站：MCP 教程", "https://search.bilibili.com/all?keyword=MCP%20AI%20%E6%95%99%E7%A8%8B"],
      ["B站：RAG 知识库教程", "https://search.bilibili.com/all?keyword=RAG%20%E7%9F%A5%E8%AF%86%E5%BA%93%20%E6%95%99%E7%A8%8B"],
      ["B站：AI Agent 教程", "https://search.bilibili.com/all?keyword=AI%20Agent%20%E6%95%99%E7%A8%8B"],
      ["抖音：AI 热门概念", "https://www.douyin.com/search/AI%20%E7%83%AD%E9%97%A8%E6%A6%82%E5%BF%B5"],
      ["抖音：MCP RAG Agent", "https://www.douyin.com/search/MCP%20RAG%20Agent"],
      ["抖音：AI 底层逻辑视频", "https://v.douyin.com/5ImHz5mUjFg/"],
      ["AIGC Survey", "https://arxiv.org/abs/2304.06632"],
    ],
    tint: "from-sky-200 via-indigo-200 to-white",
  },
  {
    id: "open-skills",
    no: "06",
    title: "开源 Skill：把高手工作流装进 AI 工具",
    art: "开源 Skill",
    hook: "Skill 不是资料收藏夹，而是能直接塞进 AI 编程工具里的工作流。先看 addyosmani/agent-skills 这种成熟仓库。",
    detail:
      "这里的 Skill 指一套写好的 AI 工作流说明：什么时候该先问需求、什么时候要写计划、怎么小步实现、怎么测试、怎么代码审查、怎么上线。把 Skill 装到 Claude Code、Cursor、Gemini CLI、Windsurf、OpenCode、Copilot 等工具里，本质上就是给 AI 增加一套稳定的做事规矩。",
    keyQuestion: "这个 Skill 能不能让 AI 下次做同类任务时少废话、少乱改、能验证、能交付？",
    practicalOutcome: "你会知道 addyosmani/agent-skills 里面的 Skill 是干什么的，也知道可以复制或安装到自己的 AI 编程工具里复用。",
    sections: [
      {
        title: "addyosmani/agent-skills 是什么",
        body:
          "这个仓库把资深工程师常用的软件开发流程拆成 Skill：先定义需求、再做计划、再小步构建、再测试验证、再审查、最后发布。它不是教你某个框架，而是让 AI 编程助手按更像工程团队的方式做事。",
      },
      {
        title: "里面的 Skill 有什么用",
        body:
          "比如 spec-driven-development 让 AI 先写清楚要做什么；planning-and-task-breakdown 让 AI 拆小任务；incremental-implementation 让 AI 一次只做一个可验证切片；test-driven-development 强调测试；frontend-ui-engineering 适合做页面；browser-testing-with-devtools 适合浏览器验证；shipping-and-launch 适合上线前检查。",
      },
      {
        title: "怎么装到自己的 AI 编程工具",
        body:
          "如果工具支持插件或 Skill，就直接安装这个仓库；如果不支持，就把某个 Skill 目录里的 SKILL.md 复制到工具的规则/上下文目录。Cursor 可以把 SKILL.md 放进 .cursor/rules；Claude Code 可以用插件安装；Gemini CLI 可以安装 skills 目录；其他工具也可以把它当成系统提示词或项目规则引用。",
      },
      {
        title: "为什么不要只复制神级提示词",
        body:
          "神级提示词通常只解决一次回答的格式问题；Skill 解决的是一类任务的流程问题。比如“帮我写代码”很容易乱改，但“先读项目、确认目标、列计划、改一个切片、跑验证、汇报 diff”就更接近真实交付。",
      },
      {
        title: "新手最值得先复制的几个",
        body:
          "优先看 spec-driven-development、planning-and-task-breakdown、incremental-implementation、frontend-ui-engineering、test-driven-development、browser-testing-with-devtools、code-review-and-quality。它们覆盖了从想法到页面、从实现到验证的常见路径。",
      },
      {
        title: "使用时的安全边界",
        body:
          "Skill 只是规则，不是权限保险。装进 AI 工具后，仍然要看它要改哪些文件、要跑哪些命令、会不会上传数据、会不会删除内容。来源不明的 Skill 不要直接装，尤其是带脚本、联网、账号权限的内容。",
      },
    ],
    checklist: ["先从可信仓库复制", "优先复制 SKILL.md", "装进工具后先跑小项目", "所有文件修改都看 diff"],
    links: [
      ["addyosmani/agent-skills", "https://github.com/addyosmani/agent-skills"],
      ["agent-skills skills 目录", "https://github.com/addyosmani/agent-skills/tree/main/skills"],
      ["Cursor 安装说明", "https://github.com/addyosmani/agent-skills/blob/main/docs/cursor-setup.md"],
      ["Gemini CLI 安装说明", "https://github.com/addyosmani/agent-skills/blob/main/docs/gemini-cli-setup.md"],
      ["B站：AI 编程 Skill 教程", "https://search.bilibili.com/all?keyword=AI%20%E7%BC%96%E7%A8%8B%20Skill%20%E6%95%99%E7%A8%8B"],
      ["抖音：AI 编程工作流", "https://www.douyin.com/search/AI%20%E7%BC%96%E7%A8%8B%20%E5%B7%A5%E4%BD%9C%E6%B5%81"],
    ],
    prompts: [
      {
        title: "安装 agent-skills 的提示词",
        desc: "复制给你的 AI 编程工具，让它帮你把推荐 Skill 装进项目规则。",
        body: `你是我的 AI 编程工具配置助手。请帮我把 GitHub 仓库 https://github.com/addyosmani/agent-skills 里的适合 Skill 装到当前项目里。

我的工具是：
【Claude Code / Cursor / Gemini CLI / Windsurf / Codex / Cline / Roo Code / 其他】

请先做这几件事：
1. 判断当前工具支持哪种 Skill 或规则文件安装方式。
2. 读取 agent-skills 仓库的 skills 目录和安装文档。
3. 优先推荐这些 Skill：
   - spec-driven-development：先写清楚需求和验收
   - planning-and-task-breakdown：把任务拆成小步
   - incremental-implementation：一次只做一个可验证切片
   - frontend-ui-engineering：做前端页面时保证体验
   - test-driven-development：高风险逻辑先写测试
   - browser-testing-with-devtools：用浏览器验证页面
   - code-review-and-quality：改完后做代码审查
   - shipping-and-launch：上线前检查
4. 告诉我每个 Skill 的用途、适合什么时候用、不适合什么时候用。
5. 先给安装计划，不要直接改文件。
6. 等我确认后，再复制对应 SKILL.md 到当前工具推荐的规则目录。

限制：
- 不要安装来源不明的脚本。
- 不要覆盖我已有规则，先备份或合并。
- 如果工具不支持 Skill，就把 SKILL.md 内容整理成项目规则文件。`,
      },
      {
        title: "选择该用哪个 Skill",
        desc: "不确定用哪个 Skill 时，把任务贴给 AI，让它推荐。",
        body: `请根据我的任务，从 addyosmani/agent-skills 中推荐最适合的 Skill 组合。

我的任务：
【粘贴任务描述】

请输出：
1. 推荐 Skill 列表，按使用顺序排列
2. 每个 Skill 解决什么问题
3. 我应该复制哪些 SKILL.md
4. 当前任务的执行流程
5. 哪些动作需要我人工确认
6. 最后如何验证完成`,
      },
    ],
    tint: "from-rose-100 via-cyan-100 to-white",
  },
];

export const getAiCodingTopic = (topicId) =>
  aiCodingBasicsTopics.find((topic) => topic.id === topicId);

