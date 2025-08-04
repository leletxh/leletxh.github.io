import{_ as n,c as a,a as e,o as l}from"./app-DtjoBmZ8.js";const i={};function p(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="docker-部署指南" tabindex="-1"><a class="header-anchor" href="#docker-部署指南"><span>Docker 部署指南</span></a></h1><h2 id="github-actions-自动构建" tabindex="-1"><a class="header-anchor" href="#github-actions-自动构建"><span>GitHub Actions 自动构建</span></a></h2><h3 id="设置-github-secrets" tabindex="-1"><a class="header-anchor" href="#设置-github-secrets"><span>设置 GitHub Secrets</span></a></h3><p>在 GitHub 仓库的 Settings &gt; Secrets and variables &gt; Actions 中添加以下 secrets：</p><ol><li><code>DOCKER_USERNAME</code> - 你的 Docker Hub 用户名</li><li><code>DOCKER_PASSWORD</code> - 你的 Docker Hub 密码或访问令牌</li></ol><p><strong>注意</strong>: GitHub Container Registry 使用 <code>GITHUB_TOKEN</code>，无需额外配置。</p><h3 id="手动触发构建" tabindex="-1"><a class="header-anchor" href="#手动触发构建"><span>手动触发构建</span></a></h3><ol><li>进入 GitHub 仓库的 Actions 页面</li><li>选择 &quot;Docker Build and Push&quot; workflow</li><li>点击 &quot;Run workflow&quot;</li><li>可选择设置： <ul><li><code>tag</code>: Docker 镜像标签（默认：latest）</li><li><code>push_to_registry</code>: 是否推送到 Docker Hub（默认：true）</li></ul></li></ol><p>构建完成后，镜像将同时推送到：</p><ul><li>Docker Hub: <code>docker.io/{DOCKER_USERNAME}/cabm:{tag}</code></li><li>GitHub Container Registry: <code>ghcr.io/{REPOSITORY_OWNER}/cabm:{tag}</code></li></ul><h2 id="本地部署" tabindex="-1"><a class="header-anchor" href="#本地部署"><span>本地部署</span></a></h2><h3 id="方法1-使用-docker-run" tabindex="-1"><a class="header-anchor" href="#方法1-使用-docker-run"><span>方法1：使用 Docker Run</span></a></h3><p><strong>选择镜像源：</strong></p><p><strong>从 Docker Hub 拉取：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 1. 配置环境变量</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"><span class="token comment"># 编辑 .env 文件，填入你的 API 密钥</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建必要的目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data static/images/cache</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token punctuation">\\</span></span>
<span class="line">  --env-file .env <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/data:/app/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/images/cache:/app/static/images/cache <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> unless-stopped <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token punctuation">{</span>DOCKER_USERNAME<span class="token punctuation">}</span>/cabm:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从 GitHub Container Registry 拉取：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 1. 配置环境变量</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"><span class="token comment"># 编辑 .env 文件，填入你的 API 密钥</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建必要的目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data static/images/cache</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> cabm-app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token punctuation">\\</span></span>
<span class="line">  --env-file .env <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/data:/app/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/static/images/cache:/app/static/images/cache <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> unless-stopped <span class="token punctuation">\\</span></span>
<span class="line">  ghcr.io/<span class="token punctuation">{</span>REPOSITORY_OWNER<span class="token punctuation">}</span>/cabm:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法2-使用-docker-compose" tabindex="-1"><a class="header-anchor" href="#方法2-使用-docker-compose"><span>方法2：使用 Docker Compose</span></a></h3><p><strong>选择镜像源：</strong></p><p><strong>从 GitHub Container Registry (推荐)：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 1. 配置环境变量</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"><span class="token comment"># 编辑 .env 文件，填入你的 API 密钥</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建必要的目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data static/images/cache static/audio</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 启动服务</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从 Docker Hub：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 1. 配置环境变量</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"><span class="token comment"># 编辑 .env 文件，填入你的 API 密钥</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建必要的目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data static/images/cache static/audio</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 启动服务</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.dockerhub.yml up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量配置" tabindex="-1"><a class="header-anchor" href="#环境变量配置"><span>环境变量配置</span></a></h3><p>编辑 <code>.env</code> 文件，配置以下必需的环境变量：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># API 配置（必需）</span></span>
<span class="line"><span class="token assign-left variable">CHAT_API_BASE_URL</span><span class="token operator">=</span>https://api.siliconflow.cn/v1</span>
<span class="line"><span class="token assign-left variable">CHAT_API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"><span class="token assign-left variable">CHAT_MODEL</span><span class="token operator">=</span>deepseek-ai/DeepSeek-V3</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">IMAGE_API_BASE_URL</span><span class="token operator">=</span>https://api.siliconflow.cn/v1</span>
<span class="line"><span class="token assign-left variable">IMAGE_API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"><span class="token assign-left variable">IMAGE_MODEL</span><span class="token operator">=</span>Kwai-Kolors/Kolors</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">OPTION_API_BASE_URL</span><span class="token operator">=</span>https://api.siliconflow.cn/v1</span>
<span class="line"><span class="token assign-left variable">OPTION_API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"><span class="token assign-left variable">OPTION_MODEL</span><span class="token operator">=</span>Qwen/Qwen3-8B</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">MEMORY_API_BASE_URL</span><span class="token operator">=</span>https://api.siliconflow.cn/v1</span>
<span class="line"><span class="token assign-left variable">MEMORY_API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"><span class="token assign-left variable">EMBEDDING_MODEL</span><span class="token operator">=</span>BAAI/bge-m3</span>
<span class="line"><span class="token assign-left variable">RERANKER_MODEL</span><span class="token operator">=</span>BAAI/bge-reranker-v2-m3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># TTS 配置（可选）</span></span>
<span class="line"><span class="token assign-left variable">TTS_SERVICE_URL_GPTSoVITS</span><span class="token operator">=</span>http://127.0.0.1:9880</span>
<span class="line"><span class="token assign-left variable">TTS_SERVICE_URL_SiliconFlow</span><span class="token operator">=</span>https://api.siliconflow.cn/v1</span>
<span class="line"><span class="token assign-left variable">TTS_SERVICE_API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"><span class="token assign-left variable">TTS_SERVICE_METHOD</span><span class="token operator">=</span>siliconflow</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 应用配置</span></span>
<span class="line"><span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>False</span>
<span class="line"><span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">5000</span></span>
<span class="line"><span class="token assign-left variable">HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问应用" tabindex="-1"><a class="header-anchor" href="#访问应用"><span>访问应用</span></a></h2><p>启动成功后，访问 http://localhost:5000</p><h2 id="管理命令" tabindex="-1"><a class="header-anchor" href="#管理命令"><span>管理命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 查看容器状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止容器</span></span>
<span class="line"><span class="token function">docker</span> stop cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启容器</span></span>
<span class="line"><span class="token function">docker</span> restart cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> cabm-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新镜像</span></span>
<span class="line"><span class="token function">docker</span> pull <span class="token punctuation">{</span>DOCKER_USERNAME<span class="token punctuation">}</span>/cabm:latest</span>
<span class="line"><span class="token comment"># 或者从 GitHub Container Registry</span></span>
<span class="line"><span class="token comment"># docker pull ghcr.io/{REPOSITORY_OWNER}/cabm:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> stop cabm-app</span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> cabm-app</span>
<span class="line"><span class="token comment"># 然后重新运行 docker run 命令</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="故障排除" tabindex="-1"><a class="header-anchor" href="#故障排除"><span>故障排除</span></a></h2><h3 id="容器无法启动" tabindex="-1"><a class="header-anchor" href="#容器无法启动"><span>容器无法启动</span></a></h3><ul><li>检查 <code>.env</code> 文件是否正确配置</li><li>检查端口 5000 是否被占用</li><li>查看容器日志：<code>docker logs cabm-app</code></li></ul><h3 id="api-调用失败" tabindex="-1"><a class="header-anchor" href="#api-调用失败"><span>API 调用失败</span></a></h3><ul><li>检查 API 密钥是否正确</li><li>检查网络连接</li><li>检查 API 服务是否可用</li></ul><h3 id="tts-功能异常" tabindex="-1"><a class="header-anchor" href="#tts-功能异常"><span>TTS 功能异常</span></a></h3><ul><li>检查 TTS 配置是否正确</li><li>如果使用 GPT-SoVITS，确保服务正在运行</li><li>检查参考音频文件是否存在于 <code>static/audio</code> 目录</li></ul>`,37)]))}const r=n(i,[["render",p]]),o=JSON.parse('{"path":"/deploy-docs/DOCKER_DEPLOY_GUIDE.html","title":"Docker 部署指南","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"GitHub Actions 自动构建","slug":"github-actions-自动构建","link":"#github-actions-自动构建","children":[{"level":3,"title":"设置 GitHub Secrets","slug":"设置-github-secrets","link":"#设置-github-secrets","children":[]},{"level":3,"title":"手动触发构建","slug":"手动触发构建","link":"#手动触发构建","children":[]}]},{"level":2,"title":"本地部署","slug":"本地部署","link":"#本地部署","children":[{"level":3,"title":"方法1：使用 Docker Run","slug":"方法1-使用-docker-run","link":"#方法1-使用-docker-run","children":[]},{"level":3,"title":"方法2：使用 Docker Compose","slug":"方法2-使用-docker-compose","link":"#方法2-使用-docker-compose","children":[]},{"level":3,"title":"环境变量配置","slug":"环境变量配置","link":"#环境变量配置","children":[]}]},{"level":2,"title":"访问应用","slug":"访问应用","link":"#访问应用","children":[]},{"level":2,"title":"管理命令","slug":"管理命令","link":"#管理命令","children":[]},{"level":2,"title":"故障排除","slug":"故障排除","link":"#故障排除","children":[{"level":3,"title":"容器无法启动","slug":"容器无法启动","link":"#容器无法启动","children":[]},{"level":3,"title":"API 调用失败","slug":"api-调用失败","link":"#api-调用失败","children":[]},{"level":3,"title":"TTS 功能异常","slug":"tts-功能异常","link":"#tts-功能异常","children":[]}]}],"git":{"updatedTime":1754306992000,"contributors":[{"name":"2302_76329346","username":"","email":"2302_76329346@noreply.gitcode.com","commits":1}],"changelog":[{"hash":"f9c61434bda4cac85d5b9c782b7743cb86d12af5","time":1754306992000,"email":"2302_76329346@noreply.gitcode.com","author":"2302_76329346","message":"chore: initialize package.json with project metadata and development dependencies"}]},"filePathRelative":"deploy-docs/DOCKER_DEPLOY_GUIDE.md"}');export{r as comp,o as data};
