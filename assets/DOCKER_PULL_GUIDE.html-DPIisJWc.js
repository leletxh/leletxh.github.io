import{_ as c,c as d,a as p,b as a,d as l,e as n,w as i,r,o as t}from"./app-DUMTNEXb.js";const o={};function v(m,s){const e=r("RouteLink");return t(),d("div",null,[s[6]||(s[6]=p(`<h1 id="docker-镜像直接拉取部署指南" tabindex="-1"><a class="header-anchor" href="#docker-镜像直接拉取部署指南"><span>Docker 镜像直接拉取部署指南</span></a></h1><p>本指南详细介绍如何直接拉取预构建的 Docker 镜像来部署 CABM 应用，无需本地构建。</p><p>本文档不使用全自动工具，全部为docker直接命令</p><h2 id="📦-可用镜像源" tabindex="-1"><a class="header-anchor" href="#📦-可用镜像源"><span>📦 可用镜像源</span></a></h2><h3 id="github-container-registry-推荐" tabindex="-1"><a class="header-anchor" href="#github-container-registry-推荐"><span>GitHub Container Registry (推荐)</span></a></h3><ul><li><strong>镜像地址</strong>: <code>ghcr.io/xhc2008/cabm</code></li><li><strong>标签</strong>: <code>latest</code>、分支名、commit SHA</li><li><strong>架构支持</strong>: <code>linux/amd64</code>、<code>linux/arm64</code></li><li><strong>优势</strong>: <ul><li>与源码同步构建</li><li>支持多架构</li><li>无需额外配置</li><li>自动安全扫描</li></ul></li></ul><h2 id="🚀-快速部署" tabindex="-1"><a class="header-anchor" href="#🚀-快速部署"><span>🚀 快速部署</span></a></h2><h3 id="方法一-docker-run-命令" tabindex="-1"><a class="header-anchor" href="#方法一-docker-run-命令"><span>方法一：Docker Run 命令</span></a></h3><h4 id="_1-准备环境配置" tabindex="-1"><a class="header-anchor" href="#_1-准备环境配置"><span>1. 准备环境配置</span></a></h4><p>创建工作目录并配置环境变量：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 创建工作目录</span></span>
<span class="line"><span class="token function">mkdir</span> cabm-app <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建环境配置文件</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> .env <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line"># API 配置（必需）</span>
<span class="line">CHAT_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">CHAT_API_KEY=your_api_key_here</span>
<span class="line">CHAT_MODEL=deepseek-ai/DeepSeek-V3</span>
<span class="line"></span>
<span class="line">IMAGE_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">IMAGE_API_KEY=your_api_key_here</span>
<span class="line">IMAGE_MODEL=Kwai-Kolors/Kolors</span>
<span class="line"></span>
<span class="line">OPTION_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">OPTION_API_KEY=your_api_key_here</span>
<span class="line">OPTION_MODEL=Qwen/Qwen3-8B</span>
<span class="line"></span>
<span class="line">MEMORY_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">MEMORY_API_KEY=your_api_key_here</span>
<span class="line">EMBEDDING_MODEL=BAAI/bge-m3</span>
<span class="line">RERANKER_MODEL=BAAI/bge-reranker-v2-m3</span>
<span class="line"></span>
<span class="line"># TTS 配置（可选）</span>
<span class="line">TTS_SERVICE_URL_GPTSoVITS=http://127.0.0.1:9880</span>
<span class="line">TTS_SERVICE_URL_SiliconFlow=https://api.siliconflow.cn/v1</span>
<span class="line">TTS_SERVICE_API_KEY=your_api_key_here</span>
<span class="line">TTS_SERVICE_METHOD=siliconflow</span>
<span class="line"></span>
<span class="line"># 应用配置</span>
<span class="line">DEBUG=False</span>
<span class="line">PORT=5000</span>
<span class="line">HOST=0.0.0.0</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编辑 .env 文件，填入你的实际 API 密钥</span></span>
<span class="line"><span class="token function">nano</span> .env  <span class="token comment"># 或使用其他编辑器</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-创建数据目录" tabindex="-1"><a class="header-anchor" href="#_2-创建数据目录"><span>2. 创建数据目录</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 创建持久化数据目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data/history data/memory data/scenes</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> static/images/cache</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> static/audio</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-运行容器" tabindex="-1"><a class="header-anchor" href="#_3-运行容器"><span>3. 运行容器</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 拉取并运行最新版本</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token punctuation">\\</span></span>
<span class="line">  --env-file .env <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/data:/app/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/images/cache:/app/static/images/cache <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/audio:/app/static/audio <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> unless-stopped <span class="token punctuation">\\</span></span>
<span class="line">  ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-验证部署" tabindex="-1"><a class="header-anchor" href="#_4-验证部署"><span>4. 验证部署</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 检查容器状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看启动日志</span></span>
<span class="line"><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 访问应用</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;应用已启动，请访问: http://localhost:5000&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法二-docker-compose" tabindex="-1"><a class="header-anchor" href="#方法二-docker-compose"><span>方法二：Docker Compose</span></a></h3><h4 id="_1-创建-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_1-创建-docker-compose-yml"><span>1. 创建 docker-compose.yml</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 创建工作目录</span></span>
<span class="line"><span class="token function">mkdir</span> cabm-app <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建 docker-compose.yml 文件</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> docker-compose.yml <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line">version: &#39;3.8&#39;</span>
<span class="line"></span>
<span class="line">services:</span>
<span class="line">  cabm:</span>
<span class="line">    image: ghcr.io/xhc2008/cabm:latest</span>
<span class="line">    container_name: cabm-app</span>
<span class="line">    ports:</span>
<span class="line">      - &quot;5000:5000&quot;</span>
<span class="line">    env_file:</span>
<span class="line">      - .env</span>
<span class="line">    volumes:</span>
<span class="line">      - ./data:/app/data</span>
<span class="line">      - ./static/images/cache:/app/static/images/cache</span>
<span class="line">      - ./static/audio:/app/static/audio</span>
<span class="line">    restart: unless-stopped</span>
<span class="line">    healthcheck:</span>
<span class="line">      test: [&quot;CMD&quot;, &quot;curl&quot;, &quot;-f&quot;, &quot;http://localhost:5000/health&quot;]</span>
<span class="line">      interval: 30s</span>
<span class="line">      timeout: 10s</span>
<span class="line">      retries: 3</span>
<span class="line">      start_period: 40s</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_2-配置环境变量"><span>2. 配置环境变量</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 创建环境配置文件（同上面的 .env 文件内容）</span></span>
<span class="line"><span class="token comment"># 参考方法一中的环境配置步骤</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-启动服务" tabindex="-1"><a class="header-anchor" href="#_3-启动服务"><span>3. 启动服务</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 创建数据目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data/history data/memory data/scenes</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> static/images/cache</span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> static/audio</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看服务状态</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-镜像版本管理" tabindex="-1"><a class="header-anchor" href="#🔄-镜像版本管理"><span>🔄 镜像版本管理</span></a></h2><h3 id="可用标签" tabindex="-1"><a class="header-anchor" href="#可用标签"><span>可用标签</span></a></h3><ul><li><code>latest</code>: 最新稳定版本（主分支最新构建）</li><li><code>main-{commit_sha}</code>: 主分支特定提交版本</li><li><code>{branch_name}</code>: 特定分支的最新版本</li><li><code>{custom_tag}</code>: 手动发布的版本标签</li></ul><h3 id="更新镜像" tabindex="-1"><a class="header-anchor" href="#更新镜像"><span>更新镜像</span></a></h3><h4 id="使用-docker-run" tabindex="-1"><a class="header-anchor" href="#使用-docker-run"><span>使用 Docker Run</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 停止当前容器</span></span>
<span class="line"><span class="token function">docker</span> stop cabm-app</span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取最新镜像</span></span>
<span class="line"><span class="token function">docker</span> pull ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新运行容器（使用之前的命令）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token punctuation">\\</span></span>
<span class="line">  --env-file .env <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/data:/app/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/images/cache:/app/static/images/cache <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/audio:/app/static/audio <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> unless-stopped <span class="token punctuation">\\</span></span>
<span class="line">  ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用-docker-compose" tabindex="-1"><a class="header-anchor" href="#使用-docker-compose"><span>使用 Docker Compose</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 拉取最新镜像</span></span>
<span class="line"><span class="token function">docker-compose</span> pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔧-高级配置" tabindex="-1"><a class="header-anchor" href="#🔧-高级配置"><span>🔧 高级配置</span></a></h2><h3 id="自定义端口" tabindex="-1"><a class="header-anchor" href="#自定义端口"><span>自定义端口</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 修改端口映射</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">8080</span>:5000 <span class="token punctuation">\\</span>  <span class="token comment"># 映射到主机的 8080 端口</span></span>
<span class="line">  <span class="token comment"># ... 其他参数保持不变</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内存限制" tabindex="-1"><a class="header-anchor" href="#内存限制"><span>内存限制</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 限制容器内存使用</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--memory</span><span class="token operator">=</span>2g <span class="token punctuation">\\</span></span>
<span class="line">  --memory-swap<span class="token operator">=</span>2g <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token comment"># ... 其他参数</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网络配置" tabindex="-1"><a class="header-anchor" href="#网络配置"><span>网络配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 使用自定义网络</span></span>
<span class="line"><span class="token function">docker</span> network create cabm-network</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> cabm-network <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token comment"># ... 其他参数</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔍-故障排除" tabindex="-1"><a class="header-anchor" href="#🔍-故障排除"><span>🔍 故障排除</span></a></h2><h3 id="镜像拉取失败" tabindex="-1"><a class="header-anchor" href="#镜像拉取失败"><span>镜像拉取失败</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 检查网络连接</span></span>
<span class="line"><span class="token function">docker</span> pull hello-world</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 手动拉取镜像</span></span>
<span class="line"><span class="token function">docker</span> pull ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果仍然失败，尝试使用代理</span></span>
<span class="line"><span class="token comment"># docker pull --platform linux/amd64 ghcr.io/xhc2008/cabm:latest</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器启动失败" tabindex="-1"><a class="header-anchor" href="#容器启动失败"><span>容器启动失败</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 查看详细错误信息</span></span>
<span class="line"><span class="token function">docker</span> logs cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查环境变量</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> cabm-app <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;(API_KEY|API_BASE_URL)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器调试</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> cabm-app /bin/bash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用无法访问" tabindex="-1"><a class="header-anchor" href="#应用无法访问"><span>应用无法访问</span></a></h3><ol><li>检查端口映射是否正确</li><li>检查防火墙设置</li><li>检查容器网络配置</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 检查端口占用</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tlnp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">5000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查容器网络</span></span>
<span class="line"><span class="token function">docker</span> inspect cabm-app <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">10</span> NetworkSettings</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据持久化问题" tabindex="-1"><a class="header-anchor" href="#数据持久化问题"><span>数据持久化问题</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 检查数据卷挂载</span></span>
<span class="line"><span class="token function">docker</span> inspect cabm-app <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">10</span> Mounts</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 确保目录权限正确</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">755</span> ./data ./static</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-相关文档" tabindex="-1"><a class="header-anchor" href="#📚-相关文档"><span>📚 相关文档</span></a></h2>`,50)),a("ul",null,[a("li",null,[l(e,{to:"/deploy-docs/DOCKER_DEPLOY_GUIDE.html"},{default:i(()=>s[0]||(s[0]=[n("DOCKER_DEPLOY_GUIDE.md",-1)])),_:1,__:[0]}),s[1]||(s[1]=n(" - 完整 Docker 部署指南",-1))]),a("li",null,[l(e,{to:"/deploy-docs/WINDOWS_DEPLOY_GUIDE.html"},{default:i(()=>s[2]||(s[2]=[n("WINDOWS_DEPLOY_GUIDE.md",-1)])),_:1,__:[2]}),s[3]||(s[3]=n(" - Windows 部署指南",-1))]),a("li",null,[l(e,{to:"/deploy-docs/TTS_GPTSoVITS.html"},{default:i(()=>s[4]||(s[4]=[n("TTS_GPTSoVITS.md",-1)])),_:1,__:[4]}),s[5]||(s[5]=n(" - TTS 服务配置指南",-1))])]),s[7]||(s[7]=p(`<h2 id="⚡-一键部署脚本" tabindex="-1"><a class="header-anchor" href="#⚡-一键部署脚本"><span>⚡ 一键部署脚本</span></a></h2><p>创建一个快速部署脚本：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> deploy.sh <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">echo &quot;🚀 CABM Docker 快速部署脚本&quot;</span>
<span class="line">echo &quot;==============================&quot;</span>
<span class="line"></span>
<span class="line"># 检查 Docker 是否安装</span>
<span class="line">if ! command -v docker &amp;&gt; /dev/null; then</span>
<span class="line">    echo &quot;❌ Docker 未安装，请先安装 Docker&quot;</span>
<span class="line">    exit 1</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line"># 创建工作目录</span>
<span class="line">echo &quot;📁 创建工作目录...&quot;</span>
<span class="line">mkdir -p cabm-app &amp;&amp; cd cabm-app</span>
<span class="line">mkdir -p data/history data/memory data/scenes</span>
<span class="line">mkdir -p static/images/cache static/audio</span>
<span class="line"></span>
<span class="line"># 创建环境配置文件</span>
<span class="line">echo &quot;⚙️  创建配置文件...&quot;</span>
<span class="line">if [ ! -f .env ]; then</span>
<span class="line">    cat &gt; .env &lt;&lt; &#39;ENVEOF&#39;</span>
<span class="line"># API 配置（请修改为你的实际密钥）</span>
<span class="line">CHAT_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">CHAT_API_KEY=your_api_key_here</span>
<span class="line">CHAT_MODEL=deepseek-ai/DeepSeek-V3</span>
<span class="line"></span>
<span class="line">IMAGE_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">IMAGE_API_KEY=your_api_key_here</span>
<span class="line">IMAGE_MODEL=Kwai-Kolors/Kolors</span>
<span class="line"></span>
<span class="line">OPTION_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">OPTION_API_KEY=your_api_key_here</span>
<span class="line">OPTION_MODEL=Qwen/Qwen3-8B</span>
<span class="line"></span>
<span class="line">MEMORY_API_BASE_URL=https://api.siliconflow.cn/v1</span>
<span class="line">MEMORY_API_KEY=your_api_key_here</span>
<span class="line">EMBEDDING_MODEL=BAAI/bge-m3</span>
<span class="line">RERANKER_MODEL=BAAI/bge-reranker-v2-m3</span>
<span class="line"></span>
<span class="line"># TTS 配置（可选）</span>
<span class="line">TTS_SERVICE_METHOD=siliconflow</span>
<span class="line">TTS_SERVICE_URL_SiliconFlow=https://api.siliconflow.cn/v1</span>
<span class="line">TTS_SERVICE_API_KEY=your_api_key_here</span>
<span class="line"></span>
<span class="line"># 应用配置</span>
<span class="line">DEBUG=False</span>
<span class="line">PORT=5000</span>
<span class="line">HOST=0.0.0.0</span>
<span class="line">ENVEOF</span>
<span class="line">    echo &quot;📝 请编辑 .env 文件，填入你的 API 密钥&quot;</span>
<span class="line">    echo &quot;   nano .env&quot;</span>
<span class="line">    read -p &quot;配置完成后按 Enter 继续...&quot;</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line"># 拉取并运行容器</span>
<span class="line">echo &quot;🐳 拉取 Docker 镜像...&quot;</span>
<span class="line">docker pull ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span>
<span class="line">echo &quot;🚀 启动容器...&quot;</span>
<span class="line">docker run -d --name cabm-app \\</span>
<span class="line">  -p 5000:5000 \\</span>
<span class="line">  --env-file .env \\</span>
<span class="line">  -v $(pwd)/data:/app/data \\</span>
<span class="line">  -v $(pwd)/static/images/cache:/app/static/images/cache \\</span>
<span class="line">  -v $(pwd)/static/audio:/app/static/audio \\</span>
<span class="line">  --restart unless-stopped \\</span>
<span class="line">  ghcr.io/xhc2008/cabm:latest</span>
<span class="line"></span>
<span class="line"># 检查部署状态</span>
<span class="line">echo &quot;✅ 部署完成！&quot;</span>
<span class="line">echo &quot;📊 容器状态：&quot;</span>
<span class="line">docker ps | grep cabm-app</span>
<span class="line"></span>
<span class="line">echo &quot;&quot;</span>
<span class="line">echo &quot;🌐 访问地址: http://localhost:5000&quot;</span>
<span class="line">echo &quot;📋 管理命令:&quot;</span>
<span class="line">echo &quot;   查看日志: docker logs -f cabm-app&quot;</span>
<span class="line">echo &quot;   停止服务: docker stop cabm-app&quot;</span>
<span class="line">echo &quot;   重启服务: docker restart cabm-app&quot;</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token function">chmod</span> +x deploy.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用部署脚本：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 下载并运行一键部署脚本</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-o</span> deploy.sh https://raw.githubusercontent.com/xhc2008/CABM/main/deploy.sh</span>
<span class="line"><span class="token function">chmod</span> +x deploy.sh</span>
<span class="line">./deploy.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5))])}const b=c(o,[["render",v]]),h=JSON.parse('{"path":"/deploy-docs/DOCKER_PULL_GUIDE.html","title":"Docker 镜像直接拉取部署指南","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"Docker 镜像直接拉取部署指南","description":"详细介绍如何直接拉取预构建的 Docker 镜像来部署 CABM 应用"},"headers":[{"level":2,"title":"📦 可用镜像源","slug":"📦-可用镜像源","link":"#📦-可用镜像源","children":[{"level":3,"title":"GitHub Container Registry (推荐)","slug":"github-container-registry-推荐","link":"#github-container-registry-推荐","children":[]}]},{"level":2,"title":"🚀 快速部署","slug":"🚀-快速部署","link":"#🚀-快速部署","children":[{"level":3,"title":"方法一：Docker Run 命令","slug":"方法一-docker-run-命令","link":"#方法一-docker-run-命令","children":[]},{"level":3,"title":"方法二：Docker Compose","slug":"方法二-docker-compose","link":"#方法二-docker-compose","children":[]}]},{"level":2,"title":"🔄 镜像版本管理","slug":"🔄-镜像版本管理","link":"#🔄-镜像版本管理","children":[{"level":3,"title":"可用标签","slug":"可用标签","link":"#可用标签","children":[]},{"level":3,"title":"更新镜像","slug":"更新镜像","link":"#更新镜像","children":[]}]},{"level":2,"title":"🔧 高级配置","slug":"🔧-高级配置","link":"#🔧-高级配置","children":[{"level":3,"title":"自定义端口","slug":"自定义端口","link":"#自定义端口","children":[]},{"level":3,"title":"内存限制","slug":"内存限制","link":"#内存限制","children":[]},{"level":3,"title":"网络配置","slug":"网络配置","link":"#网络配置","children":[]}]},{"level":2,"title":"🔍 故障排除","slug":"🔍-故障排除","link":"#🔍-故障排除","children":[{"level":3,"title":"镜像拉取失败","slug":"镜像拉取失败","link":"#镜像拉取失败","children":[]},{"level":3,"title":"容器启动失败","slug":"容器启动失败","link":"#容器启动失败","children":[]},{"level":3,"title":"应用无法访问","slug":"应用无法访问","link":"#应用无法访问","children":[]},{"level":3,"title":"数据持久化问题","slug":"数据持久化问题","link":"#数据持久化问题","children":[]}]},{"level":2,"title":"📚 相关文档","slug":"📚-相关文档","link":"#📚-相关文档","children":[]},{"level":2,"title":"⚡ 一键部署脚本","slug":"⚡-一键部署脚本","link":"#⚡-一键部署脚本","children":[]}],"git":{"updatedTime":1754326810000,"contributors":[{"name":"2302_76329346","username":"","email":"2302_76329346@noreply.gitcode.com","commits":3}],"changelog":[{"hash":"913c7a4c66eb061f2d6aad609a7daaaa20706bc4","time":1754326810000,"email":"2302_76329346@noreply.gitcode.com","author":"2302_76329346","message":"删除多个部署相关文档，并更新快速开始指南中的镜像地址和部署脚本链接"},{"hash":"9e7634fdfab34f2e51ac081bc14aae8eff3bb887","time":1754323398000,"email":"2302_76329346@noreply.gitcode.com","author":"2302_76329346","message":"更新文档：为多个部署指南添加语言、标题和描述信息"},{"hash":"f9c61434bda4cac85d5b9c782b7743cb86d12af5","time":1754306992000,"email":"2302_76329346@noreply.gitcode.com","author":"2302_76329346","message":"chore: initialize package.json with project metadata and development dependencies"}]},"filePathRelative":"deploy-docs/DOCKER_PULL_GUIDE.md"}');export{b as comp,h as data};
