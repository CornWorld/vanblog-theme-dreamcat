# palettes/ — DreamCat 调色盘(分发载荷)

38 套调色盘(19 主色 × 亮暗)。部署方式(二选一):

1. 数据目录(推荐): 拷贝到任意目录, 容器设 `VANBLOG_PALETTES_DIR=/该目录`
   (平台原生支持, 见 vault/internal/palette/routes.go), 重启生效
2. 内置目录: 拷入镜像 /build/hooks/palettes(demo 容器即此方式)

拷入后后台「调色盘」与 /api/palette.css 即可发现全部 38 套。
