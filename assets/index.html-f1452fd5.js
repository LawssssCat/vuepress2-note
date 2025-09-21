import{_ as n,o as s,c as e,e as a}from"./app-04e6f892.js";const i={},l=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#配置用户名</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;test&quot;</span>
<span class="token comment">#配置邮箱</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email  abc@163.com
<span class="token comment">#生成密钥对</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa
<span class="token comment">#登录验证</span>
<span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>hub 选择</p><ul><li>github —— 默认选择</li><li>BitBucket —— 私人小项目</li><li>gitee —— ！？....</li></ul><p>创建新分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">--orphan</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 创建空白分支</span>
<span class="token function">git</span> commit --allow-empty <span class="token comment"># 空提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>邮箱匿名 todo</p><p>批量修改git commit记录中的用户名和邮箱</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token function">git</span> filter-branch --env-filter <span class="token string">&#39;
OLD_EMAIL=&quot;原邮箱地址&quot;
CORRECT_NAME=&quot;新用户名&quot;
CORRECT_EMAIL=&quot;新邮箱地址&quot;

if [ &quot;$GIT_COMMITTER_EMAIL&quot; = &quot;$OLD_EMAIL&quot; ]
then
    export GIT_COMMITTER_NAME=&quot;$CORRECT_NAME&quot;
    export GIT_COMMITTER_EMAIL=&quot;$CORRECT_EMAIL&quot;
fi
if [ &quot;$GIT_AUTHOR_EMAIL&quot; = &quot;$OLD_EMAIL&quot; ]
then
    export GIT_AUTHOR_NAME=&quot;$CORRECT_NAME&quot;
    export GIT_AUTHOR_EMAIL=&quot;$CORRECT_EMAIL&quot;
fi
&#39;</span> --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--branches</span> <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> rename.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>todo 修改 commit 历史</p><ul><li>https://www.cnblogs.com/flying_bat/p/4172435.html</li><li>https://blog.csdn.net/dd121494648/article/details/102277068</li><li>https://cloud.tencent.com/developer/section/1138641</li></ul>`,11),t=[l];function c(o,d){return s(),e("div",null,t)}const u=n(i,[["render",c],["__file","index.html.vue"]]);export{u as default};
