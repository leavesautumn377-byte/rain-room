# 素材来源

## 场景插画

六张当前场景位于 `assets/scenes/*.webp`。它们是经维护者筛选的AI生成纸艺插画，并非真实摄影；WebP用于交付压缩。动态天气与水面互动由Canvas另行绘制。

代码的MIT许可不自动替代独立素材的权利说明。

## 环境音

### 当前使用的 A「雨打叶片」

- 原作品为 **Rain on leaves**，作者 **SamsterBirdies**。
- 来源 https://freesound.org/people/SamsterBirdies/sounds/584272/
- 许可为 **CC0 1.0**，全文 https://creativecommons.org/publicdomain/zero/1.0/
- 使用作者公开的高质量 MP3 预览，从第 4 秒起截取 18 秒，与已确认的 A 试听使用同一片段。
- 仅调整固定音量，网页播放时对首尾做 1.25 秒交叠循环。没有叠加其他雨声、合成雨滴、音乐或额外雷声。
- 交付文件为 `assets/audio/rain-on-leaves.mp3`，共 433,328 bytes，SHA-256 为 `113d987903eea28f28e27e124eaa67844c2312de7ee1bd9c615ede905ce5cd20`。
- 原始预览文件 SHA-256 为 `98937a7ce64e973dbaa3d7879f41500d4e15e3b8b4ea30f6b927af5bf0d53977`。

默认室外设置保留原录音音色；雨声细节滑块可调节听感远近，窗边场景会柔化声音。晴日和冻湖继续使用柔和合成风声，结束提示音由振荡器生成。

代码的 MIT 许可与声音素材的 CC0 许可分别适用。前一版合成水滴文件已移除，相关实验脚本仅保留在代码历史与开发脚本中，不参与当前播放。
