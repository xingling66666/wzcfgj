<?php
// 强制禁止缓存
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
?>

<!doctype html>
<html lang="zh-CN"> 
    <head> 
        <meta charset="UTF-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        <link crossorigin="" rel="shortcut icon" type="image/x-icon" href="./logo.jpg"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"> 
        <meta name="renderer" content="webkit"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <link rel="stylesheet" href="https://unpkg.com/mdui@2.1.4/mdui.css"> 
        <script src="https://unpkg.com/mdui@2.1.4/mdui.global.js"></script> 
        <link href="https://fonts.googleapis.cn/icon?family=Material+Icons+Outlined" rel="stylesheet"> 
        <link href="https://fonts.googleapis.cn/icon?family=Material+Icons" rel="stylesheet"> 
        <link rel="manifest" href="./manifest.json"> 
        <title>星凌王者创房工具</title> 
        <style>
        /* 点击星星特效 */
        #fjhjf {
            margin: 0 5px 5px 5px;
            flex: 0 0 33.3%;
            max-width: calc((100% - 30px) / 3)
        }
        .star-click {
            position: fixed;
            width: 40px;
            height: 40px;
            pointer-events: none;
            z-index: 9999;
            animation: starGlow 1s ease-out forwards;
            filter: drop-shadow(0 0 5px gold);
        }
        
        @keyframes starGlow {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
                opacity: 0;
            }
        }
        /* 樱花飘落特效 */
        
        .sakura {
            position: fixed;
            top: -50px;
            z-index: 9998;
            animation: fall linear infinite;
            pointer-events: none;
        }
        
        @keyframes fall {
            to {
                transform: translate(var(--end-x), 100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .myedit {
            padding: 10px;
        }
        
        .mybutton,
        .herobutton,
        .custombutton {
            margin: 0 5px 5px 5px;
            flex: 0 0 33.3%;
            max-width: calc((100% - 30px) / 3)
        }
        
        #toggle-btn {
            margin: 0 5px 5px 5px;
            flex: 0 0 33.3%;
            max-width: calc((100% - 30px) / 3)
        }
        
        .mydiv {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex;
        }
        
        .mymenu {
            margin: 0 10px 0 10px;
            max-height: 50vh;
            overflow: auto;
        }
        /* 防止点击弹窗宽度变化 */
        
        .mdui-lock-screen {
            width: unset !important;
        }
        
        .mychip {
            margin: 2px;
        }
        
         :not(:defined) {
            visibility: hidden;
        }
        
        mdui-select::part(menu) {
            max-height: 50vh;
            overflow: auto;
        }
        
        mdui-tooltip::part(popup) {
            max-width: 50vw;
        }
        
        mdui-card>mdui-dropdown>mdui-menu {
            margin-top: -10px !important;
        }
        
        mdui-menu.mymenu>mdui-text-field {
            padding: 0 5px 0 5px;
        }
        /* 当屏幕宽度大于800px时的样式 */
        
        @media (min-width: 801px) {
            .example-dialog[fullscreen],
            .custom-dialog[fullscreen],
            .peiedit[fullscreen] {
                width: 55vmax;
                margin: auto;
            }
            .example-dialog[fullscreen]::part(panel),
            .custom-dialog[fullscreen]::part(panel) {
                border-radius: var(--shape-corner);
                --shape-corner: var(--mdui-shape-corner-extra-large);
            }
            .example-dialog[fullscreen]>mdui-top-app-bar,
            .custom-dialog[fullscreen]>mdui-top-app-bar {
                border-top-left-radius: var(--mdui-shape-corner-extra-large);
                border-top-right-radius: var(--mdui-shape-corner-extra-large);
            }
        }
        
        html {
            background-color: #fff !important;
            font-family: -apple-system, BlinkMacSystemFont, Noto Sans CJK SC, Noto Sans SC, Segoe UI, system-ui, Roboto, PingFang SC, Hiragino Sans GB, Source Han Sans SC, WenQuanYi Micro Hei, WenQuanYi Zen Hei, Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        }
    </style> 
        <style>
        .myherolist {
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)) !important;
            /* 缩小列宽 */
            gap: 8px !important;
            /* 缩小间距 */
            padding: 8px !important;
        }
        
        .hero-card {
            width: 65px !important;
            /* 缩小宽度 */
            height: 70px !important;
            /* 缩小高度 */
            padding: 4px !important;
            /* 缩小内边距 */
            border-radius: 6px !important;
        }
        
        .hero-card .avatar-container {
            width: 36px !important;
            /* 缩小头像 */
            height: 36px !important;
            margin-bottom: 4px !important;
            /* 缩小间距 */
            border-width: 1px !important;
        }
        
        .hero-card .hero-name {
            font-size: 0px !important;
            /* 缩小字体 */
            line-height: 1.2 !important;
        }
        
        .hero-card .selected-indicator {
            width: 12px !important;
            /* 缩小选中指示器 */
            height: 12px !important;
            top: 2px !important;
            right: 2px !important;
        }
        
        .hero-card .selected-indicator mdui-icon {
            font-size: 10px !important;
            /* 缩小图标 */
        }
    </style> 
        <style>
         :root {
            /* 优化后的红紫色主题 */
            --mdui-color-surface: 255, 252, 251;
            /* 极浅的粉白背景 */
            --mdui-color-surface-container-high-light: 255, 248, 247;
            /* 主色调 - 优化红紫色 */
            --mdui-color-primary: 167, 45, 135;
            /* 更沉稳的红紫 */
            --mdui-color-primary-hover: 147, 35, 115;
            /* 悬停加深 */
            --mdui-color-outline: 170, 60, 145;
            /* 边界线 */
            /* 文字系统 */
            --mdui-color-on-surface: 65, 55, 60;
            /* 暖灰文字 */
            --mdui-color-on-surface-variant: 115, 95, 105;
            --mdui-color-inverse-primary: 140, 120, 130;
            /* 容器颜色 */
            --mdui-color-surface-container: 253, 246, 249;
            --mdui-color-surface-container-highest: 167, 45, 135, 0.06;
            --mdui-color-secondary-container: 167, 45, 135, 0.1;
            /* 功能色 */
            --mdui-color-error: 195, 55, 75;
            /* 光影系统 */
            --mdui-elevation-level1: 0 2px 8px rgba(167, 45, 135, 0.08);
            --mdui-elevation-level2: 0 4px 12px rgba(150, 50, 130, 0.12);
            --mdui-elevation-level3: 0 6px 16px rgba(140, 40, 120, 0.16);
            /* 形状系统 */
            --mdui-shape-corner-large: 12px;
            --mdui-shape-corner-medium: 8px;
            --mdui-shape-corner-small: 4px;
            --mdui-shape-corner-extra-small: 2px;
            /* 动效曲线 */
            --mdui-motion-duration-short: 0.22s;
            --mdui-motion-duration-medium: 0.32s;
            --mdui-motion-duration-long: 0.42s;
            --mdui-motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
            /* 输入框专用 */
            --textarea-color: rgba(120, 100, 110, 0.7);
            --textarea-focus-color: rgb(167, 45, 135);
        }
        /* ========== 颜色预设 ========== */
        
        .color-preset {
            gap: 0.5rem;
            /* 改用gap控制间距 */
        }
        
        .color-preset div {
            width: 30px;
            height: 30px;
            border-radius: var(--mdui-shape-corner-extra-small);
            border: 1px solid rgb(var(--mdui-color-outline));
            transition: transform var(--mdui-motion-duration-short) var(--mdui-motion-easing);
        }
        
        .color-preset .red {
            background-: #b83764;
        }
        
        .color-preset .purple {
            background-color: #8e44ad;
        }
        
        .color-preset .blue {
            background-color: #6c5ce7;
        }
        
        .color-preset .green {
            background-color: #2ecc71;
        }
        
        .color-preset .yellow {
            background-color: #f39c12;
        }
        
        .color-preset .grey {
            background-color: #7f8c8d;
        }
        
        .color-preset div:hover {
            transform: scale(1.12);
            box-shadow: var(--mdui-elevation-level1);
        }
        /* ========== 文本输入框 ========== */
        
        .wenben {
            width: 90%;
            min-height: 150px;
            padding: 12px;
            border: 1.5px solid var(--textarea-color);
            border-radius: var(--mdui-shape-corner-medium);
            background: rgb(var(--mdui-color-surface-container));
            box-shadow: var(--mdui-elevation-level1);
            transition: all var(--mdui-motion-duration-medium) var(--mdui-motion-easing);
            color: rgb(var(--mdui-color-on-surface));
            font-family: inherit;
            line-height: 1.5;
        }
        
        .wenben:focus {
            border-color: var(--textarea-focus-color);
            box-shadow: 0 0 0 2px rgba(167, 45, 135, 0.2);
            outline: none;
        }
        
        .wenben:hover {
            box-shadow: var(--mdui-elevation-level2);
        }
        /* ========== 按钮 ========== */
        /* 强制按钮始终为紫红色 + 圆形 */
        
        #zdwenben {
            background-color: rgb(167, 45, 135) !important;
            /* 你的紫红色 */
            color: white !important;
        }
        /* 悬停效果（可选） */
        
        #zdwenben:hover {
            background-color: rgba(167, 45, 135, 0.9) !important;
            transform: translateY(-1px);
        }
        
        #zdwenben:hover {
            background-color: rgb(var(--mdui-color-primary-hover));
            box-shadow: var(--mdui-elevation-level2);
            transform: translateY(-1px);
        }
        
        #zdwenben:active {
            transform: translateY(0);
            box-shadow: var(--mdui-elevation-level1);
        }
        /* ========== 壁纸选择 ========== */
        
        .color-wallpaper {
            height: 136px;
            border-radius: var(--mdui-shape-corner-medium);
            border: 1px solid rgb(var(--mdui-color-outline));
            background-color: rgb(var(--mdui-color-surface-container));
            transition: all var(--mdui-motion-duration-medium) var(--mdui-motion-easing);
        }
        
        .color-wallpaper:hover {
            transform: translateY(-2px);
            box-shadow: var(--mdui-elevation-level2);
        }
        /* ========== 其他微调 ========== */
        
        .color-label {
            color: rgb(var(--mdui-color-on-surface-variant));
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .color-custom {
            transition: all var(--mdui-motion-duration-short) var(--mdui-motion-easing);
        }
        
        .color-custom:hover {
            transform: scale(1.05);
            box-shadow: var(--mdui-elevation-level1);
        }
    </style> 
        <script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script> 
        <script>
        LA.init({
            id: "3N9XeJjYcWkW77Be",
            ck: "3N9XeJjYcWkW77Be"
        })
    </script>
    </head>
    <body>
         <mdui-layout style="margin:auto;max-width:100vmin"> 
            <mdui-top-app-bar class="example-top-app-bar" variant="small" style="position: absolute; top: 0px; right: 0px; left: 0px;"> 
                <mdui-linear-progress id="title"></mdui-linear-progress> 
            </mdui-top-app-bar> 
            <mdui-layout-main class="example-layout-main" style="padding: 64px 0px 0px"> 
                <mdui-card style="visibility:hidden" variant="outlined"> 
                    <mdui-segmented-button-group full-width selects="single" style="margin: 10px 10px;" value="zsf"> 
                        <mdui-segmented-button value="zsf" class="mdui-segmented-button-first">
                            正式服
                        </mdui-segmented-button> 
                        <mdui-segmented-button value="tyf" class="mdui-segmented-button-last">
                            体验服
                        </mdui-segmented-button> 
                        <mdui-segmented-button value="gjf" class="mdui-segmented-button-first">
                            国际服
                        </mdui-segmented-button> 
                    </mdui-segmented-button-group> 
                    <mdui-dropdown trigger="click" placement="auto"> 
                        <mdui-text-field slot="trigger" label="地图模式" readonly variant="outlined" class="myedit"></mdui-text-field> 
                        <mdui-menu class="mymenu" submenu-trigger="click hover"> 
                            <mdui-text-field variant="outlined" label="搜索地图模式" class="search_edit" autosize></mdui-text-field> 
                        </mdui-menu> 
                    </mdui-dropdown> 
                    <mdui-dropdown trigger="click" placement="auto"> 
                        <mdui-text-field slot="trigger" label="禁用英雄" readonly variant="outlined" class="myedit"></mdui-text-field> 
                        <mdui-menu class="mymenu" submenu-trigger="click hover"> 
                            <mdui-text-field variant="outlined" label="搜索方案" class="search_edit" autosize></mdui-text-field> 
                        </mdui-menu> 
                    </mdui-dropdown> 
                    <mdui-dropdown trigger="click" placement="auto"> 
                        <mdui-text-field slot="trigger" label="自定义配置" readonly variant="outlined" class="myedit"></mdui-text-field> 
                        <mdui-menu class="mymenu" submenu-trigger="click hover"> 
                            <mdui-text-field variant="outlined" label="搜索方案" class="search_edit" autosize></mdui-text-field> 
                        </mdui-menu> 
                    </mdui-dropdown> 
                    <textarea cols="28" rows="8" class="wenben"></textarea> 
                    <mdui-button id="zdwenben" variant="tonal" icon="egg_alt" full-width>
                        自定义复制内容
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="games">
                        创建房间
                    </mdui-button> 
                    <mdui-button id="fjhjf" icon="group">
                        房间列表
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="book">
                        教程
                    </mdui-button> 
                    <mdui-button class="mybutton" id="download" icon="file_download" style="display: none">
                        下载软件
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="group">
                        官方群
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="share">
                        友情链接
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="feedback">
                        意见反馈
                    </mdui-button> 
                    <mdui-button class="mybutton" icon="bolt" id="kjkzan">
                        快捷玩法
                    </mdui-button>  
                    <div id="kuaijiewanfa" style="display: none"> 
                    <mdui-button class="mybutton" icon="bolt">
                            无CD模式
                        </mdui-button>
                        <mdui-button class="mybutton" icon="bolt">
                            等待开发
                        </mdui-button>
                    </div> 
                    <mdui-dialog close-on-overlay-click class="example-dialog" fullscreen> 
                        <mdui-top-app-bar slot="header" variant="small"> 
                            <mdui-top-app-bar-title>
                              禁用英雄
                            </mdui-top-app-bar-title> 
                            <mdui-button variant="text">
                              关闭
                            </mdui-button> 
                        </mdui-top-app-bar> 
                        <div class="mydiv"> <mdui-dropdown trigger="click" placement="auto"> 
                              <mdui-button slot="trigger" variant="filled" class="herobutton" icon="expand_more">
                              选择方案
                              </mdui-button> 
                              <mdui-menu class="mymenu" submenu-trigger="click hover"> 
                              <mdui-text-field variant="outlined" label="搜索内容" clearable class="search_edit" autosize></mdui-text-field> 
                              </mdui-menu> 
                            </mdui-dropdown> <mdui-button variant="filled" class="herobutton" icon="add">
                              新建方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="content_copy">
                              复制方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="file_upload">
                              导入方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="delete">
                              删除方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="edit">
                              重命名方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="select_all">
                              全选
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="invert_colors">
                              反选
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="save">
                              保存方案
                            </mdui-button> <mdui-button variant="filled" class="herobutton" icon="shuffle">
                              随机禁用
                            </mdui-button> 
                        </div> 
                        <mdui-radio-group class="heromode"> 
                            <mdui-radio>
                              全部
                            </mdui-radio> 
                            <mdui-radio value="1">
                              战士
                            </mdui-radio> 
                            <mdui-radio value="2">
                              法师
                            </mdui-radio> 
                            <mdui-radio value="3">
                              坦克
                            </mdui-radio> 
                            <mdui-radio value="4">
                              刺客
                            </mdui-radio> 
                            <mdui-radio value="5">
                              射手
                            </mdui-radio> 
                            <mdui-radio value="6">
                              辅助
                            </mdui-radio> 
                        </mdui-radio-group> 
                        <div class="myherolist"></div> 
                    </mdui-dialog> 
                    <mdui-dialog close-on-overlay-click class="custom-dialog" fullscreen> 
                        <mdui-top-app-bar slot="header" variant="small"> 
                            <mdui-top-app-bar-title>
                              自定义配置
                            </mdui-top-app-bar-title> 
                            <mdui-button variant="text">
                              关闭
                            </mdui-button> 
                        </mdui-top-app-bar> 
                        <div class="mydiv"> <mdui-dropdown trigger="click" placement="auto"> 
                              <mdui-button slot="trigger" variant="filled" class="custombutton" icon="expand_more">
                              选择方案
                              </mdui-button> 
                              <mdui-menu class="mymenu" submenu-trigger="click hover"> 
                              <mdui-text-field variant="outlined" label="搜索内容" clearable class="search_edit" autosize></mdui-text-field> 
                              </mdui-menu> 
                            </mdui-dropdown> <mdui-button variant="filled" class="custombutton" icon="add">
                              新建方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="content_copy">
                              复制方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="file_upload">
                              导入方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="delete">
                              删除方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="edit">
                              重命名方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="settings">
                              高级设置
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="save">
                              保存方案
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="undo">
                              还原
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="">
                              自定义JSON开关
                            </mdui-button> <mdui-button variant="filled" class="custombutton" icon="">
                              自定义JSON
                            </mdui-button> 
                        </div> 
                        <p>如显示不全可向下滑动查看更多内容 点击选择方案选择保存的方案</p> 
                        <mdui-tabs value="tab-1"> 
                            <mdui-tab value="tab-1">
                              英雄属性
                            </mdui-tab> 
                            <mdui-tab value="tab-2">
                              兵线与野怪
                            </mdui-tab> 
                            <mdui-tab value="tab-3">
                              防御塔与水晶
                            </mdui-tab> 
                            <mdui-tab-panel slot="panel" value="tab-1" class="CustomSettings"> 
                              <mdui-radio-group value="all" class="setmode"> 
                              <mdui-radio value="all">
                              全局统一
                              </mdui-radio> 
                              <mdui-radio value="zhenying">
                              按阵营
                              </mdui-radio> 
                              <mdui-radio value="xvanshou">
                              按选手
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <mdui-radio-group value="blue" style="width: 100%;display:none" class="zhenying_xz"> 
                              <mdui-radio value="blue" checked tabindex="0">
                              蓝方
                              </mdui-radio> 
                              <mdui-radio value="red" checked tabindex="0">
                              红方
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <div class="putong"> 
                              </div> 
                              <div class="zhenying" style="display:none"> 
                              <div class="zhenying_blue"></div> 
                              <div class="zhenying_red"></div> 
                              </div> 
                              <div class="xvanshou" style="display:none"> 
                              <div class="xvanshou_blue"> <mdui-radio-group style="width: 100%" class="blueheronum"> 
                              <mdui-radio value="1" checked tabindex="0">
                              1号
                              </mdui-radio> 
                              <mdui-radio value="2" checked tabindex="0">
                              2号
                              </mdui-radio> 
                              <mdui-radio value="3" checked tabindex="0">
                              3号
                              </mdui-radio> 
                              <mdui-radio value="4" checked tabindex="0">
                              4号
                              </mdui-radio> 
                              <mdui-radio value="5" checked tabindex="0">
                              5号
                              </mdui-radio> 
                              </mdui-radio-group> 
                              </div> 
                              <div class="xvanshou_red"> <mdui-radio-group style="width: 100%" class="redheronum"> 
                              <mdui-radio value="1" checked tabindex="0">
                              1号
                              </mdui-radio> 
                              <mdui-radio value="2" checked tabindex="0">
                              2号
                              </mdui-radio> 
                              <mdui-radio value="3" checked tabindex="0">
                              3号
                              </mdui-radio> 
                              <mdui-radio value="4" checked tabindex="0">
                              4号
                              </mdui-radio> 
                              <mdui-radio value="5" checked tabindex="0">
                              5号
                              </mdui-radio> 
                              </mdui-radio-group> 
                              </div> 
                              </div> 
                            </mdui-tab-panel> 
                            <mdui-tab-panel slot="panel" value="tab-2" class="CustomSettings"> 
                              <mdui-radio-group value="all" class="setmode"> 
                              <mdui-radio value="all">
                              全局统一
                              </mdui-radio> 
                              <mdui-radio value="zhenying">
                              按阵营
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <mdui-radio-group value="blue" style="width: 100%;display:none" class="zhenying_xz"> 
                              <mdui-radio value="blue" checked tabindex="0">
                              蓝方
                              </mdui-radio> 
                              <mdui-radio value="red" checked tabindex="0">
                              红方
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <div class="putong"> 
                              </div> 
                              <div class="zhenying" style="display:none"> 
                              <div class="zhenying_blue"></div> 
                              <div class="zhenying_red"></div> 
                              </div> 
                            </mdui-tab-panel> 
                            <mdui-tab-panel slot="panel" value="tab-3" class="CustomSettings"> 
                              <mdui-radio-group value="all" class="setmode"> 
                              <mdui-radio value="all">
                              全局统一
                              </mdui-radio> 
                              <mdui-radio value="zhenying">
                              按阵营
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <mdui-radio-group value="blue" style="width: 100%;display:none" class="zhenying_xz"> 
                              <mdui-radio value="blue" checked tabindex="0">
                              蓝方
                              </mdui-radio> 
                              <mdui-radio value="red" checked tabindex="0">
                              红方
                              </mdui-radio> 
                              </mdui-radio-group> 
                              <div class="putong"> 
                              </div> 
                              <div class="zhenying" style="display:none"> 
                              <div class="zhenying_blue"></div> 
                              <div class="zhenying_red"></div> 
                              </div> 
                            </mdui-tab-panel> 
                        </mdui-tabs> 
                        <mdui-dialog class="suijitest" headline="提示" description="本弹窗一共四个输入框可供输入 如显示不全可向下滑动查看更多内容"> 
                            <mdui-text-field variant="filled" style="padding-top: 10px;" clearable label="地图模式"></mdui-text-field> 
                            <mdui-text-field variant="filled" clearable style="padding-top: 10px;" label="禁用英雄"></mdui-text-field> 
                            <mdui-text-field variant="filled" style="padding-top: 10px;" readonly value="点击编辑方案" label="随机生成数据"></mdui-text-field> 
                            <mdui-text-field variant="filled" readonly value="点击编辑方案" style="padding-top: 10px;" label="随机打乱数据"></mdui-text-field> 
                            <mdui-button slot="action" variant="text" onclick="document.getElementsByClassName(&quot;suijitest&quot;)[0].open = false">
                              取消
                            </mdui-button> 
                            <mdui-button slot="action" variant="text" onclick="entclick()">
                              确认
                            </mdui-button> 
                        </mdui-dialog> 
                        <mdui-dialog class="peiedit" description="点击下方即可编辑" fullscreen> 
                            <mdui-top-app-bar slot="header" variant="small"> 
                              <mdui-top-app-bar-title>
                              高级功能设置
                              </mdui-top-app-bar-title> 
                              <mdui-button variant="text" onclick="document.getElementsByClassName(&quot;peiedit&quot;)[0].open = false">
                              返回
                              </mdui-button> 
                            </mdui-top-app-bar> 
                        </mdui-dialog> 
                    </mdui-dialog> 
                </mdui-card> 
            </mdui-layout-main> 
        </mdui-layout>  
        <script id="LA-DATA-WIDGET" crossorigin="anonymous" charset="UTF-8" src="https://v6-widget.51.la/v6/3N9XeJjYcWkW77Be/quote.js?theme=0&amp;col=true&amp;f=12"></script> 
        <script>
        var issupport = 'any' in Promise;
        if (issupport == false) {
            const userAgent = navigator.userAgent;
            alert("你当前浏览器版本过低 请更新浏览器访问 点击确认将自动跳转浏览器下载链接")
                // macOS检测  
            if (/Macintosh|Mac OS X/.test(userAgent)) {
                window.location.replace("https://www.microsoft.com/zh-cn/edge/download")
            }
            // Windows PC检测  
            else if (/windows|win32|win64|wow32|wow64/i.test(userAgent)) {
                window.location.replace("https://www.microsoft.com/zh-cn/edge/download")
            }
            // iOS设备检测  
            else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                place("https://apps.apple.com/cn/app/id1288723196")
            }
            // Android设备检测  
            else if (/Android/.test(userAgent)) {
                window.location.replace("https://www.coolapk.com/apk/com.microsoft.emmx")
            }
            // Linux检测  
            else if (/Linux/.test(userAgent)) {
                window.location.replace("https://www.firefox.com.cn/")
            }
            // 其他设备或未知设备 
            else {
                alert("你的设备未知 请自行寻找链接")
            }
        }
    </script> 
   </script>
        <script>
        document.addEventListener('click', function(e) {
            const star = document.createElement('div');
            star.className = 'star-click';
            star.innerHTML = `
            <svg viewBox="0 0 24 24" width="100%" height="100%">
                <path fill="gold" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        `;
            star.style.left = `${e.clientX}px`;
            star.style.top = `${e.clientY}px`;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1000);
        });
        /*
           function 月饼飘落特效() {
               const sakura = document.createElement('div');
               sakura.className = 'sakura';
               const sakuraTypes = [
                   "🥮"
               ];
               const randomType = sakuraTypes[Math.floor(Math.random() * sakuraTypes.length)];
               sakura.innerHTML = randomType;
               sakura.style.left = Math.random() * 100 + 'vw';
               sakura.style.fontSize = Math.random() * 20 + 10 + 'px';
               sakura.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 80%)`; // 粉色系
               sakura.style.opacity = Math.random() * 0.5 + 0.3;
               sakura.style.setProperty('--end-x', Math.random() * 200 - 100 + 'px');
               const duration = Math.random() * 5 + 3;
               sakura.style.animationDuration = duration + 's';
               document.body.appendChild(sakura);
               setTimeout(() => {
                   sakura.remove();
               }, duration * 1000);
           }
          */
    </script> 
        <script src="myjson.js"></script>
        <script src="xingling.js?v1.7.6"></script> 
        <script src="qrcode.min.js"></script> 
        <h6>部分代码来源于AI生成</h6> 
        <center>
            <a href="https://github.com/xingling66666/wzcfgj" title="GitHub"> 
                <svg width="48" height="48" viewbox="0 0 24 24" fill="#333"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /> 
                </svg> </a> 
        </center>  
    </body>
</html>