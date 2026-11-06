# 素材来源

## 场景插画

六张当前场景位于 `assets/scenes/*.webp`。它们是经维护者筛选的AI生成纸艺插画，并非真实摄影；WebP用于交付压缩。动态天气与水面互动由Canvas另行绘制。

代码的MIT许可不自动替代独立素材的权利说明。

## 环境音

### 当前使用的稀疏雨滴

雨声由 `scripts/generate-quiet-rain.mjs` 生成。以短促的柔和水滴为主，雨滴之间留出安静间隔，不铺连续的噪声雨幕，也不加音乐。较远的水滴层保持低音量。生成的音频随项目使用 MIT 许可。

脚本输出双声道 WAV 母带，交付时经过 3600 Hz 低通柔化和 MP3 编码。没有按平均响度把空白间隔抬高。网页继续交叠循环，清晰度滑块调节水滴的远近与细节。

- `gentle-rain.mp3` 共 205,340 bytes，SHA-256 为 `338e2559ab91a329ca6f9fab083425d6490a40f8dac100f1b16c8603d44c79ad`。
- `light-rain.mp3` 共 262,844 bytes，SHA-256 为 `579664bc3fa10cba6b4adcfb74bde54b2ec3ab9b751f7c68cd5a7a7682e87bdf`。

晴日和冻湖使用柔和合成风声，结束提示音由振荡器生成。

### 早期版本的录音来源

早期版本曾使用以下 CC0 录音，当前雨滴文件已改为项目脚本生成，以下仅保留素材沿革。

| 原作品 | 来源 | 原页面许可 |
|---|---|---|
| shelbyshark / Gentle Rain.wav | https://freesound.org/people/shelbyshark/sounds/501243/ | CC0 1.0 |
| Q.K. / Rain_01.wav | https://freesound.org/people/Q.K./sounds/56306/ | CC0 1.0 |

原始预览文件的 SHA-256 分别为 `5fffe1bb4acdd51270b0fa84614be3fa354155b08f60881f4fe12fd0ff53f423` 和 `97eba2ec0bfb826268057b379b9c4d3522bba8544f21d8fd3da75a2850ada56e`。
