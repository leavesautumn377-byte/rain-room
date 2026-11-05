# 素材来源

## 场景插画

六张当前场景位于 `assets/scenes/*.webp`。它们是经维护者筛选的AI生成纸艺插画，并非真实摄影；WebP用于交付压缩。动态天气与水面互动由Canvas另行绘制。

代码的MIT许可不自动替代独立素材的权利说明。

## 环境音

| 文件 | 原作品 | 来源 | 原页面许可 |
|---|---|---|---|
| `assets/audio/gentle-rain.mp3` | shelbyshark / Gentle Rain.wav | https://freesound.org/people/shelbyshark/sounds/501243/ | CC0 1.0 |
| `assets/audio/light-rain.mp3` | Q.K. / Rain_01.wav | https://freesound.org/people/Q.K./sounds/56306/ | CC0 1.0 |

原页面标明允许商业使用。许可说明：https://creativecommons.org/publicdomain/zero/1.0/

以网站提供的 HQ MP3 预览编码为来源，本地打包，运行时不访问 Freesound。Gentle Rain 原作者说明含远处雷声；本次避开了录音中明显的低频隆起片段，不作完全无雷的保证。

### 2026-11-05 雨声调整

当前交付版本经过片段筛选、低频与高频修整、响度配平和轻微瞬态限制。雨声与雨滴仍来自以上两段实录，没有新增合成雨声。

- `gentle-rain.mp3` 选取原录音 30 秒起的 23 秒，削减 180 Hz 以下的低频，柔化 7600 Hz 以上的高频。
- `light-rain.mp3` 选取原录音 0.8 秒起的 13.2 秒，削减 260 Hz 以下的低频，柔化 8000 Hz 以上的高频。
- 两层按相同目标响度处理，并限制突出的瞬态。网页继续使用交叠循环，清晰度滑块用于调节雨声底层与雨滴的比例。

交付文件校验值

- `gentle-rain.mp3` 共 553,580 bytes，SHA-256 为 `04ebfce1d35385f9a68cc584673c320b0bf8858028252dac94c6d8f0149764c2`。
- `light-rain.mp3` 共 317,996 bytes，SHA-256 为 `bc8091bd832ab7a1668e3ed2ed906291e00d7d69fa080a9ae22e33897cb413d9`。

原始预览文件的 SHA-256 分别为 `5fffe1bb4acdd51270b0fa84614be3fa354155b08f60881f4fe12fd0ff53f423` 和 `97eba2ec0bfb826268057b379b9c4d3522bba8544f21d8fd3da75a2850ada56e`。

晴日和冻湖使用柔和合成风声，结束提示音由振荡器生成。保留原始素材许可和MIT许可证正文。
