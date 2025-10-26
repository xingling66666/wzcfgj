window.onload = function() {
  document.querySelector("mdui-layout-main").querySelector("mdui-card").style.visibility = "unset";
  const title = document.getElementById("title")
  title.outerHTML = "<mdui-top-app-bar-title style='line-height: 1.0'>星凌王者创房工具 <span onclick= '更新内容()' >[更新内容]</span><br><span style='font-size: 0.6em;'>v1.7.5</span></mdui-top-app-bar-title>";
}
if (typeof mydatajson === "undefined") {
  mdui.alert({
    headline: "提示",
    description: "错误！地图模式及英雄列表未成功加载！",
    confirmText: "确定"
  });
}

function 自定义JSON输入框() {
    try{
    mdui.prompt({
        headline: "输入JSON",
        confirmText:"确定",
        cancelText:"取消",
        onConfirm: function (zdyjsonValue) {
            window.zdyjsonsrk = zdyjsonValue
        	mdui.alert({
        headline:"提示",
        description:`自定义配置JSON已设置为：${zdyjsonsrk}` ,
        comfirmText:"确定"
    })
        }
    })
    }
    catch(error) {
        alert(error);
        }
    }
    
let 自定义JSON开关 = false
const 暗号验证开关 = "关"

function 暗号验证() {
  mdui.prompt({
    headline: "输入暗号",
    onCancel: () => 暗号验证(),
    description: "请输入暗号进行验证",
    confirmText: "确定",
    cancelText: "",
  }).then((inputValue) => {
    fetch('anhao.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'anhao=' + encodeURIComponent(inputValue)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        mdui.snackbar({ message: data.message || '验证失败' });
        暗号验证();
      } else {
        mdui.snackbar({ message: '验证成功！' });
        localStorage.setItem("已验证","true");
      }
    })
    .catch(error => {
      console.error('验证出错:', error);
      mdui.snackbar({ message: '验证出错，请稍后再试！' });
      暗号验证();
    });
  });
}
if(localStorage.getItem("已验证") !== "true" && 暗号验证开关 === "开" ) {
  暗号验证();
}


function 更新内容(判断是否为自动调用) {
  let 判断是否可关闭 = false; // 为false时代表不可关闭
  let 秒后可关闭 = "秒后可关闭";
  if (!判断是否为自动调用) {
    判断是否可关闭 = true;
    秒后可关闭 = "";
  }
  let time = 判断是否为自动调用 ? 3: ""; // 自动调用时5秒，手动调用时为空字符串
  // 创建对话框内容
  const dialogContent = `
  <div style="max-height: 60vh; overflow-y: auto; padding: 0 8px;">
  <mdui-list>
  <mdui-list-item>
  <mdui-icon-announcement slot="start"></mdui-icon-announcement>
  <div style="line-height: 1.6;">
  <div style="font-weight: 500; color: var(--mdui-color-primary);">
  <h3 style="margin: 0 0 8px 0; color: var(--mdui-color-primary);">1.7.5版本更新</h3>
  <ul style="margin: 0; padding-left: 20px;">
  <li style="margin-bottom: 6px;">新增房间列表</li>
  <li style="margin-bottom: 6px;">修复了快捷玩法功能中二维码不显示的问题</li>
  </ul>
  <p>星凌王者创房工具</p>
  </div>
  <div style="font-size: 0.875rem; color: var(--mdui-color-on-surface-variant); margin-top: 8px;">
  更新时间：2025/10/24
  <p id='miaoshu'>${time}${秒后可关闭}</p>
  </div>
  </div>
  </mdui-list-item>
  <mdui-divider style="margin: 12px 0;"></mdui-divider>
  <mdui-list-item>
  <mdui-icon-info slot="start"></mdui-icon-info>
  <div style="line-height: 1.6;">
  <div style="font-weight: 500; color: var(--mdui-color-primary); margin-bottom: 4px;">
  温馨提示
  </div>
  <div style="font-size: 0.875rem; color: var(--mdui-color-on-surface-variant);">
  如有任何问题或建议，可通过官方群或「意见反馈」功能进行反馈。
  </div>
  </div>
  </mdui-list-item>
  </mdui-list>
  </div>
  `;
  // 创建对话框
  const dialog = mdui.dialog({
    headline: '📢 更新内容',
    description: '最新版本更新内容',
    body: dialogContent,
    actions: [{
      text: '关闭',
      onClick: function() {
        if (!判断是否可关闭) {
          return false; // 阻止关闭
        }
        localStorage.setItem('v1.7.5更新内容被查看', 'true');
        return true; // 允许关闭
      }
    },
      {
        text: '加入官方群',
        onClick: function() {
          window.location.href = "https://qun.qq.com/universal-share/share?ac=1&authKey=mQ8EYm2W5P3LT97CsyCm5waKZPSia07Z6VMsjGXxA5c8maSqvZq8XY4%2Bp3Nqq%2F4I&busi_data=eyJncm91cENvZGUiOiIxMDM2NDIxNDA0IiwidG9rZW4iOiJXNHV5WWJENWxoR0F1R1NyQ3B5eVhPdE5iVEVwTWUxV3BxSVhhUXphNnVscWpqb1VMQVo4dTR1anFsM0p2eVI1IiwidWluIjoiMjgyNjMzNDMxIn0%3D&data=k2uPOyOxiIZzLqqw5WGEunBr6vN8FAijGpFAPtI6WJoO76NCb2wH6SKz0C_5KwKXSnmNPaMu1NK6df5ZndiBVA&svctype=4&tempid=h5_group_info";
          return true;
        }
      }],
    modal: true,
    fullWidth: true,
    styles: {
      '--mdui-dialog-headline-color': 'var(--mdui-color-primary)',
      '--mdui-dialog-supporting-text-color': 'var(--mdui-color-on-surface-variant)',
      '--mdui-dialog-width': 'min(95vw, 600px) !important',
      '--mdui-dialog-max-width': 'none !important',
      '--mdui-dialog-border-radius': '12px !important'
    }
  });
  // 倒计时逻辑（仅在自动调用时执行）
  if (判断是否为自动调用) {
    const timer = setInterval(function() {
      time -= 1;
      const miaoshu = document.getElementById("miaoshu");
      if (miaoshu) {
        miaoshu.innerHTML = `${time}秒后可关闭`;
      }
      if (time <= 0) {
        判断是否可关闭 = true;
        if (miaoshu) {
          miaoshu.innerHTML = "现在可以关闭了";
        }
        clearInterval(timer); // 清除定时器
      }
    },
      1000);
  }
}
// 只在未查看过更新内容时显示
if (localStorage.getItem('v1.7.5更新内容被查看') !== 'true') {
  更新内容(true);
}
const tip1 = "没有配置 请先新建配置"
const tip2 = "没有配置 请先新建配置"
const tip3 = "导入成功 请自行保存配置"
const tip4 = "请输入想要修改的配置名"
const tip5 = "请选择配置"
if (localStorage.getItem("gamemode")) {
  document.getElementsByTagName("mdui-segmented-button-group")[0].value = localStorage.getItem("gamemode")
} else {
  document.getElementsByTagName("mdui-segmented-button-group")[0].value = "正式服"
}
if (localStorage.getItem("mapmode")) {
  document.querySelectorAll(".myedit")[0].value = localStorage.getItem("mapmode")
}
if (localStorage.getItem("banheros")) {
  if (localStorage.getItem("custom_heros")) {
    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
    for (item in heros_json) {
      if (item == localStorage.getItem("banheros")) {
        document.querySelectorAll(".myedit")[1].value = localStorage.getItem("banheros")
      }
    }
  }
}
if (localStorage.getItem("customs")) {
  document.querySelectorAll(".myedit")[2].value = localStorage.getItem("customs")
}
if (localStorage.getItem("wzzdy_mycustomthemecolor")) {
  document.getElementsByClassName("color-custom")[0].value = localStorage.getItem("wzzdy_mycustomthemecolor")
}
if (localStorage.getItem("wzzdy_copyrule") == null) {
  localStorage.setItem("wzzdy_copyrule", "url")
}
const 房间列表按钮 = document.getElementById("fjhjf")
const buttons = document.querySelectorAll(".mybutton")
let work_message = "null"

function 打开链接(url) {
  var zsfappsdk = "tencentmsdk1104466820://"
  var tyfappsdk = "tencentmsdk1104791911://"
  var gjfappsdk = "tencent102083272://"    
  //使用条件语句进行判断当前是在QQ中打开网站......
  if (navigator.userAgent.indexOf("QQ/") !== -1) {
    // 如果在QQ中尝试启动正式服，就使用官方h5页面进行中转打开游戏
    if (url.includes(zsfappsdk)) {
      url = url.replace(new RegExp(zsfappsdk, 'g'), 'https://h5.nes.smoba.qq.com/pvpesport.web.user/#/launch-game-mp-qq');
      console.log(url)
    }
    // 如果在QQ中尝试启动体验服.......就直接提示用户
    else if (url.includes(tyfappsdk)) {
      mdui.alert({
        headline: "提示",
        description: "QQ中无法打开体验服，请到浏览器启动体验服", confirmText: "确定"
      })
      return;
    }
  else if (url.includes(gjfappsdk)) {
      mdui.alert({
        headline: "提示",
        description: "QQ中无法打开国际服，请到浏览器启动体验服", confirmText: "确定"
      })
      return;
    }
  }
  window.location.href = url;
  mdui_snackbar( {
    message: "已尝试启动 如没反应请检查是否已安装该应用或检查浏览器是否允许打开应用",
    action: "确定",
    onActionClick: () => console.log("click action button")
  });
}

function checkGameMode(modeName, serverType) {
  const maptip1 = "当前地图模式暂时未开启，请重新选择"
  const maptip2 = "当前地图模式只在星期五至星期日开放，请重新选择"
  const maptip3 = "当前地图模式暂时只在正式服开启，请重新选择"
  const maptip4 = "当前地图模式暂时只在体验服开启，请重新选择"
  const gameModes = [{
    keyword: "克隆",
    isOpen: () => [5,
      6,
      0].includes(new Date().getDay()),
    tip: maptip2,
  },
    {
      keyword: "契约",
      isOpen: () => [5,
        6,
        0].includes(new Date().getDay()),
      tip: maptip2,
    },
  ];
  const matchedMode = gameModes.find((mode) => modeName.includes(mode.keyword));
  if (matchedMode) {
    const isOpen = matchedMode.isOpen(serverType);
    if (!isOpen) {
      mdui.alert({
        headline: "提示",
        description: matchedMode.tip,
        confirmText: "确定",
        onConfirm: () => console.log("confirmed"),
      });
      console.log(`${modeName} 已关闭`);
      return true;
    }
    return false;
  } else {
    console.log(`未找到对应的游戏模式：${modeName}`);
    return false;
  }
}

function getRandomElements(arr, n) {
  arr = arr.slice(); //创建原始数组的副本，避免修改原数组
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i],
      arr[j]] = [arr[j],
      arr[i]]; //交换元素
  }
  return arr.slice(0, n);
}
let customRoomConfig = null;

function 生成链接(func) {
  var mode = document.getElementsByTagName("mdui-segmented-button-group")[0].value;
  var url;
  var gamezonesuit;

  // 添加prompt让用户输入AddPos的值
  mdui.prompt({
    headline: "设置位置",
    description: "请输入进入房间的位置（以蓝方计算）比如1就是蓝方1号位，以此类推，如果输入的值超过了蓝方最大人数，那么会自动切换到红方阵营，比如您创建了一个5v5房间，那么此时您输入6，会进入红方一号位",
    confirmText: "确定",
    cancelText: "取消",
    defaultValue: "0",
    onConfirm: (value) => {
      // 输入验证
      if (value === "" || isNaN(value)) {
        mdui.alert({
          headline: "提示",
          description: "必须输入有效数字",
          confirmText: "确定"
        });
        return;
      }

      let 判断位置 = parseInt(value) - 1;
      if (判断位置 < 0) 判断位置 = 0;

      // 游戏服判断
      if (mode == "zsf") {
        url = "tencentmsdk1104466820://?gamedata=SmobaLaunch_";
        window.gamezonesuit = "正式服";
      } else if (mode == "tyf") {
        window.gamezonesuit = "体验服";
        url = "tencentmsdk1104791911://?gamedata=SmobaLaunch_";
      }
      else if (mode == "gjf") {
          window.gamezonesuit = "国际服"
          url = "tencent102083272://?gamedata=SmobaLaunch_"
          }
       else {
        mdui_snackbar( {
          message: "请选择游戏！",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        return false;
      }

      // 创建基本alljson对象
      var alljson = {
        "createType": "2",
        "mapID": "待填入mapid",
        "ullRoomid": "待填入roomid",
        "mapType": "待填入maptype",
        "ullExternUid": "待填入uid",
        "roomName": "1",
        "teamerNum": "待填入人数",
        "platType": "2",
        "firstCountDownTime": "0",
        "secondCountDownTime": "17",
        "AddType": "2",
        "OfflineRelayEntityID": "",
        "openAICommentator": "1",
        "banHerosCamp1": [],
        "banHerosCamp2": [],
        "customDefineItems": []
      };
      if(自定义JSON开关 !== false && window.zdyjsonsrk) {
    try {
        // 解析JSON字符串为对象
        let customJson = JSON.parse(window.zdyjsonsrk);
        
        // 确保必要的字段存在
        if (!customJson.createType) customJson.createType = "2";
        if (!customJson.mapID) customJson.mapID = "待填入mapid";
        if (!customJson.ullRoomid) customJson.ullRoomid = "待填入roomid";
        if (!customJson.mapType) customJson.mapType = "待填入maptype";
        if (!customJson.ullExternUid) customJson.ullExternUid = "待填入uid";
        if (!customJson.roomName) customJson.roomName = "1";
        if (!customJson.teamerNum) customJson.teamerNum = "待填入人数";
        if (!customJson.platType) customJson.platType = "2";
        
        // 合并到alljson，保留后续代码添加的字段
        alljson = {...alljson, ...customJson};
        
        console.log("使用自定义JSON配置:", alljson);
        
    } catch (error) {
        mdui.alert({
            headline: "JSON解析错误",
            description: `自定义JSON格式不正确: ${error.message}`,
            confirmText: "确定"
        });
        return; // 停止执行
    }
}
      var edittab = document.querySelectorAll(".myedit");
      var mapname = edittab[0].value.replace(/\s+/g, "");

      // 获取地图信息
      if (isNaN(mapname)) {
        mapid = mydatajson[0][mapname];
        alljson.mapID = mapid[0];
        alljson.mapType = mapid[1];
        alljson.teamerNum = mapid[2];

        // 计算最大位置和阵营
        let maxPosition = Math.floor(mapid[2] / 2);
        let 阵营 = 1; // 默认蓝方

        if (判断位置 >= maxPosition) {
          阵营 = 2; // 红方
          判断位置 -= maxPosition
          mdui_snackbar( {
            message: `已自动调整为红方阵营`,
            action: "确定"
          });
        }

        // 验证位置是否有效
        if (判断位置 >= mapid[2]) {
          mdui_snackbar( {
            message: `错误！输入值已超出当前地图模式最大人数`,
            action: "确定"
          });
          return;
        }

        // 设置位置和阵营
        alljson.AddPos = 判断位置;
        alljson.campid = 阵营;
      } else {
        mdui.alert({
          headline: "提示",
          description: "地图模式获取失败！请在确保选择地图模式后重试",
          confirmText: "确定"
        })
        return;
      }
      // 检查游戏模式
      if (checkGameMode(mapname, mode)) {
        return;
      }

      // 处理普通房间
      if (mapname.includes("普通房间")) {
        alljson = {
          "createType": "2",
          "mapID": mapid[0],
          "ullRoomid": "待填入roomid",
          "mapType": mapid[1],
          "ullExternUid": "待填入roomid",
          "roomName": "1",
          "platType": "4",
          "campid": alljson.campid || 1,
          // 保留之前的阵营设置
          "AddPos": 判断位置,
          "AddType": "2"
        };
        window.myheros = "无";

        var Rand = Math.random();
        var mineId = Math.round(Rand * 1000000000000000000);
        alljson.ullExternUid = mineId;
        alljson.ullRoomid = mineId;

        var alljson_str = JSON.stringify(alljson);
        var openurl = url + btoa(alljson_str);

        if (func) {
          func(openurl, "确认启动游戏？");
          return;
        }

        mdui.confirm({
          headline: "提示",
          description: "确认启动游戏？",
          confirmText: "继续",
          cancelText: "取消",
          onConfirm: () => {
            window.openurl = openurl;
            打开链接(openurl);
          },
          onCancel: () => console.log("canceled"),
        });
        return;
      }

      // 处理不可自定义地图
      if (mapname.includes("不可自定义")) {
        var myalljson = {
          "createType": "2",
          "mapID": mapid[0],
          "ullRoomid": "待填入roomid",
          "mapType": mapid[1],
          "ullExternUid": "待填入roomid",
          "roomName": "1",
          "platType": "4",
          "campid": alljson.campid || 1,
          // 保留之前的阵营设置
          "AddPos": 判断位置,
          "AddType": "2"
        };

        var Rand = Math.random();
        var mineId = Math.round(Rand * 1000000000000000000);
        myalljson.ullExternUid = mineId;
        myalljson.ullRoomid = mineId;

        var alljson_str = JSON.stringify(myalljson);
        var openurl = url + btoa(alljson_str);
        var tiptext = "此地图仅提供开房间，不可无CD哦 确认启动游戏？";

        window.myheros = "无";

        if (func) {
          func(openurl, tiptext);
          return;
        }

        mdui.confirm({
          headline: "提示",
          description: tiptext,
          confirmText: "继续",
          cancelText: "取消",
          onConfirm: () => {
            window.openurl = openurl;
            打开链接(openurl);
          },
          onCancel: () => console.log("canceled"),
        });
        return;
      }

      // 处理英雄选择
      var heros = edittab[1].value.replace(/\s+/g, "");
      var oheros;
      var omapname;
      var custom = edittab[2].value;

      // 处理自定义配置
      if (isJSON(custom)) {
        var custom_json = JSON.parse(custom);
        alljson.customDefineItems = custom_json;
      } else if (localStorage.getItem("custom_cof")) {
        var customjson = JSON.parse(localStorage.getItem("custom_cof"));
        if (customjson[edittab[2].value]) {
          var myjson = JSON.parse(customjson[edittab[2].value].myjson);
          var json_herolist = myjson[0];
          var json_bxlist = myjson[1];
          var json_yglist = myjson[2];
          var json_fytlist = myjson[3];
          var json_sjlist = myjson[4];

          if (customjson[edittab[2].value].myjson) {
            mysjson = customjson[edittab[2].value].adjson;
            if (typeof mysjson == "undefined") {
              mysjson = ["",
                "",
                "",
                ""];
            }
            if (mysjson[0] != "") {
              omapname = mysjson[0];
            }
            if (mysjson[1] != "") {
              oheros = mysjson[1];
            }
          }
          try {
            var custom_json = makejson(json_herolist, json_bxlist, json_yglist, json_fytlist, json_sjlist, mysjson);
            alljson.customDefineItems = custom_json;
          } catch (error) {
            console.log(error);
            mdui.alert({
              headline: "提示",
              description: "合成自定义配置时出错 错误信息：" + error,
              confirmText: "确定",
            });
            return;
          }
        }
      }

      if (omapname) {
        mapname = omapname;
      }

      if (oheros) {
        heros = oheros;
      }

      // 处理英雄选择
      let banheros = [];
      if (heros.includes("suiji")) {
        let allbanheros = [];
        let [tag,
          num,
          name] = heros.split("|");
        window.myheros = Object.values(mydatajson[1]);
        name = name.split(",").map(function (item) {
          return '|' + item;
        });
        const keywordPattern = new RegExp(name.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
        banheros = getRandomElements(myheros.filter(item => keywordPattern.test(item)), num);
        let banheros_str = banheros.join(",");

        for (item in mydatajson[1]) {
          let value = mydatajson[1][item];
          if (banheros_str.includes(value)) {
            allbanheros.push(item);
          }
        }

        heros = allbanheros.join(" ");
        banheros = banheros.map(item => item.split('|')[0]);
      } else {
        for (item in mydatajson[1]) {
          if (heros.includes(item)) {
            var hero = mydatajson[1][item].split('|')[0];
            banheros.push(hero);
          }
        }
      }

      if (banheros.length == 0) {
        window.myheros = "无";
      } else {
        window.myheros = heros;
        alljson.banHerosCamp1 = banheros;
        alljson.banHerosCamp2 = banheros;
      }

      alljson.firstCountDownTime = "6666666666";

      var Rand = Math.random();
      var mineId = Math.round(Rand * 1000000000000000000);
      alljson.ullExternUid = mineId;
      alljson.ullRoomid = mineId;

      var alljson_str = JSON.stringify(alljson);
      var openurl = url + btoa(alljson_str);
      var tiptext = "确认启动游戏？";

      if (Object.keys(alljson.customDefineItems).length == 0) {
        tiptext = "自定义配置为空 是否继续？";
      }

      if (func) {
        func(openurl, tiptext);
        return;
      }

      mdui.confirm({
        headline: "提示",
        description: tiptext,
        confirmText: "继续",
        cancelText: "取消",
        onConfirm: () => {
          window.openurl = openurl;
          打开链接(openurl);
        },
        onCancel: () => console.log("canceled"),
      });
    },
    onCancel: () => {
      console.log("用户取消了操作");
    }
  });
}
let 快捷玩法json

function 快捷玩法(func) {
  window.myheros = "鲁班七号 芈月 甄姬 李白 武则天 貂蝉 后羿 李元芳 太乙真人 元歌 上官婉儿 云中君 海月 敖隐 影"
  var mode = document.getElementsByTagName("mdui-segmented-button-group")[0].value;
  var url;
  var gamezonesuit;
  // 添加prompt让用户输入AddPos的值
  mdui.prompt({
    headline: "设置位置",
    description: "请输入进入房间的位置（以蓝方计算）比如1就是蓝方1号位，以此类推，如果输入的值超过了蓝方最大人数，那么会自动切换到红方阵营，比如您创建了一个5v5房间，那么此时您输入6，会进入红方一号位",
    confirmText: "确定",
    cancelText: "取消",
    defaultValue: "0",
    onConfirm: (value) => {
      // 输入验证
      if (value === "" || isNaN(value)) {
        mdui.alert({
          headline: "提示",
          description: "必须输入有效数字",
          confirmText: "确定"
        });
        return;
      }
      let 判断位置 = parseInt(value) - 1;
      if (判断位置 < 0) 判断位置 = 0;
      // 游戏服判断
      if (mode == "zsf") {
        url = "tencentmsdk1104466820://?gamedata=SmobaLaunch_";
        window.gamezonesuit = "正式服";
      } else if (mode == "tyf") {
       window.gamezonesuit = "体验服";
        url = "tencentmsdk1104791911://?gamedata=SmobaLaunch_";
      }
      else if(mode == "gjf") {
      	window.gamezonesuit = "国际服"
          url = "tencent102083272://?gamedata=SmobaLaunch_"
      }
       else {
        mdui_snackbar( {
          message: "请选择游戏！",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        return false;
      }
      // 创建基本alljson对象 - 保留快捷玩法的默认配置
      var alljson = 快捷玩法json
      var edittab = document.querySelectorAll(".myedit");
      var mapname = edittab[0].value.replace(/\s+/g, "");

      // 获取地图信息
      if (isNaN(mapname)) {
        mapid = mydatajson[0][mapname];
        alljson.mapID = mapid[0];
        alljson.mapType = mapid[1];
        alljson.teamerNum = mapid[2];
        // 计算最大位置和阵营
        let maxPosition = Math.floor(mapid[2] / 2);
        let 阵营 = 1; // 默认蓝方
        if (判断位置 >= maxPosition) {
          阵营 = 2; // 红方
          判断位置 -= maxPosition
          mdui_snackbar( {
            message: `已自动调整为红方阵营`,
            action: "确定"
          });
        }
        // 验证位置是否有效
        if (判断位置 >= mapid[2]) {
          mdui_snackbar( {
            message: `错误！输入值已超出当前地图模式最大人数`,
            action: "确定"
          });
          return;
        }
        // 设置位置和阵营
        alljson.AddPos = 判断位置;
        alljson.campid = 阵营;
      } else {
        mdui.alert({
          headline: "提示",
          description: "地图模式获取失败！请在确保选择地图模式后重试",
          confirmText: "确定"
        });
        return;
      }

      // 检查游戏模式
      if (checkGameMode(mapname, mode)) {
        return;
      }

      // 处理普通房间
      if (mapname.includes("普通房间")) {
        alljson = {
          "createType": "2",
          "mapID": mapid[0],
          "ullRoomid": "待填入roomid",
          "mapType": mapid[1],
          "ullExternUid": "待填入roomid",
          "roomName": "1",
          "platType": "4",
          "campid": alljson.campid || 1,
          // 保留之前的阵营设置
          "AddPos": 判断位置,
          "AddType": "2"
        };
        window.myheros = "无";
        var Rand = Math.random();
        var mineId = Math.round(Rand * 1000000000000000000);
        alljson.ullExternUid = mineId;
        alljson.ullRoomid = mineId;
        var alljson_str = JSON.stringify(alljson);
        var openurl = url + btoa(alljson_str);
        if (func) {
          func(openurl, "确认启动游戏？");
          return;
        }
        mdui.confirm({
          headline: "提示",
          description: "确认启动游戏？",
          confirmText: "继续",
          cancelText: "取消",
          onConfirm: () => {
            window.openurl = openurl;
            打开链接(openurl);
          },
          onCancel: () => console.log("canceled"),
        });
        return;
      }

      // 处理不可自定义地图
      if (mapname.includes("不可自定义")) {
        var myalljson = {
          "createType": "2",
          "mapID": mapid[0],
          "ullRoomid": "待填入roomid",
          "mapType": mapid[1],
          "ullExternUid": "待填入roomid",
          "roomName": "1",
          "platType": "4",
          "campid": alljson.campid || 1,
          // 保留之前的阵营设置
          "AddPos": 判断位置,
          "AddType": "2"
        };
        var Rand = Math.random();
        var mineId = Math.round(Rand * 1000000000000000000);
        myalljson.ullExternUid = mineId;
        myalljson.ullRoomid = mineId;
        var alljson_str = JSON.stringify(myalljson);
        var openurl = url + btoa(alljson_str);
        var tiptext = "此地图仅提供开房间，不可无CD哦 确认启动游戏？";
        window.myheros = "无";
        if (func) {
          func(openurl, tiptext);
          return;
        }
        mdui.confirm({
          headline: "提示",
          description: tiptext,
          confirmText: "继续",
          cancelText: "取消",
          onConfirm: () => {
            window.openurl = openurl;
            打开链接(openurl);
          },
          onCancel: () => console.log("canceled"),
        });
        return;
      }


      alljson.firstCountDownTime = "6666666666";
      var Rand = Math.random();
      var mineId = Math.round(Rand * 1000000000000000000);
      alljson.ullExternUid = mineId;
      alljson.ullRoomid = mineId;

      var alljson_str = JSON.stringify(alljson);
      var openurl = url + btoa(alljson_str);
      var tiptext = "确认启动游戏？";

      if (func) {
        func(openurl, tiptext);
        return;
      }

      mdui.confirm({
        headline: "提示",
        description: tiptext,
        confirmText: "继续",
        cancelText: "取消",
        onConfirm: () => {
          window.openurl = openurl;
          打开链接(openurl);
        },
        onCancel: () => console.log("canceled"),
      });
    },
    onCancel: () => {
      console.log("用户取消了操作");
    }
  });
}


function GetModeStr(openurl) {
  function extractNumbers(str) {
    const regex = /_(\d+)/g;
    let match;
    let result = [];
    while ((match = regex.exec(str)) !== null) {
      // 匹配到的数字位于match[1]，因为(\d+)是第一个捕获组
      result.push(Number(match[1]));
    }
    return result;
  }
  var mapnametable = {};
  var maptable = mydatajson[0]
  for (const key in maptable) {
    const valueArray = maptable[key];
    mapnametable[valueArray[0]] = [key,
      valueArray[2]];
  }
  //补全
  mapnametable[1010] = ["快速赛",
    10]
  mapnametable[20031] = ["小峡谷",
    10]
  mapnametable[25001] = ["1v1对抗路",
    2]
  mapnametable[25002] = ["1v1中路",
    2]
  mapnametable[25003] = ["1v1发育路",
    2]
  mapnametable[20910] = ["5v5征兆0ban位",
    10];
  mapnametable[20009] = ["火焰山大作战",
    10]
  mapnametable[20012] = ["克隆模式",
    10]
  mapnametable[20019] = ["契约之战",
    10]
  mapnametable[20017] = ["无限乱斗",
    10]
  mapnametable[90001] = ["梦境大乱斗",
    10]
  mapnametable[4010] = ["变身大乱斗",
    10]
  mapnametable[5121] = ["觉醒之战",
    10]
  mapnametable[5153] = ["多重施法",
    10]
  mapnametable[5155] = ["双人同舞",
    10]
  mapnametable[99988] = ["神祈战场",
    20]
  const gamedata = openurl.split(/gamedata=(.+)/)[1];
  const mapid = extractNumbers(gamedata)[9]
  if (mapnametable[mapid]) {
    var mapname = mapnametable[mapid][0]
  } else {
    var mapname = "地图id:" + mapid
  }
  if (/ShareRoom/.test(gamedata)) {
    roomtype = "房间"
  } else if (/ShareTeam/.test(gamedata)) {
    roomtype = "组队"
  } else {
    roomtype = "未知"
  }
  return mapname + roomtype
}

function replaceContent(str, replaceurl, replacepos, openurl) {
  console.log("未处理前:" + str)

  function showcopytipdia() {
    mdui.alert({
      headline: "提示",
      description: "生成规则不能为空 已帮你恢复默认生成规则",
      confirmText: "确定",
      onConfirm: () => console.log("confirmed"),
    });
  }
  const parts = str.split('|||');
  // 如果数组长度大于1，说明包含分隔符，返回左右两侧的数据
  if (parts.length > 1) {
    str = parts[replacepos]
    //转换法不支持属性的提示
    if (replacepos == 1) {
      let keywords = ['hero',
        'ban',
        'custom'];
      if (keywords.some(keyword => str.includes(keyword))) {
        mdui.alert({
          headline: "提示",
          description: "针对转换法 暂不支持以下内容 建议删除以下配置 " + keywords.join(" "),
          confirmText: "确定",
          onConfirm: () => console.log("confirmed"),
        });
      }
    }
    if (str == "") {
      str = "url"
      parts[replacepos] = str
      showcopytipdia()
      localStorage.setItem("wzzdy_copyrule", parts[0] + "|||" + parts[1])
    }
  } else {
    if (str == "") {
      str = "url"
      showcopytipdia()
      localStorage.setItem("wzzdy_copyrule", str)
    }
  }
  if (str.includes("url") == false) {
    mdui.alert({
      headline: "过于逆天的复制规则",
      description: "你必须要至少在规则内添加url才能生效 已自动使用默认规则 并没有清空你的错误规则 请自行修改规则后重试",
      confirmText: "确定",
      onConfirm: () => console.log("confirmed"),
    });
    return replaceurl
  }
  var customjson = JSON.parse(localStorage.getItem("custom_cof"))
  if (document.querySelectorAll(".myedit")[2].value != "" && customjson[document.querySelectorAll(".myedit")[2].value]) {
    if (customjson[document.querySelectorAll(".myedit")[2].value].myjson) {
      mysjson = customjson[document.querySelectorAll(".myedit")[2].value].adjson
      if (typeof mysjson == "undefined") {
        mysjson = ["",
          "",
          "",
          ""]
      }
      console.log(mysjson)
      let modename = mysjson[0]
      if (modename != "") {
        str = str.replace(/mode/g, modename);
      }
      let banheros = mysjson[1]
      if (banheros != "") {
        //如果存在ban就替换hero
        if (str.includes("ban")) {
          str = str.replace(/hero/g, "无禁用英雄配置名");
        } else {
          str = str.replace(/hero/g, "禁用英雄:" + myheros);
        }
        mdui.alert({
          headline: "提示",
          description: "当前配置包含高级配置的英雄配置 无法获取配置名 已自动替换为禁用英雄配置 配置中的ban(禁用英雄配置) 将会在本次自动被替换为空 防止重复",
          confirmText: "确定",
        });
      }
    }
  }
  let mode
  if (openurl.includes("tencentmsdk1104466820")) {
    mode = "正式服"
  } else if (openurl.includes("tencentmsdk1104791911")) {
    mode = "体验服"
  }
  str = str.replace(/url/g, replaceurl);
  str = str.replace(/gametype/g, mode);
  //转换法需要特殊判断
  if (replacepos == 1) {
    str = str.replace(/mode/g, GetModeStr(openurl));
    return str
  }
  str = str.replace(/mode/g, document.querySelectorAll(".myedit")[0].value);
  str = str.replace(/hero/g, document.querySelectorAll(".myedit")[1].value);
  str = str.replace(/ban/g, myheros);
  str = str.replace(/custom/g, document.querySelectorAll(".myedit")[2].value);
  str = str.replace(/\\n/g, '\n');
  console.log("处理后:" + str)
  return str;
}

function showqr(url, func) {
  let handleResize
  mdui.confirm({
    headline: "您可通过二维码分享或进入王者房间",
    description: "点击确定将打开游戏",
    body: '<img>',
    confirmText: "确定",
    cancelText: "取消",
    onConfirm: () => func(),
    onCancel: () => console.log("canceled"),
    onOpen: (dia) => {
      // 添加一个img元素
      dia.bodyRef.value.appendChild(document.createElement('img'))
      let timeoutId;
      handleResize = function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          dia.updateComplete.then(() => {
            let img = dia.bodyRef.value.querySelector("img")
            let div = document.createElement("div");
            let size = dia.bodyRef.value.clientWidth
            var qrcode = new QRCode(div, {
              width: size,
              height: size
            });
            qrcode.makeCode(url);
            let dataurl = div.querySelector("canvas").toDataURL()
            img.src = dataurl
          })
        }, 100);
      }
      window.addEventListener('resize', handleResize);
      handleResize()
      复制文本(复制内容处理(url))
    },
    onClose: () => {
      window.removeEventListener('resize', handleResize);
    },
  });
}
房间列表按钮.onclick = function () {
window.location.href = "/allroom.php";
}

buttons[0].onclick = async function() {
  // 检查维护消息
  if (work_message != "null") {
    mdui_snackbar( {
      message: work_message,
      action: "确定"
    });
    return;
  }
  const handleShareRoom = async() => {
    const generateFinalUrl = async(openurl) => {
      console.log("=== 开始生成房间 ===");
      console.log("1. 原始游戏启动URL:", openurl);
      // 关键修改：不对游戏协议链接进行编码
      const fullUrl = `${window.location.origin}/joinroom.html?data=${openurl}`;
      console.log("2. 进房页面URL（保持原始协议）:", fullUrl);
      try {
        const response = await fetch('/fjcl.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `url=${fullUrl}` // 不编码协议链接
        });
        console.log("3. 响应状态:", response.status);
        if (!response.ok) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        const data = await response.json();
        console.log("4. JSON解析成功:", data);
        if (!data.success || !data.room_id) {
          throw new Error(data.error || '服务器返回失败');
        }
        const shareUrl = `${window.location.origin}/room.php?id=${data.room_id}`;
        console.log("5. 最终分享链接:", shareUrl);
        return shareUrl;
      } catch (error) {
        console.error("请求出错:", error);
        throw error;
      }
    };
    // 分享选项展示
    const showShareOptions = (url, openurl) => {
      mdui.dialog({
        headline: "分享房间",
        body: `
        <div style="color: var(--mdui-color-on-surface-variant); margin-bottom: 16px;">
        <strong>请选择分享方式</strong><br>
        <span style="font-size: 0.875rem;">注：分享房间的方式同样也是进房间的方式。</span>
        <div style="margin-top: 8px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
        </div>
        </div>
        `,
        actions: [{
          text: "复制链接并进入游戏",
          onClick: () => {
            const createTime = localStorage.getItem('lastFunctionCallTime') || "未知时间";
            复制文本(复制内容处理(url));
            打开链接(openurl); // 直接使用原始协议链接
          }
        }, {
          text: "二维码分享",
          onClick: () => {
            const dialog = mdui.dialog({
              headline: "扫描二维码加入",
              body: '<div id="qrcode-container" style="display: flex; justify-content: center;"></div>',
              actions: [{
                text: "打开游戏",
                onClick: function() {
                  打开链接(openurl); // 直接使用原始协议链接
                }
              }]
            });
            // 生成二维码（不编码协议链接）
            if (typeof QRCode !== 'undefined') {
              new QRCode(document.getElementById("qrcode-container"), {
                text: url,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
              });
            } else {
              console.error("QRCode库未加载");
              mdui.alert("二维码生成失败，请刷新页面重试");
            }
          }
        },
        ]
      });
    };
    // 执行流程
    try {
      生成链接(async(openurl, tiptext) => {
        try {
          const shareUrl = await generateFinalUrl(openurl);
          showShareOptions(shareUrl, openurl);
        } catch (error) {
          console.error('生成分享链接失败:', error);
          mdui.alert({
            headline: "错误",
            description: "生成分享链接失败，请重试",
            confirmText: "确定"
          });
        }
      });
    } catch (error) {
      console.error('分享房间失败:',
        error);
      mdui.alert({
        headline: "错误",
        description: error.message || "分享房间失败",
        confirmText: "确定"
      });
    }
  };
  // 执行房间分享
  await handleShareRoom();
};

buttons[1].onclick = function() {
  window.location.href = "http://xwl.run.place/view.php/f6f9eba27268a7e0663ff7ac0e6b171d.mp4";
}
document.getElementsByTagName("mdui-segmented-button-group")[0].addEventListener("change", function() {
  localStorage.setItem("gamemode", this.value)
})
document.querySelectorAll(".myedit")[0].onclick = function() {
  mdui_snackbar( {
    message: "可向下滑动查看更多模式",
    action: "确定",
    onActionClick: () => console.log("click action button")
  });
}
buttons[2].onclick = function() {
  window.open("http://xwl.run.place/down.php/bac3af92081940a0629caf09d2cb44bf.apk")
};
buttons[3].onclick = function() {
  window.open("https://qun.qq.com/universal-share/share?ac=1&authKey=Fg2qf%2B6YjxeKepR7XQuvex3tfZPL1GVWvfeZIRVq9RsOKJ0ioPeyJyEhkiI7T2Qh&busi_data=eyJncm91cENvZGUiOiIxMDM2NDIxNDA0IiwidG9rZW4iOiIvQU5rOTR6aFdzWkpUMXMxaWtHVFdKdmxXNVpBY3ZaUkJHKytOdmh6VU1uL240SmJIa2dOK0xnMDljM2ZRYXFQIiwidWluIjoiMjgyNjMzNDMxIn0%3D&data=aQz4UqHahfwN7voc6jWy4MCB5xJyQHC1kFBeAm6x2dHSAIkrTFMWIhsyzAwYS15TBiLzpnElkDq1NLL50Ocj_g&svctype=4&tempid=h5_group_info")
}
buttons[4].onclick = function() {
  window.location.href = "morelink.html";
}
buttons[5].onclick = function() {
  window.open("https://pcna4sb0d9qb.feishu.cn/share/base/form/shrcnIT51sdSlTygEGC6DwjANbe")
}
buttons[6].onclick = function() {
  快捷玩法按钮 = document.getElementById("kuaijiewanfa")
  快捷玩法按钮控制器 = document.getElementById("kjkzan")
  if (快捷玩法按钮.style.display === "none") {
    快捷玩法按钮.style.display = "block"
    快捷玩法按钮控制器.innerText = "收起"
    快捷玩法按钮控制器.icon = "keyboard_arrow_up"
  } else {
    快捷玩法按钮.style.display = "none"
    快捷玩法按钮控制器.innerText = "快捷玩法"
    快捷玩法按钮控制器.icon = "bolt"
  }
}
buttons[7].onclick = async function() {
  work_message = "null"
  // 检查维护消息
  if (work_message != "null") {
    mdui_snackbar( {
      message: work_message,
      action: "确定"
    });
    return;
  }
  快捷玩法json = {
    "createType": "2",
    "mapID": "待填入mapid",
    "ullRoomid": "待填入roomid",
    "mapType": "待填入maptype",
    "ullExternUid": "待填入uid",
    "roomName": "1",
    "teamerNum": "待填入人数",
    "platType": "2",
    "firstCountDownTime": "0",
    "secondCountDownTime": "17",
    "AddType": "2",
    "OfflineRelayEntityID": "",
    "openAICommentator": "1",
    "banHerosCamp1": ["112",
      "121",
      "127",
      "131",
      "136",
      "141",
      "169",
      "173",
      "186",
      "125",
      "513",
      "506",
      "521",
      "519",
      "558"],
    "banHerosCamp2": ["112",
      "121",
      "127",
      "131",
      "136",
      "141",
      "169",
      "173",
      "186",
      "125",
      "513",
      "506",
      "521",
      "519",
      "558"],
    "customDefineItems": ["0:6",
      "51:6",
      "56:6",
      "61:6",
      "66:6",
      "28:6",
      "71:6",
      "76:6",
      "81:6",
      "86:6",
      "1:5",
      "52:5",
      "57:5",
      "62:5",
      "67:5",
      "29:5",
      "72:5",
      "77:5",
      "82:5",
      "87:5",
      "2:5",
      "53:5",
      "58:5",
      "63:5",
      "68:5",
      "30:5",
      "73:5",
      "78:5",
      "83:5",
      "88:5",
      "3:4",
      "21:4",
      "54:4",
      "91:4",
      "59:4",
      "92:4",
      "64:4",
      "93:4",
      "69:4",
      "94:4",
      "31:4",
      "47:4",
      "74:4",
      "95:4",
      "79:4",
      "96:4",
      "84:4",
      "97:4",
      "89:4",
      "98:4",
      "4:4",
      "55:4",
      "60:4",
      "65:4",
      "70:4",
      "32:4",
      "75:4",
      "80:4",
      "85:4",
      "90:4",
      "106:3",
      "107:3",
      "108:3",
      "109:3",
      "110:3",
      "111:3",
      "112:3",
      "113:3",
      "114:3",
      "115:3"]
  }
  const handleShareRoom = async() => {
    const generateFinalUrl = async(openurl) => {
      console.log("=== 开始生成房间 ===");
      console.log("原始游戏启动URL:", openurl);
      // 关键修改：不对游戏协议链接进行编码
      const fullUrl = `${window.location.origin}/joinroom.html?data=${openurl}`;
      console.log("进房页面URL:", fullUrl);
      try {
        const response = await fetch('/fjcl.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `url=${fullUrl}`
        });
        console.log("3. 响应状态:", response.status);
        if (!response.ok) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        const data = await response.json();
        console.log("4. JSON解析成功:", data);
        if (!data.success || !data.room_id) {
          throw new Error(data.error || '服务器返回失败');
        }
        const shareUrl = `${window.location.origin}/room.php?id=${data.room_id}`;
        console.log("5. 最终分享链接:", shareUrl);
        return shareUrl;
      } catch (error) {
        console.error("请求出错:", error);
        throw error;
      }
    };
    // 分享选项展示
    const showShareOptions = (url, openurl) => {
      mdui.dialog({
        headline: "⚡快捷玩法",
        body: `
        <div style="color: var(--mdui-color-on-surface-variant); margin-bottom: 16px;">
        <strong>⚡即将进入快捷玩法：无CD模式禁用超标、无敌、地图炮，请选择分享房间方式以进入房间</strong><br>
        <span style="font-size: 0.875rem;">注：分享房间的方式同样也是进房间的方式。</span>
        </div>
        `,
        actions: [{
          text: "复制链接并进入游戏",
          onClick: () => {
            const createTime = localStorage.getItem('lastFunctionCallTime') || "未知时间";
            复制文本(复制内容处理(url));
            打开链接(openurl); // 直接使用原始协议链接
          }
        }, {
          text: "二维码分享",
          onClick: () => {
            const dialog = mdui.dialog({
              headline: "扫描二维码加入",
              body: '<div id="qrcode-container" style="display: flex; justify-content: center;"></div>',
              actions: [{
                text: "打开游戏",
                onClick: function() {
                  打开链接(openurl); // 直接使用原始协议链接
                }
              }]
            });
            // 生成二维码（不编码协议链接）
            if (typeof QRCode !== 'undefined') {
              new QRCode(document.getElementById("qrcode-container"), {
                text: url,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
              });
            } else {
              console.error("QRCode库未加载");
              mdui.alert("二维码生成失败，请刷新页面重试");
            }
          }
        },
        ]
      });
    };
    // 执行流程
    try {
      生成链接(async(openurl, tiptext) => {
        try {
          const shareUrl = await generateFinalUrl(openurl);
          showShareOptions(shareUrl, openurl);
        } catch (error) {
          console.error('生成分享链接失败:', error);
          mdui.alert({
            headline: "错误",
            description: "生成分享链接失败，请重试",
            confirmText: "确定"
          });
        }
      });
    } catch (error) {
      console.error('分享房间失败:',
        error);
      mdui.alert({
        headline: "错误",
        description: error.message || "分享房间失败",
        confirmText: "确定"
      });
    }
  };
  // 执行房间分享
  await handleShareRoom();
};
buttons[8].onclick = async function() {
  // 检查维护消息
  work_message = "等待开发"
  if (work_message != "null") {
    mdui_snackbar( {
      message: work_message,
      action: "确定"
    });
    return;
  }

  快捷玩法json = {
    "createType": "2",
    "mapID": "待填入mapid",
    "ullRoomid": "待填入roomid",
    "mapType": "待填入maptype",
    "ullExternUid": "待填入uid",
    "roomName": "1",
    "teamerNum": "待填入人数",
    "platType": "2",
    "firstCountDownTime": "0",
    "secondCountDownTime": "17",
    "AddType": "2",
    "OfflineRelayEntityID": "",
    "openAICommentator": "1",
    "banHerosCamp1": ["112",
      "121",
      "127",
      "131",
      "136",
      "141",
      "169",
      "173",
      "186",
      "125",
      "513",
      "506",
      "521",
      "519",
      "558"],
    "banHerosCamp2": ["112",
      "121",
      "127",
      "131",
      "136",
      "141",
      "169",
      "173",
      "186",
      "125",
      "513",
      "506",
      "521",
      "519",
      "558"],
    "customDefineItems": ["0:6",
      "51:6",
      "56:6",
      "61:6",
      "66:6",
      "28:6",
      "71:6",
      "76:6",
      "81:6",
      "86:6",
      "1:5",
      "52:5",
      "57:5",
      "62:5",
      "67:5",
      "29:5",
      "72:5",
      "77:5",
      "82:5",
      "87:5",
      "2:5",
      "53:5",
      "58:5",
      "63:5",
      "68:5",
      "30:5",
      "73:5",
      "78:5",
      "83:5",
      "88:5",
      "3:4",
      "21:4",
      "54:4",
      "91:4",
      "59:4",
      "92:4",
      "64:4",
      "93:4",
      "69:4",
      "94:4",
      "31:4",
      "47:4",
      "74:4",
      "95:4",
      "79:4",
      "96:4",
      "84:4",
      "97:4",
      "89:4",
      "98:4",
      "4:4",
      "55:4",
      "60:4",
      "65:4",
      "70:4",
      "32:4",
      "75:4",
      "80:4",
      "85:4",
      "90:4",
      "106:3",
      "107:3",
      "108:3",
      "109:3",
      "110:3",
      "111:3",
      "112:3",
      "113:3",
      "114:3",
      "115:3"]
  }
  const handleShareRoom = async() => {
    const generateFinalUrl = async(openurl) => {
      console.log("=== 开始生成房间 ===");
      console.log("1. 原始游戏启动URL:", openurl);
      // 关键修复：不要对游戏协议链接进行编码
      const fullUrl = `${window.location.origin}/joinroom.html?data=${openurl}`;
      console.log("2. 进房页面URL（未编码）:", fullUrl);
      try {
        const response = await fetch('/fjcl.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `url=${fullUrl}`
        });
        console.log("3. 响应状态:", response.status);
        if (!response.ok) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        const data = await response.json();
        console.log("4. JSON解析成功:", data);
        if (!data.success || !data.room_id) {
          throw new Error(data.error || '服务器返回失败');
        }
        const shareUrl = `${window.location.origin}/room.php?id=${data.room_id}`;
        console.log("5. 最终分享链接:", shareUrl);
        return shareUrl;
      } catch (error) {
        console.error("请求出错:", error);
        throw error; // 重新抛出错误以便上层捕获
      }
    };
    // 分享选项展示
    const showShareOptions = (url, openurl) => {
      mdui.dialog({
        headline: "⚡快捷玩法",
        body: `
        <div style="color: var(--mdui-color-on-surface-variant); margin-bottom: 16px;">
        <strong>即将进入快捷玩法：无CD模式禁用超标、无敌、地图炮，请选择分享房间方式以进入房间</strong><br>
        <span style="font-size: 0.875rem;">注：分享房间的方式同样也是进房间的方式。</span>
        </div>
        `,
        actions: [{
          text: "复制链接并进入游戏",
          onClick: () => {
            const createTime = localStorage.getItem('lastFunctionCallTime') || "未知时间";
            复制文本(复制内容处理(url));
            打开链接(openurl);
          }
        }, {
          text: "二维码分享",
          onClick: () => {
            const dialog = mdui.dialog({
              headline: "扫描二维码加入",
              body: '<div id="qrcode-container" style="display: flex; justify-content: center;"></div>',
              actions: [{
                text: "打开游戏",
                onClick: function() {
                  打开链接(openurl);
                }
              }]
            });
            generateQRCode(url, "qrcode-container");
          }
        },]
      });
    };
    // 执行流程
    try {
      // 先生成房间URL，再创建分享链接
      快捷玩法(async(openurl, tiptext) => {
        try {
          console.log("生成的房间URL:", openurl);
          const shareUrl = await generateFinalUrl(openurl);
          console.log("生成的分享链接:", shareUrl);
          showShareOptions(shareUrl, openurl);
        } catch (error) {
          console.error('生成分享链接失败:', error);
          mdui.alert({
            headline: "错误",
            description: "生成分享链接失败，请重试",
            confirmText: "确定"
          });
        }
      });
    } catch (error) {
      console.error('分享房间失败:', error);
      mdui.alert({
        headline: "错误",
        description: error.message || "分享房间失败",
        confirmText: "确定"
      });
    }
  };
  // 执行房间分享
  await handleShareRoom();
};
    
function 自定义复制内容教程() {
  mdui.alert({
    headline: "自定义复制内容教程",
    description: "在文本框输入{禁用英雄} {地图模式} {链接} {换行} 会分别自动转换为禁用英雄、地图模式、链接、换行，可配合文本内容使用。",
    confirmText: "确定"
  });
}
var wenben = document.querySelector(".wenben");
document.getElementById("zdwenben").addEventListener("click", function() {
  const currentState = this.innerHTML;
  const wenben = document.querySelector(".wenben");
  if (currentState.includes("开")) {
    this.innerHTML = '自定义复制内容[关]';
    wenben.style.display = 'none';
    localStorage.setItem('zdwenben', '自定义复制内容[关]');
  } else {
    this.innerHTML = '自定义复制内容[开]';
    wenben.style.display = 'block';
    localStorage.setItem('zdwenben', '自定义复制内容[开]');
    mdui_snackbar( {
      message: "点击查看即可查看自定义复制内容教程",
      action: "查看",
      onActionClick: () => 自定义复制内容教程()
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const zdwenben = document.querySelector("#zdwenben");
  const wenben = document.querySelector(".wenben");
  const savedState = localStorage.getItem('zdwenben');
  if (savedState && savedState.includes("开")) {
    zdwenben.innerHTML = '自定义复制内容[开]';
    wenben.style.display = 'block';
  } else {
    zdwenben.innerHTML = '自定义复制内容[关]';
    wenben.style.display = 'none';
  }
});

function createTooltip(title, content) {
  // 创建 mdui-tooltip 元素
  const tooltip = document.createElement('mdui-tooltip');
  tooltip.trigger = "click"
  const tooltipContent = document.createElement('div');
  tooltipContent.setAttribute('slot',
    'content');
  const tooltipTitle = document.createElement('div');
  tooltipTitle.style.fontSize = '1.4em';
  tooltipTitle.textContent = title;
  if (content) {
    const tooltipText = document.createElement('div');
    tooltipText.textContent = content;
    tooltipContent.appendChild(tooltipTitle);
    tooltipContent.appendChild(tooltipText);
  } else {
    // 如果没有附加内容，只添加标题
    tooltipContent.appendChild(tooltipTitle);
  }
  //内容添加到工具提示中
  tooltip.appendChild(tooltipContent);
  // 返回创建的工具提示元素
  return tooltip;
}
for (item in mydatajson[0]) {
  // 使用闭包解决
  (function(item_str) {
    // 创建新的 mdui-menu-item 元素
    var menuItem = document.createElement('mdui-menu-item');
    // 设置文本内容
    menuItem.textContent = item_str;
    menuItem.onclick = function() {
      if (item_str.includes("征召")) {
        mdui_snackbar( {
          /*得了，这个不是征召能不能加人机的问题了，这是整个自定义房间都无法加人机了，所以这个提示先注释掉吧
                    message: "征召不可以添加人机哦",
                    */
          onActionClick: () => console.log("click action button")
        });
      }
      localStorage.setItem("mapmode", item_str)
      document.querySelectorAll(".myedit")[0].value = item_str;
    }
    if (item_str.includes("征召")) {
      // 创建 mdui-tooltip 元素
      const tooltip = createTooltip("注意", "征召不可以添加人机哦");
      tooltip.appendChild(menuItem);
      document.querySelectorAll(".mymenu")[0].appendChild(tooltip);
      return
    }
    // 将新创建的元素添加到 DOM 中，例如添加到 body 中
    document.querySelectorAll(".mymenu")[0].appendChild(menuItem);
  })(item);
}
var herodialog = document.querySelector(".example-dialog")
herotip = false
herodialog.querySelector("mdui-button").onclick = function() {
  if (herotip == false) {
    herotip = true
    mdui.confirm({
      headline: "提示",
      description: "确认关闭吗 更改了配置必须要新建或保存才能生效",
      confirmText: "确认",
      cancelText: "取消",
      onConfirm: () => {
        herodialog.open = false
      },
      onCancel: () => console.log("canceled"),
      onClose: () => herotip = false,
    });
  }
}
document.querySelectorAll(".myedit")[1].onclick = function() {
  加载英雄配置()
}
var customdialog = document.querySelector(".custom-dialog")
customtip = false
customdialog.querySelector("mdui-button").onclick = function() {
  if (customtip == false) {
    customtip = true
    mdui.confirm({
      headline: "提示",
      description: "确认关闭吗 更改了配置必须要新建或保存才能生效",
      confirmText: "确认",
      cancelText: "取消",
      onConfirm: () => {
        customdialog.open = false
      },
      onCancel: () => console.log("canceled"),
      onClose: () => customtip = false,
    });
  }
}
document.querySelectorAll(".myedit")[2].onclick = function() {
  加载自定义配置()
}

function loadherolist(batchSize = 10) {
  loadherolist = false;
  const items = Object.keys(mydatajson[1]);
  let currentIndex = 0;
  const targetList = document.getElementsByClassName('myherolist')[0];
  // 清空容器并添加控制元素
  targetList.innerHTML = '';
  // 创建控制容器
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'hero-controls';
  // 创建搜索容器
  const searchContainer = document.createElement('div');
  searchContainer.className = 'hero-search-container';
  // 创建搜索输入框
  const searchField = document.createElement('mdui-text-field');
  searchField.id = 'heroSearch';
  searchField.setAttribute('placeholder', '搜索英雄...');
  searchField.setAttribute('clearable', '');
  // 添加搜索图标
  const searchIcon = document.createElement('mdui-icon');
  searchIcon.setAttribute('name', 'search');
  searchIcon.setAttribute('slot', 'prefix');
  searchField.appendChild(searchIcon);
  // 将元素添加到容器
  searchContainer.appendChild(searchField);
  controlsContainer.appendChild(searchContainer);
  targetList.parentNode.insertBefore(controlsContainer, targetList);
  // 设置列表容器样式
  targetList.style.display = "grid";
  targetList.style.gridTemplateColumns = "repeat(auto-fill, minmax(80px, 1fr))";
  targetList.style.gap = "12px";
  targetList.style.padding = "12px";
  targetList.style.alignItems = "start";
  targetList.style.justifyItems = "center";
  targetList.style.overflowY = "auto";
  targetList.style.maxHeight = "calc(100vh - 200px)";
  // 关键词徽标配置
  const keywordBadges = [{
    keyword: '坦克',
    badgeText: '坦克',
    color: 'tertiary'
  },
    {
      keyword: '辅助',
      badgeText: '辅助',
      color: 'success'
    },
    {
      keyword: '刺客',
      badgeText: '刺客',
      color: 'error'
    },
    {
      keyword: '战士',
      badgeText: '战士',
      color: 'primary'
    },
    {
      keyword: '法师',
      badgeText: '法师',
      color: 'secondary'
    },
    {
      keyword: '射手',
      badgeText: '射手',
      color: 'info'
    }];
  // 存储所有英雄卡片
  const allHeroCards = [];
  // 处理下一批英雄
  function processNextBatch() {
    const batchItems = [];
    for (let i = currentIndex; i < Math.min(currentIndex + batchSize, items.length); i++) {
      const item_str = items[i];
      const heroData = mydatajson[1][item_str].split("|");
      const heroId = heroData[0];
      const heroType = heroData[1] || '';
      const imgurl = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${heroId}/${heroId}.jpg`;
      // 创建英雄卡片容器
      const card = document.createElement('div');
      card.className = "hero-card";
      card.style.width = "60px";
      card.style.height = "76px";
      card.style.position = "relative";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.justifyContent = "flex-start";
      card.style.padding = "4px";
      card.style.borderRadius = "6px";
      card.style.backgroundColor = "rgba(var(--mdui-color-surface-container-high), 0.8)";
      card.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.1)";
      card.style.transition = "all 0.15s ease";
      card.style.overflow = "hidden";
      card.style.border = "1px solid rgba(var(--mdui-color-outline), 0.08)";
      card.style.cursor = "pointer";
      card.dataset.heroName = item_str;
      card.dataset.heroType = heroType;
      // 创建头像容器
      const avatarContainer = document.createElement('div');
      avatarContainer.style.width = "36px";
      avatarContainer.style.height = "36px";
      avatarContainer.style.borderRadius = "50%";
      avatarContainer.style.overflow = "hidden";
      avatarContainer.style.marginBottom = "4px";
      avatarContainer.style.border = "1px solid rgba(var(--mdui-color-primary), 0.2)";
      avatarContainer.style.boxShadow = "0 1px 2px rgba(var(--mdui-color-primary), 0.1)";
      // 创建头像图片
      const img = document.createElement('img');
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.src = imgurl;
      img.loading = "lazy";
      img.onerror = function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPgogICAgICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNCREJEQkQiPjwvcmVjdD4KICAgIDwvc3ZnPg==';
      };
      // 创建名称容器
      const nameContainer = document.createElement('div');
      nameContainer.style.width = "100%";
      nameContainer.style.textAlign = "center";
      nameContainer.style.overflow = "hidden";
      const nameText = document.createElement('span');
      nameText.textContent = item_str;
      nameText.style.fontSize = "12px";
      nameText.style.fontWeight = "500";
      nameText.style.lineHeight = "1.3";
      nameText.style.color = "rgb(var(--mdui-color-on-surface))";
      nameText.style.display = "inline-block";
      nameText.style.maxWidth = "100%";
      nameText.style.whiteSpace = "nowrap";
      nameText.style.textOverflow = "ellipsis";
      nameText.style.overflow = "hidden";
      // 创建关键词徽标容器
      const badgeContainer = document.createElement('div');
      badgeContainer.style.position = 'absolute';
      badgeContainer.style.bottom = '4px';
      badgeContainer.style.left = '0';
      badgeContainer.style.right = '0';
      badgeContainer.style.display = 'flex';
      badgeContainer.style.justifyContent = 'center';
      badgeContainer.style.gap = '4px';
      badgeContainer.style.flexWrap = 'wrap';
      // 检查并添加匹配的关键词徽标
      keywordBadges.forEach(badgeConfig => {
        if (item_str.includes(badgeConfig.keyword)) {
          const badge = document.createElement('mdui-badge');
          badge.textContent = badgeConfig.badgeText;
          badge.setAttribute('color', badgeConfig.color);
          badge.style.fontSize = '10px';
          badge.style.padding = '2px 4px';
          badge.style.borderRadius = '4px';
          badge.style.margin = '0 2px';
          badgeContainer.appendChild(badge);
        }
      });
      // 创建选中指示器
      const selectedIndicator = document.createElement('div');
      selectedIndicator.style.position = 'absolute';
      selectedIndicator.style.top = '3px';
      selectedIndicator.style.right = '3px';
      selectedIndicator.style.width = '16px';
      selectedIndicator.style.height = '16px';
      selectedIndicator.style.borderRadius = '50%';
      selectedIndicator.style.backgroundColor = 'rgba(var(--mdui-color-primary), 0.9)';
      selectedIndicator.style.display = 'flex';
      selectedIndicator.style.alignItems = 'center';
      selectedIndicator.style.justifyContent = 'center';
      selectedIndicator.style.visibility = 'hidden';
      selectedIndicator.style.opacity = '0';
      selectedIndicator.style.transition = 'all 0.2s ease';
      selectedIndicator.style.zIndex = '1';
      const checkIcon = document.createElement('mdui-icon');
      checkIcon.name = 'check';
      checkIcon.style.color = 'rgb(var(--mdui-color-on-primary))';
      checkIcon.style.fontSize = '12px';
      selectedIndicator.appendChild(checkIcon);
      // 选中状态逻辑
      Object.defineProperty(card,
        'selected',
        {
          configurable: true,
          enumerable: true,
          get: function() {
            return this._selected;
          },
          set: function(newValue) {
            if (newValue !== this._selected) {
              this._selected = !!newValue;
              if (this._selected) {
                this.style.backgroundColor = "rgba(var(--mdui-color-primary-container), 0.9)";
                this.style.boxShadow = "0 2px 8px rgba(var(--mdui-color-primary), 0.15)";
                selectedIndicator.style.visibility = "visible";
                selectedIndicator.style.opacity = "1";
                nameText.style.color = "rgb(var(--mdui-color-on-primary-container))";
                avatarContainer.style.borderColor = "rgba(var(--mdui-color-primary), 0.4)";
              } else {
                this.style.backgroundColor = "rgba(var(--mdui-color-surface-container-high), 0.8)";
                this.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.1)";
                selectedIndicator.style.visibility = "hidden";
                selectedIndicator.style.opacity = "0";
                nameText.style.color = "rgb(var(--mdui-color-on-surface))";
                avatarContainer.style.borderColor = "rgba(var(--mdui-color-primary), 0.2)";
              }
            }
          }
        });
      // 添加交互事件
      card.addEventListener("click",
        function() {
          this.selected = !this.selected;
        });
      card.addEventListener("mouseenter",
        function() {
          if (!this.selected) {
            this.style.transform = "translateY(-2px)";
            this.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.15)";
          }
        });
      card.addEventListener("mouseleave",
        function() {
          if (!this.selected) {
            this.style.transform = "";
            this.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.1)";
          }
        });
      // 组装卡片元素
      avatarContainer.appendChild(img);
      card.appendChild(avatarContainer);
      nameContainer.appendChild(nameText);
      card.appendChild(nameContainer);
      // 如果有关键词徽标才添加到卡片
      if (badgeContainer.children.length > 0) {
        card.appendChild(badgeContainer);
      }
      card.appendChild(selectedIndicator);
      batchItems.push(card);
      allHeroCards.push(card);
    }
    if (batchItems.length > 0 && targetList) {
      targetList.append(...batchItems);
    }
    currentIndex += batchSize;
    if (currentIndex < items.length) {
      requestAnimationFrame(processNextBatch);
    } else {
      window.loadherolist = true;
      // 设置搜索和分类功能
      setupFilterControls(allHeroCards);
      // 原有的事件处理
      herodialog.addEventListener("open", function() {
        herodialog.updateComplete.then(() => {
          handleResize();
        });
        window.addEventListener('resize', handleResize);
      });
      herodialog.addEventListener("close", function() {
        window.removeEventListener('resize', handleResize);
      });
      herodialog.open = true;
      try {
        var heros_json = JSON.parse(localStorage.getItem("custom_heros"));
        选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  // 设置搜索和分类功能
  function setupFilterControls(cards) {
    const searchInput = document.getElementById('heroSearch');
    const radioGroup = document.querySelector('.heromode');
    // 防抖函数
    function debounce(func, wait) {
      let timeout;
      return function() {
        const context = this,
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }
    // 过滤英雄卡片
    function filterHeroes() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const selectedType = radioGroup.value;
      cards.forEach(card => {
        const heroName = card.dataset.heroName.toLowerCase();
        const heroType = card.dataset.heroType;
        const nameMatch = searchTerm === '' || heroName.includes(searchTerm);
        const typeMatch = selectedType === '' || heroType === selectedType;
        if (nameMatch && typeMatch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
    // 监听搜索输入事件
    searchInput.addEventListener('input',
      debounce(filterHeroes, 200));
    // 监听清除搜索事件
    searchInput.addEventListener('clear',
      function() {
        filterHeroes();
      });
    // 监听分类选择变化
    radioGroup.addEventListener('change',
      filterHeroes);
  }
  // 开始加载英雄列表
  requestAnimationFrame(processNextBatch);
}
/*
// 旧版 有bug懒得修复 新版看下面
// 定义一个处理窗口大小变化的函数
function handleResize() {
    document.querySelectorAll('.emptyhero').forEach(el => el.remove());
    const itemsCountPerRow = getItemsPerRow(".myherolist");
    let firstRow = itemsCountPerRow.firstRow
    let lastRow = itemsCountPerRow.lastRow
    let computedStyle = itemsCountPerRow.computedStyle
    let width = computedStyle.width
    let height = computedStyle.height
    let padding = computedStyle.padding
    let margin = computedStyle.margin
    console.log(itemsCountPerRow)
    if (firstRow > lastRow) {
        const length = firstRow - lastRow
        for (let index = 0; index < length; index++) {
            const div = document.createElement('div');
            div.style.width = width;
            div.style.height = height;
            div.style.padding = padding;
            div.style.margin = margin;
            div.className = "emptyhero"
            document.querySelector(".myherolist").appendChild(div)
        }
    }
}
*/
// 定义一个处理窗口大小变化的函数
function handleResize() {
  document.querySelectorAll('.emptyhero').forEach(el => el.remove());
  const CardsPerRow = calculateCardsPerRow(".myherolist");
  if (CardsPerRow == false) return
  let count = CardsPerRow.cardsPerRow
  let last_count = CardsPerRow.lastRowElements
  let computedStyle = CardsPerRow.computedStyle
  let width = computedStyle.width
  let height = computedStyle.height
  let padding = computedStyle.padding
  let margin = computedStyle.margin
  console.log(CardsPerRow)
  if (count > last_count) {
    const length = count - last_count
    for (let index = 0; index < length; index++) {
      const div = document.createElement('div');
      div.style.width = width;
      div.style.height = height;
      div.style.padding = padding;
      div.style.margin = margin;
      div.className = "emptyhero"
      document.querySelector(".myherolist").appendChild(div)
    }
  }
}
document.getElementsByClassName("heromode")[0].addEventListener("change", function() {
  //分割符号 | 防止英雄id也包含指定的数字
  let defvalue = "|" + this.value
  var chips = Array.from(document.querySelectorAll(".mychip"))
  chips.forEach(chip => {
    let value = chip.textContent
    let mvalue = mydatajson[1][value]
    if (mvalue.includes(defvalue)) {
      chip.isshow = true
      chip.style.display = "flex"
    } else {
      chip.isshow = false
      chip.style.display = "none"
    }
  });
  handleResize()
  //清空数据
  search_heroedit.value = ""
})
var heroButton = document.getElementsByClassName("herobutton")

function 获取选择英雄名() {
  var editvalue = document.querySelectorAll(".myedit")[1].value
  if (editvalue && editvalue in JSON.parse(localStorage.getItem("custom_heros"))) {
    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
    if (heros_json[editvalue].includes("suiji")) {
      return heros_json[editvalue]
    }
  }
  var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
  var heroscof = ""
  childnodes.forEach(element => {
    if (element.selected == true) {
      if (heroscof != "") {
        heroscof = heroscof + " " + element.textContent
      } else {
        heroscof = element.textContent
      }
    }
  });
  return heroscof
}

function 检测英雄随机禁用(str) {
  if (str.includes("suiji")) {
    let num = str.split("|")[1]
    mdui.alert({
      headline: "提示",
      description: "该禁用配置为随机禁用配置 随机禁用" + num + "个英雄",
      confirmText: "确定",
    });
    return true
  }
  return false
}

function 选择英雄名(str) {
  if (typeof str == "undefined") {
    return
  }
  if (检测英雄随机禁用(str) == true) {
    return
  }
  var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
  childnodes.forEach(element => {
    element.selected = false
    if (str.includes(element.textContent)) {
      element.selected = true
    } else {
      element.selected = false
    }
  });
}

function 加载英雄配置() {
  var menudoc = document.querySelectorAll(".mymenu")[1]
  var ismenu
  if (herodialog.open == true) {
    ismenu = true
    menudoc = herodialog.getElementsByClassName("mymenu")[0]
  }
  var childnodes = menudoc.childNodes
  var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
  for (let index = 0; index < childnodes.length; index++) {
    const element = childnodes[index];
    if (element.className != "search_edit") {
      element.remove()
      index--
    }
  }
  if (ismenu != true) {
    // 创建新的 mdui-menu-item 元素
    var menuItem = document.createElement('mdui-menu-item');
    // 设置文本内容
    menuItem.textContent = "管理配置";
    menuItem.isadd = true
    menuItem.onclick = function() {
      const loadherolist = window.loadherolist
      if (loadherolist == true) {
        try {
          选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value])
        } catch (e) {
          console.log(e)
        }
        herodialog.open = true
      } else {
        mdui_snackbar( {
          message: "加载中",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        if (typeof loadherolist == "function") loadherolist(10)
      }
    }
    menudoc.appendChild(menuItem);
  }
  if (localStorage.getItem("custom_heros")) {
    if (Object.keys(heros_json).length == 0) {
      mdui_snackbar( {
        message: tip1,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
      return
    }
    if (ismenu != true) {
      for (item in heros_json) {
        // 使用闭包解决
        (function(item_str) {
          // 创建新的 mdui-menu-item 元素
          var menuItem = document.createElement('mdui-menu-item');
          // 设置文本内容
          menuItem.textContent = item_str;
          menuItem.onclick = function() {
            localStorage.setItem("banheros", item_str)
            document.querySelectorAll(".myedit")[1].value = item_str;
          }
          // 将新创建的元素添加到 DOM 中，例如添加到 body 中
          menudoc.appendChild(menuItem);
        })(item);
      }
    } else {
      for (item in heros_json) {
        // 使用闭包解决
        (function(item_str) {
          // 创建新的 mdui-menu-item 元素
          var menuItem = document.createElement('mdui-menu-item');
          // 设置文本内容
          menuItem.textContent = item_str;
          menuItem.onclick = function() {
            localStorage.setItem("banheros", item_str)
            document.querySelectorAll(".myedit")[1].value = item_str;
            选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value])
          }
          // 将新创建的元素添加到 DOM 中，例如添加到 body 中
          menudoc.appendChild(menuItem);
        })(item);
      }
    }
  } else {
    mdui_snackbar( {
      message: tip1,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}

function 复制文本(str) {
  // 替换换行符为 HTML 的换行标签
  const htmlStr = str.replace(/\n/g, '<br>');
  // 创建一个新的元素节点来包含 HTML 内容
  const div = document.createElement('div');
  div.innerHTML = htmlStr;
  document.body.appendChild(div);
  // 创建一个范围对象
  const range = document.createRange();
  // 将新创建的元素节点添加到范围中
  range.selectNode(div);
  // 获取当前选择
  const selection = window.getSelection();
  // 移除之前选中内容
  if (selection.rangeCount > 0) selection.removeAllRanges();
  // 将范围添加到选择中
  selection.addRange(range);
  // 执行复制命令
  document.execCommand('copy');
  // 移除范围，清空选择
  selection.removeAllRanges();
  div.remove();
  mdui_snackbar( {
    message: "已尝试复制，如未复制成功请检查是否已允许网站使用剪贴板",
    action: "确定",
    onActionClick: () => console.log("click action button")
  });
}

function 修改键名(jsonObj, oldKey, newKey) {
  // 创建一个新的 JSON 对象
  const newJsonObj = {};
  // 遍历旧 JSON 对象的键值对
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      // 如果当前键是要修改的键，则使用新的键名，否则保持原样
      const targetKey = (key === oldKey) ? newKey: key;
      // 将键值对添加到新的 JSON 对象中
      newJsonObj[targetKey] = jsonObj[key];
    }
  }
  return newJsonObj;
}
heroButton[0].onclick = function() {
  加载英雄配置()
}
heroButton[1].onclick = function() {
  mdui.prompt({
    headline: "新建配置",
    description: "请输入配置名以新建配置",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: (value) => {
      var heros_json
      var 英雄名 = 获取选择英雄名()
      if (localStorage.getItem("custom_heros")) {
        heros_json = JSON.parse(localStorage.getItem("custom_heros"))
      } else {
        heros_json = {}
      }
      if (value == "") {
        mdui.alert({
          headline: "提示",
          description: "新建配置失败！配置名称不能为空，请重新输入！",
          confirmText: "确定",
        });
        return;
      }
      heros_json[value] = 英雄名;
      localStorage.setItem("custom_heros", JSON.stringify(heros_json))
      localStorage.setItem("banheros", value)
      document.querySelectorAll(".myedit")[1].value = value;
      加载英雄配置()
      mdui_snackbar( {
        message: "新建配置成功",
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    },
    onCancel: () => console.log("canceled"),
  });
}
heroButton[2].onclick = function() {
  var 英雄名 = 获取选择英雄名()
  复制文本(英雄名)
}
heroButton[3].onclick = function() {
  mdui.prompt({
    headline: "导入配置",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: (value) => {
      try {
        选择英雄名(value)
        mdui_snackbar( {
          message: tip3,
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
      } catch {
        mdui_snackbar( {
          message: "输入配置有误",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
      }
    },
    onCancel: () => console.log("canceled"),
  });
}
heroButton[4].onclick = function() {
  if (localStorage.getItem("custom_heros")) {
    var editvalue = document.querySelectorAll(".myedit")[1].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_heros"))) {
      mdui.confirm({
        headline: "提示",
        description: "是否删除该配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
          var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
          delete heros_json[editvalue]
          localStorage.setItem("custom_heros", JSON.stringify(heros_json))
          localStorage.setItem("banheros", "")
          document.querySelectorAll(".myedit")[1].value = ""
          var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
          childnodes.forEach(element => {
            element.selected = false
          });
          herodialog.bodyRef.value.scroll({
            top: 0,
            behavior: 'smooth'
          });
          mdui_snackbar( {
            message: "删除配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
heroButton[5].onclick = function() {
  if (localStorage.getItem("custom_heros")) {
    var editvalue = document.querySelectorAll(".myedit")[1].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_heros"))) {
      var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
      if (heros_json[editvalue].includes("suiji")) {
        mdui.alert({
          headline: "提示",
          description: "该禁用配置为随机禁用配置 暂不支持该操作",
          confirmText: "确定",
        });
        return
      }
      mdui.prompt({
        headline: "提示",
        description: tip4,
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
          if (value == "") {
            mdui.alert({
              headline: "提示",
              description: "重命名配置失败！配置名称不能为空，请重新输入！",
              confirmText: "确定",
            });
            return;
          }
          heros_json = 修改键名(heros_json, editvalue, value);
          localStorage.setItem("custom_heros", JSON.stringify(heros_json))
          localStorage.setItem("banheros", value)
          document.querySelectorAll(".myedit")[1].value = value
          加载英雄配置()
          mdui_snackbar( {
            message: "重命名配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
heroButton[6].onclick = function() {
  var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
  childnodes.forEach(element => {
    if (element.isshow == false) {
      return
    }
    element.selected = true
  });
}
heroButton[7].onclick = function() {
  var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
  childnodes.forEach(element => {
    if (element.isshow == false) {
      return
    }
    if (element.selected == true) {
      element.selected = false
    } else {
      element.selected = true
    }
  });
}
heroButton[8].onclick = function() {
  if (localStorage.getItem("custom_heros")) {
    var editvalue = document.querySelectorAll(".myedit")[1].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_heros"))) {
      var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
      if (heros_json[editvalue].includes("suiji")) {
        mdui.alert({
          headline: "提示",
          description: "该禁用配置为随机禁用配置 暂不支持该操作",
          confirmText: "确定",
        });
        return
      }
      mdui.confirm({
        headline: "提示",
        description: "是否保存该配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
          var 英雄名 = 获取选择英雄名()
          heros_json[editvalue] = 英雄名;
          localStorage.setItem("custom_heros", JSON.stringify(heros_json))
          mdui_snackbar( {
            message: "保存配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
heroButton[9].onclick = function() {
  let myarr = {}
  let myheronum = []
  let newp
  let newdiv
  mdui.prompt({
    headline: "输入随机禁用数量",
    body: '<div class="radiodiv"></div>',
    description: "输入后 将创建一个新的配置 该配置为随机禁用的配置 你可选择生效的定位",
    confirmText: "确认",
    cancelText: "取消",
    onOpen: (dia) => {
      myedit = dia.querySelector("mdui-text-field")
      newdiv = document.createElement("div")
      radios = document.querySelector(".heromode").cloneNode(true).querySelectorAll('mdui-radio');
      window.myheros = Object.values(mydatajson[1])
      radios.forEach(function(radio) {
        if (radio.innerText == "全部") return
        myarr[radio.value] = radio.innerText
        //分割符号 | 防止英雄id也包含指定的数字
        let name = ['|' + radio.value];
        // 构建关键词的正则表达式
        const keywordPattern = new RegExp(name.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
        // 使用 filter 方法过滤数组
        num = myheros.filter(item => keywordPattern.test(item)).length;
        myheronum.push(radio.textContent + num + "个")
        let checkbox = document.createElement('mdui-checkbox');
        checkbox.setAttribute('value', radio.value);
        checkbox.innerText = radio.innerText;
        checkbox.setAttribute('value', radio.value);
        checkbox.checked = true
        newdiv.appendChild(checkbox);
      })
      myedit.parentElement.insertBefore(newdiv,
        myedit);
      newp = document.createElement("p");
      let allheronum = Object.values(mydatajson[1]).length
      heronum = allheronum
      newp.textContent = "英雄数量 " + myheronum.join(" ")
      newdiv.parentElement.insertBefore(newp,
        newdiv);
    },
    onConfirm: (value) => {
      let name = []
      let children = newdiv.children
      Array.from(children).forEach(element => {
        if (element.checked == true) {
          name.push(element.value)
        }
      });
      if (name.length == 0) {
        mdui_snackbar( {
          message: "请至少选择一个",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        return false
      }
      let num = Number(value)
      if (isNaN(num)) {
        mdui_snackbar( {
          message: "请检查输入是否为数字",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        return false
      }
      if (num < 1) {
        mdui_snackbar( {
          message: "必须输入大于0的数字",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        return false
      }
      var heros_json
      if (localStorage.getItem("custom_heros")) {
        heros_json = JSON.parse(localStorage.getItem("custom_heros"))
      } else {
        heros_json = {}
      }
      let myname = name.map(function(item) {
        return myarr[item];
      }).join(",")
      if (name.length == Object.keys(myarr).length) {
        myname = "全部"
      }
      value = "随机禁" + num + "个 " + myname
      heros_json[value] = "suiji|" + num + "|" + name.join(",");
      localStorage.setItem("custom_heros", JSON.stringify(heros_json))
      localStorage.setItem("banheros", value)
      document.querySelectorAll(".myedit")[1].value = value;
      加载英雄配置()
      mdui_snackbar( {
        message: "新建配置成功",
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    },
    onCancel: () => console.log("canceled"),
  });
}

function createMenuItems(settingsDoc, values, isdata) {
  var index = 1
  values.forEach(element => {
    // 使用闭包解决
    (function(item_str, index) {
      // 创建新的 mdui-menu-item 元素
      var menuItem = document.createElement('mdui-menu-item');
      if (isdata) {
        menuItem.value = item_str;
      } else {
        menuItem.value = index
      }
      menuItem.textContent = item_str
      menuItem.onclick = function() {}
      // 将新创建的元素添加到 DOM 中，例如添加到 body 中
      settingsDoc.appendChild(menuItem)
    })(element,
      index);
    index = index + 1
  });
  settingsDoc.updateComplete.then(() => {
    if (isdata) {
      settingsDoc.value = isdata;
    } else {
      settingsDoc.value = 1;
    }
    //存储默认值
    settingsDoc.defvalue = settingsDoc.value
  });
  return settingsDoc
}

function createList(str, doc) {
  // 创建 mdui-list 元素
  var list = document.createElement('mdui-list');
  // 创建 mdui-list-subheader 元素
  var listSubheader = document.createElement('mdui-list-subheader');
  listSubheader.textContent = str;
  // 将 mdui-list-subheader 添加到 mdui-list 中
  list.appendChild(listSubheader);
  // 返回创建的 mdui-list 元素
  doc.appendChild(list)
  return list;
}

function createSelectMenu(str, doc, ismultiple) {
  // 创建 mdui-select 元素
  var select = document.createElement('mdui-select');
  select.setAttribute('label',
    str);
  select.setAttribute('variant',
    "outlined");
  select.style.padding = "10px"
  if (ismultiple) {
    select.setAttribute('multiple', '');
  }
  doc.appendChild(select)
  // 返回创建的 mdui-select 元素
  return select;
}

function CreateHeroList(str, mydoc) {
  var campdoc = createList(str, mydoc)
  createMenuItems(createSelectMenu("初级等级", campdoc), ["1级", "4级", "5级", "8级", "10级", "12级", "15级"]);
  createMenuItems(createSelectMenu("法术攻击加成", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
  createMenuItems(createSelectMenu("物理攻击加成", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
  createMenuItems(createSelectMenu("冷却缩减", campdoc), ["无加成", "减25%", "减40%", "减80%", "减99%"]);
  createMenuItems(createSelectMenu("初始金币", campdoc), ["无加成", "1000", "2000", "5000", "12000"]);
  createMenuItems(createSelectMenu("移速", campdoc), ["无加成", "加10%", "加20%", "加30%"]);
}

function CreatebxList(str, str2, mydoc) {
  var campdoc = createList(str, mydoc)
  var campdoc1 = createList(str2, mydoc)
  createMenuItems(createSelectMenu("攻击力", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
  createMenuItems(createSelectMenu("血量", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
  createMenuItems(createSelectMenu("移动速度", campdoc), ["无加成", "加25%", "加50%", "加100%"]);
  createMenuItems(createSelectMenu("刷新速度", campdoc), ["无加成", "加5%", "加10%", "加15%"]);
  createMenuItems(createSelectMenu("出兵类型", campdoc), ["普通兵线", "超级兵", "主宰先锋"]);
  createMenuItems(createSelectMenu("出兵路线", campdoc, true), ["对抗路", "中路", "发育路"], ["对抗路", "中路", "发育路"]);
  createMenuItems(createSelectMenu("攻击力", campdoc1), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
  createMenuItems(createSelectMenu("血量", campdoc1), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
}

function CreatesjList(str, str2, mydoc) {
  var campdoc = createList(str, mydoc)
  var campdoc1 = createList(str2, mydoc)
  createMenuItems(createSelectMenu("攻击力", campdoc), ["无加成", "加25%", "加50%", "加100%"]);
  createMenuItems(createSelectMenu("攻击范围", campdoc), ["无加成", "加25%", "加50%"]);
  createMenuItems(createSelectMenu("血量", campdoc), ["无加成", "加25%", "加50%", "加100%"]);
  createMenuItems(createSelectMenu("攻击力", campdoc1), ["无加成", "加25%", "加50%", "加100%"]);
  createMenuItems(createSelectMenu("血量", campdoc1), ["无加成", "加25%", "加50%", "加100%"]);
}
var allputong = document.getElementsByClassName("putong")
var zhenyingDocBlue = document.getElementsByClassName("zhenying_blue")
var zhenyingDocRed = document.getElementsByClassName("zhenying_red")

function loadmenu() {
  loadmenu = false
  var herolist = Array.from({
    length: 5
  }, (_, i) => (i + 1).toString() + "号")
  var xvanshouBlue = document.getElementsByClassName("xvanshou_blue")[0]
  var xvanshouRed = document.getElementsByClassName("xvanshou_red")[0]
  // 对于herolist中的每一个元素创建任务
  const herolistTasks = herolist.map((element, index) => {
    return () => {
      const item_str = element;
      CreateHeroList("蓝方" + item_str + "英雄属性", xvanshouBlue);
      CreateHeroList("红方" + item_str + "英雄属性", xvanshouRed);
    };
  });
  var mydoc = document.getElementsByClassName("CustomSettings")[2]
  var campdoc = createList("胜利条件", mydoc)

  function processNextTask() {
    if (tasks.length > 0) {
      const task = tasks.shift();
      task();
      requestAnimationFrame(processNextTask);
    } else {
      document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")[0].style.display = ""
      document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")[0].style.display = ""
      window.loadmenu = true
      customdialog.open = true
      document.getElementsByClassName("blueheronum")[0].value = "1"
      document.getElementsByClassName("redheronum")[0].value = "1"
      var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
      if (localStorage.getItem("wzzdy_customsettip") != "0.1") {
        mdui.alert({
          headline: "提示",
          description: "网页偏重自定义属性 网页为自定义属性提供了高级设置 你可以手动在高级设置中实现更多高级功能 高级配置与该配置绑定 例如 你可以设置随机生成和打乱指定自定义属性 实现属性与地图模式 禁用英雄的绑定 等等",
          confirmText: "确定",
          onConfirm: () => localStorage.setItem("wzzdy_customsettip", "0.1"),
        });
      }
      try {
        选择自定义配置(custom_json[document.querySelectorAll(".myedit")[2].value])
      } catch (e) {
        console.log(e)
      }
    }
  }
  // 将所有创建和添加元素的任务放在一个数组里
  const tasks = [
    () => CreateHeroList("英雄属性", allputong[0]),
    () => CreateHeroList("蓝方英雄属性", zhenyingDocBlue[0]),
    () => CreateHeroList("红方英雄属性", zhenyingDocRed[0]),
    () => CreatebxList("兵线属性", "野怪属性", allputong[1]),
    () => CreatebxList("蓝方兵线属性", "蓝方野怪属性", zhenyingDocBlue[1]),
    () => CreatebxList("红方兵线属性", "红方野怪属性", zhenyingDocRed[1]),
    () => CreatesjList("防御塔属性", "水晶属性", allputong[2]),
    () => createMenuItems(createSelectMenu("胜利条件", campdoc), ["摧毁水晶", "摧毁任意一个一塔", "摧毁任意一个二塔", "摧毁任意一个三塔", "3个总击败", "20个总击败", "30个总击败", "40个总击败", "1个助攻", "5个助攻", "10个助攻",]).id = "mytiao",
    () => CreatesjList("蓝方防御塔属性", "蓝方水晶属性", zhenyingDocBlue[2]),
    () => CreatesjList("红方防御塔属性", "红方水晶属性", zhenyingDocRed[2]),
  ];
  tasks.push(...herolistTasks);
  requestAnimationFrame(processNextTask);
}

function zhenying_panduan(pos, defvalue, xvanshou) {
  document.getElementsByClassName("zhenying_xz")[pos].style.display = ""
  if (defvalue == "blue") {
    if (xvanshou) {
      document.getElementsByClassName("xvanshou")[pos].style.display = "none"
    }
    zhenyingDocBlue[pos].style.display = ""
    zhenyingDocRed[pos].style.display = "none"
  } else if (defvalue == "red") {
    if (xvanshou) {
      document.getElementsByClassName("xvanshou")[pos].style.display = "none"
    }
    zhenyingDocBlue[pos].style.display = "none"
    zhenyingDocRed[pos].style.display = ""
  }
}
document.getElementsByClassName("zhenying_xz")[0].addEventListener("change", function() {
  zhenying_panduan(0, this.value, true)
})
document.getElementsByClassName("zhenying_xz")[1].addEventListener("change", function() {
  zhenying_panduan(1, this.value)
})
document.getElementsByClassName("zhenying_xz")[2].addEventListener("change", function() {
  zhenying_panduan(2, this.value)
})

function custom_panduan(pos, defvalue, xvanshou) {
  if (defvalue == "zhenying") {
    document.getElementsByClassName("zhenying_xz")[pos].style.display = ""
    allputong[pos].style.display = "none"
    var mdefvalue = document.getElementsByClassName("zhenying_xz")[pos].value
    if (mdefvalue == "blue") {
      document.getElementsByClassName("zhenying")[pos].style.display = ""
      if (xvanshou) {
        document.getElementsByClassName("xvanshou")[pos].style.display = "none"
      }
      zhenyingDocBlue[pos].style.display = ""
      zhenyingDocRed[pos].style.display = "none"
    } else {
      document.getElementsByClassName("zhenying")[pos].style.display = ""
      if (xvanshou) {
        document.getElementsByClassName("xvanshou")[pos].style.display = "none"
      }
      zhenyingDocBlue[pos].style.display = "none"
      zhenyingDocRed[pos].style.display = ""
    }
  } else if (defvalue == "xvanshou") {
    allputong[pos].style.display = "none"
    document.getElementsByClassName("zhenying")[pos].style.display = "none"
    document.getElementsByClassName("zhenying_xz")[pos].style.display = "none"
    document.getElementsByClassName("xvanshou")[pos].style.display = ""
  } else if (defvalue == "all") {
    allputong[pos].style.display = ""
    document.getElementsByClassName("zhenying")[pos].style.display = "none"
    document.getElementsByClassName("zhenying_xz")[pos].style.display = "none"
    if (xvanshou) {
      document.getElementsByClassName("xvanshou")[pos].style.display = "none"
    }
  }
}
document.getElementsByClassName("setmode")[0].addEventListener("change", function() {
  custom_panduan(0, this.value, true)
})
document.getElementsByClassName("setmode")[1].addEventListener("change", function() {
  custom_panduan(1, this.value)
})
document.getElementsByClassName("setmode")[2].addEventListener("change", function() {
  custom_panduan(2, this.value)
})
document.getElementsByClassName("blueheronum")[0].addEventListener("change", function() {
  var defvalue = this.value
  var doc = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
  for (let index = 0; index < doc.length; index++) {
    const element = doc[index];
    if (index + 1 == [parseInt(defvalue)]) {
      element.style.display = ""
    } else {
      element.style.display = "none"
    }
  }
})
document.getElementsByClassName("redheronum")[0].addEventListener("change", function() {
  var defvalue = this.value
  var doc = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")
  for (let index = 0; index < doc.length; index++) {
    const element = doc[index];
    if (index + 1 == [parseInt(defvalue)]) {
      element.style.display = ""
    } else {
      element.style.display = "none"
    }
  }
})
// Fisher-Yates 洗牌算法
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 交换元素
    [array[i],
      array[j]] = [array[j],
      array[i]];
  }
}

function shuffleArray2(Arr1, Arr2, randomtab) {
  var combinedArr = Arr1.concat(Arr2);
  // 打乱合并后的数组
  shuffleSelectedPositions(combinedArr, randomtab);
  // 将打乱后的数组拆分成两个数组
  var shuffledArr1 = combinedArr.slice(0, Arr1.length);
  var shuffledArr2 = combinedArr.slice(Arr1.length);
  // 打印结果（示例）
  console.log("打乱前:", Arr1, Arr2);
  console.log("打乱后的:", shuffledArr1, shuffledArr2);
  return [shuffledArr1,
    shuffledArr2]
}

function shuffleSelectedPositions(arr, positionsToShuffle) {
  const shuffledArr = arr;
  const length = positionsToShuffle.length;
  for (let i = 0; i < length; i++) {
    const currentPos = positionsToShuffle[i] - 1;
    const randomPos = Math.floor(Math.random() * length);
    // 使用数组解构交换元素
    [shuffledArr[currentPos],
      shuffledArr[positionsToShuffle[randomPos] - 1]] = [shuffledArr[positionsToShuffle[randomPos] - 1],
      shuffledArr[currentPos]];
  }
  return shuffledArr;
}

function getRandomElementFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function shuffleArray3(Arr1, Arr2, randomtab, postab) {
  var combinedArr = Arr1.concat(Arr2);
  // 打乱合并后的数组
  for (let index = 0; index < postab.length; index++) {
    const pos = postab[index] - 1
    let random = getRandomElementFromArray(randomtab)
    combinedArr[pos] = random
  }
  // 将打乱后的数组拆分成两个数组
  var shuffledArr1 = combinedArr.slice(0, Arr1.length);
  var shuffledArr2 = combinedArr.slice(Arr1.length);
  console.log("随机生成前:", Arr1, Arr2);
  console.log("随机生成后的:", shuffledArr1, shuffledArr2);
  return [shuffledArr1,
    shuffledArr2]
}

function shuffleArray4(Arr, randomtab, postab) {
  if (Array.isArray(Arr) == false) {
    let random = getRandomElementFromArray(randomtab)
    console.log("随机生成前:", Arr);
    console.log("随机生成后的:", randomtab);
    return random
  }
  const combinedArr = [...Arr]
  // 打乱合并后的数组
  for (let index = 0; index < postab.length; index++) {
    const pos = postab[index] - 1
    let random = getRandomElementFromArray(randomtab)
    combinedArr[pos] = random
  }
  console.log("随机生成前:", Arr);
  console.log("随机生成后的:", combinedArr);
  return combinedArr
}

function decrementNumberAfterColon(inputString) {
  return inputString.replace(/:(\d+)$/, (match, capturedNumber) => `:${parseInt(capturedNumber, 10) - 1}`);
}

function makejson(HeroList, bxList, ygList, fytList, sjList, gjjson) {
  //懒得优化的代码 或许会在有生之年优化吧
  var HeroList_blue = HeroList[0]
  var HeroList_red = HeroList[1]
  var expList_blue = HeroList_blue[0]
  var expList_red = HeroList_red[0]
  var fashuList_blue = HeroList_blue[1]
  var fashuList_red = HeroList_red[1]
  var wuliList_blue = HeroList_blue[2]
  var wuliList_red = HeroList_red[2]
  var cdList_blue = HeroList_blue[3]
  var cdList_red = HeroList_red[3]
  var jinbiList_blue = HeroList_blue[4]
  var jinbiList_red = HeroList_red[4]
  var ysList_blue = HeroList_blue[5]
  var ysList_red = HeroList_red[5]
  var sjsc = gjjson[2]
  var sjdl = gjjson[3]

  function 判断随机生成数据(pos, randomtab, postab) {
    if (pos == 1) {
      const result = shuffleArray3(expList_blue, expList_red, randomtab, postab);
      expList_blue = result[0]
      expList_red = result[1]
    } else if (pos == 2) {
      const result = shuffleArray3(fashuList_blue, fashuList_red, randomtab, postab);
      fashuList_blue = result[0]
      fashuList_red = result[1]
    } else if (pos == 3) {
      const result = shuffleArray3(wuliList_blue, wuliList_red, randomtab, postab);
      wuliList_blue = result[0]
      wuliList_red = result[1]
    } else if (pos == 4) {
      const result = shuffleArray3(cdList_blue, cdList_red, randomtab, postab);
      cdList_blue = result[0]
      cdList_red = result[1]
    } else if (pos == 5) {
      const result = shuffleArray3(jinbiList_blue, jinbiList_red, randomtab, postab);
      jinbiList_blue = result[0]
      jinbiList_red = result[1]
    } else if (pos == 6) {
      const result = shuffleArray3(ysList_blue, ysList_red, randomtab, postab);
      ysList_blue = result[0]
      ysList_red = result[1]
    } else if (pos == 7) {
      bxList[0] = shuffleArray4(bxList[0], randomtab, postab);
    } else if (pos == 8) {
      bxList[1] = shuffleArray4(bxList[1], randomtab, postab);
    } else if (pos == 9) {
      bxList[2] = shuffleArray4(bxList[2], randomtab, postab);
    } else if (pos == 10) {
      bxList[3] = shuffleArray4(bxList[3], randomtab, postab);
    } else if (pos == 11) {
      bxList[4] = shuffleArray4(bxList[4], randomtab, postab);
    } else if (pos == 12) {
      bxList[5] = shuffleArray4(bxList[5], randomtab, postab);
    } else if (pos == 13) {
      ygList[0] = shuffleArray4(ygList[0], randomtab, postab);
    } else if (pos == 14) {
      ygList[1] = shuffleArray4(ygList[1], randomtab, postab);
    } else if (pos == 15) {
      fytList[0] = shuffleArray4(fytList[0], randomtab, postab);
    } else if (pos == 16) {
      fytList[1] = shuffleArray4(fytList[1], randomtab, postab);
    } else if (pos == 17) {
      fytList[2] = shuffleArray4(fytList[2], randomtab, postab);
    } else if (pos == 18) {
      sjList[0] = shuffleArray4(sjList[0], randomtab, postab);
    } else if (pos == 19) {
      sjList[1] = shuffleArray4(sjList[1], randomtab, postab);
    } else if (pos == 20) {
      sjList[2] = shuffleArray4(sjList[2], randomtab, postab);
    }
  }

  function 判断随机打乱数据(pos, randomtab) {
    if (pos == 1) {
      const result = shuffleArray2(expList_blue, expList_red, randomtab);
      expList_blue = result[0]
      expList_red = result[1]
    } else if (pos == 2) {
      const result = shuffleArray2(fashuList_blue, fashuList_red, randomtab);
      fashuList_blue = result[0]
      fashuList_red = result[1]
    } else if (pos == 3) {
      const result = shuffleArray2(wuliList_blue, wuliList_red, randomtab);
      wuliList_blue = result[0]
      wuliList_red = result[1]
    } else if (pos == 4) {
      const result = shuffleArray2(cdList_blue, cdList_red, randomtab);
      cdList_blue = result[0]
      cdList_red = result[1]
    } else if (pos == 5) {
      const result = shuffleArray2(jinbiList_blue, jinbiList_red, randomtab);
      jinbiList_blue = result[0]
      jinbiList_red = result[1]
    } else if (pos == 6) {
      const result = shuffleArray2(ysList_blue, ysList_red, randomtab);
      ysList_blue = result[0]
      ysList_red = result[1]
    } else if (pos == 7) {
      bxList[0] = shuffleArray(bxList[0]);
    } else if (pos == 8) {
      bxList[1] = shuffleArray(bxList[1]);
    } else if (pos == 9) {
      bxList[2] = shuffleArray(bxList[2]);
    } else if (pos == 10) {
      bxList[3] = shuffleArray(bxList[3]);
    } else if (pos == 11) {
      bxList[4] = shuffleArray(bxList[4]);
    } else if (pos == 12) {
      bxList[5] = shuffleArray(bxList[5]);
    } else if (pos == 13) {
      ygList[0] = shuffleArray(ygList[0]);
    } else if (pos == 14) {
      ygList[1] = shuffleArray(ygList[1]);
    } else if (pos == 15) {
      fytList[0] = shuffleArray(fytList[0]);
    } else if (pos == 16) {
      fytList[1] = shuffleArray(fytList[1]);
    } else if (pos == 17) {
      fytList[2] = shuffleArray(fytList[2]);
    } else if (pos == 18) {
      sjList[0] = shuffleArray(sjList[0]);
    } else if (pos == 19) {
      sjList[1] = shuffleArray(sjList[1]);
    }
  }
  if (sjsc != "" && isJSON(sjsc)) {
    var scgz = JSON.parse(sjsc)
    for (item in scgz) {
      // 使用闭包解决
      (function(item_str) {
        scgz[item_str].forEach(element => {
          var [randomtab, postab] = element.split(":")
          randomtab = randomtab.match(/\d+/g).map(Number);
          postab = postab.match(/\d+/g).map(Number);
          判断随机生成数据(item_str, randomtab, postab)
        });
      })(item);
    }
  }
  if (sjdl != "" && isJSON(sjdl)) {
    var scgz1 = JSON.parse(sjdl)
    for (item in scgz1) {
      // 使用闭包解决
      (function(item_str) {
        scgz1[item_str].forEach(element => {
          let randomtab = element.match(/\d+/g).map(Number);
          判断随机打乱数据(item_str, randomtab)
        });
      })(item);
    }
  }
  var jsondo = [
    "0:" + expList_blue[0],
    "51:" + expList_blue[1],
    "56:" + expList_blue[2],
    "61:" + expList_blue[3],
    "66:" + expList_blue[4],
    "28:" + expList_red[0],
    "71:" + expList_red[1],
    "76:" + expList_red[2],
    "81:" + expList_red[3],
    "86:" + expList_red[4],
    "1:" + fashuList_blue[0],
    "52:" + fashuList_blue[1],
    "57:" + fashuList_blue[2],
    "62:" + fashuList_blue[3],
    "67:" + fashuList_blue[4],
    "29:" + fashuList_red[0],
    "72:" + fashuList_red[1],
    "77:" + fashuList_red[2],
    "82:" + fashuList_red[3],
    "87:" + fashuList_red[4],
    "2:" + wuliList_blue[0],
    "53:" + wuliList_blue[1],
    "58:" + wuliList_blue[2],
    "63:" + wuliList_blue[3],
    "68:" + wuliList_blue[4],
    "30:" + wuliList_red[0],
    "73:" + wuliList_red[1],
    "78:" + wuliList_red[2],
    "83:" + wuliList_red[3],
    "88:" + wuliList_red[4],
    "3:" + cdList_blue[0],
    "21:" + cdList_blue[0],
    "54:" + cdList_blue[1],
    "91:" + cdList_blue[1],
    "59:" + cdList_blue[2],
    "92:" + cdList_blue[2],
    "64:" + cdList_blue[3],
    "93:" + cdList_blue[3],
    "69:" + cdList_blue[4],
    "94:" + cdList_blue[4],
    "31:" + cdList_red[0],
    "47:" + cdList_red[0],
    "74:" + cdList_red[1],
    "95:" + cdList_red[1],
    "79:" + cdList_red[2],
    "96:" + cdList_red[2],
    "84:" + cdList_red[3],
    "97:" + cdList_red[3],
    "89:" + cdList_red[4],
    "98:" + cdList_red[4],
    "4:" + jinbiList_blue[0],
    "55:" + jinbiList_blue[1],
    "60:" + jinbiList_blue[2],
    "65:" + jinbiList_blue[3],
    "70:" + jinbiList_blue[4],
    "32:" + jinbiList_red[0],
    "75:" + jinbiList_red[1],
    "80:" + jinbiList_red[2],
    "85:" + jinbiList_red[3],
    "90:" + jinbiList_red[4],
    "106:" + ysList_blue[0],
    "107:" + ysList_blue[1],
    "108:" + ysList_blue[2],
    "109:" + ysList_blue[3],
    "110:" + ysList_blue[4],
    "111:" + ysList_red[0],
    "112:" + ysList_red[1],
    "113:" + ysList_red[2],
    "114:" + ysList_red[3],
    "115:" + ysList_red[4],
    "5:" + bxList[0][0],
    "33:" + bxList[0][1],
    "6:" + bxList[1][0],
    "34:" + bxList[1][1],
    "7:" + bxList[2][0],
    "35:" + bxList[2][1],
    "8:" + bxList[3][0],
    "36:" + bxList[3][1],
    "9:" + bxList[4][0],
    "37:" + bxList[4][1],
    /*
        "10:" + bxList[5][0],
        "38:" + bxList[5][1],
        */
    "11:" + ygList[0][0],
    "39:" + ygList[0][1],
    "12:" + ygList[1][0],
    "40:" + ygList[1][1],
    "13:" + fytList[0][0],
    "22:" + fytList[0][0],
    "41:" + fytList[0][1],
    "48:" + fytList[0][1],
    "15:" + fytList[1][0],
    "24:" + fytList[1][0],
    "43:" + fytList[1][1],
    "50:" + fytList[1][1],
    "14:" + fytList[2][0],
    "23:" + fytList[2][0],
    "42:" + fytList[2][1],
    "49:" + fytList[2][1],
    "16:" + sjList[0][0],
    "44:" + sjList[0][1],
    "17:" + sjList[1][0],
    "45:" + sjList[1][1],
  ]
  for (let index = 0; index < jsondo.length; index++) {
    const element = jsondo[index];
    const value = element.split(":")[1]
    if (value == "" || value == "0") {
      throw "自定义配置信息有误 点击自定义配置的管理配置手动保存配置来更新该配置即可解决该问题"
    }
    if (value == "1") {
      jsondo.splice(index, 1);
      index--;
    } else {
      jsondo[index] = decrementNumberAfterColon(element)
    }
  }
  var bxdata = bxList[5]
  var blue_bxdata = bxdata[0]
  var red_bxdata = bxdata[1]
  var add_bxdata = []
  if (blue_bxdata != "null") {
    add_bxdata.push("10:" + blue_bxdata)
  }
  if (red_bxdata != "null") {
    add_bxdata.push("38:" + red_bxdata)
  }
  jsondo = [...jsondo,
    ...add_bxdata]
  var gamemode = sjList[2]
  var gamelist = {
    1: [],
    2: ["19:1"],
    3: ["19:1",
      "103:1"],
    4: ["19:1",
      "103:2"],
    5: ["19:2"],
    6: ["19:2",
      "20:1"],
    7: ["19:2",
      "20:2"],
    8: ["19:2",
      "20:3"],
    9: ["19:2",
      "105:1"],
    10: ["19:2",
      "105:1",
      "104:1"],
    11: ["19:2",
      "105:1",
      "104:2"],
  }
  jsondo = [...jsondo,
    ...gamelist[gamemode]]
  return jsondo;
}

function 加载自定义配置() {
  var menudoc = document.querySelectorAll(".mymenu")[2];
  var ismenu = false;
  if (customdialog && customdialog.open == true) {
    ismenu = true;
    menudoc = customdialog.getElementsByClassName("mymenu")[0];
  }
  // 清空现有菜单项（保留搜索框）
  var childnodes = menudoc.childNodes;
  for (let index = 0; index < childnodes.length; index++) {
    const element = childnodes[index];
    if (element.className != "search_edit") {
      element.remove();
      index--;
    }
  }
  // 始终创建"管理配置"按钮
  if (!ismenu) {
    var menuItem = document.createElement('mdui-menu-item');
    menuItem.textContent = "管理配置";
    menuItem.isadd = true;
    menuItem.onclick = function() {
      const loadmenu = window.loadmenu;
      if (loadmenu === true) {
        try {
          var custom_json = JSON.parse(localStorage.getItem("custom_cof") || "{}");
          选择自定义配置(custom_json[document.querySelectorAll(".myedit")[2].value]);
        } catch (e) {
          console.log(e);
        }
        customdialog.open = true;
      } else {
        mdui_snackbar( {
          message: "加载中",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
        if (typeof loadmenu == "function") loadmenu();
      }
    };
    menudoc.appendChild(menuItem);
  }
  // 安全地获取和解析配置数据
  var custom_json = {};
  try {
    var storedData = localStorage.getItem("custom_cof");
    if (storedData) {
      custom_json = JSON.parse(storedData);
      // 清理无效键
      Object.keys(custom_json).forEach(key => {
        if (!key || key === "undefined" || key.trim() === "") {
          delete custom_json[key];
        }
      });
    }
  } catch (e) {
    console.error("解析自定义配置时出错:",
      e);
    custom_json = {};
  }
  // 如果有配置项，添加到菜单
  if (Object.keys(custom_json).length > 0) {
    for (let item in custom_json) {
      (function(item_str) {
        var menuItem = document.createElement('mdui-menu-item');
        menuItem.textContent = item_str;
        menuItem.onclick = function() {
          localStorage.setItem("customs", item_str);
          document.querySelectorAll(".myedit")[2].value = item_str;
          if (ismenu) {
            选择自定义配置(custom_json[item_str]);
          }
        };
        menudoc.appendChild(menuItem);
      })(item);
    }
  } else if (!ismenu) {
    // 添加提示
    mdui_snackbar( {
      message: "无配置，请点击上方「管理配置」新建配置",
      action: "确定",
      onActionClick: () => console.log("用户点击确定")
    });
  }
}

function 判断出线数值(myvalue) {
  var isdkl
  var iszd
  var isfyl
  var bxmode
  myvalue.forEach(element => {
    if (element.includes("对抗路")) {
      isdkl = true
    } else if (element.includes("中路")) {
      iszd = true
    } else if (element.includes("发育路")) {
      isfyl = true
    }
  });
  // 无 0
  if (isdkl != true && iszd != true && isfyl != true) {
    bxmode = 0
    //1 1
  } else if (isdkl && iszd != true && isfyl != true) {
    bxmode = 1
    //2 2
  } else if (isdkl != true && iszd && isfyl != true) {
    bxmode = 2
    //21 3
  } else if (isdkl && iszd && isfyl != true) {
    bxmode = 3
    //3 4
  } else if (isdkl != true && iszd != true && isfyl) {
    bxmode = 4
    //31 5
  } else if (isdkl && iszd != true && isfyl) {
    bxmode = 5
    //32 6
  } else if (isdkl != true && iszd && isfyl) {
    bxmode = 6
    //本段在实际上不存在 为网页设计
  } else if (isdkl && iszd && isfyl) {
    return "null"
  }
  return bxmode
}

function 判断数据(doc) {
  if (doc.value == "") {
    doc.value = 1
  }
  let value = doc.value
  return value
}

function 获取野怪数据(bingxiandoc, func, func2, func3, bingxiandoc2) {
  //先循环五次 出兵路线需要特殊判断
  for (let index = 0; index < 5; index++) {
    if (bingxiandoc2) {
      var mydoc = bingxiandoc[index];
      var mydoc2 = bingxiandoc2[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc2))
      func(mdata)
    } else {
      var mydoc = bingxiandoc[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc))
      func(mdata)
    }
  }
  if (bingxiandoc2) {
    var bxvalue = 判断出线数值(bingxiandoc[5].value)
    var bxvalue2 = 判断出线数值(bingxiandoc2[5].value)
    var mdata = []
    mdata.push(bxvalue)
    mdata.push(bxvalue2)
    func2(mdata)
  } else {
    var myvalue = 判断出线数值(bingxiandoc[5].value)
    var mdata = []
    mdata.push(myvalue)
    mdata.push(myvalue)
    func2(mdata)
  }
  //野怪list
  for (let index = 6; index < 8; index++) {
    if (bingxiandoc2) {
      const mydoc = bingxiandoc[index];
      const mydoc2 = bingxiandoc2[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc2))
      func3(mdata)
    } else {
      const mydoc = bingxiandoc[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc))
      func3(mdata)
    }
  }
}

function 获取防御塔属性(fytsjdoc, func, func2, func3, fytsjdoc2) {
  //获取防御塔属性
  for (let index = 0; index < 3; index++) {
    if (fytsjdoc2) {
      const mydoc = fytsjdoc[index];
      const mydoc2 = fytsjdoc2[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc2))
      func(mdata)
    } else {
      const mydoc = fytsjdoc[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc))
      func(mdata)
    }
  }
  //获取水晶属性
  for (let index = 3; index < 5; index++) {
    if (fytsjdoc2) {
      const mydoc = fytsjdoc[index];
      const mydoc2 = fytsjdoc2[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc2))
      func2(mdata)
    } else {
      const mydoc = fytsjdoc[index];
      var mdata = []
      mdata.push(判断数据(mydoc))
      mdata.push(判断数据(mydoc))
      func2(mdata)
    }
  }
  func3(判断数据(document.getElementById("mytiao")))
}

function 获取选择自定义名() {
  var bxConfList = []
  var ygConfList = []
  var ygmode = document.getElementsByClassName("setmode")[1].value
  if (ygmode == "all") {
    var bingxiandoc = allputong[1].getElementsByTagName("mdui-select")
    获取野怪数据(bingxiandoc, function(myvalue) {
      bxConfList.push(myvalue)
    }, function(myvalue) {
      bxConfList.push(myvalue)
    }, function(myvalue) {
      ygConfList.push(myvalue)
    })
  } else if (ygmode == "zhenying") {
    var bingxiandoc_blue = zhenyingDocBlue[1].getElementsByTagName("mdui-select")
    var bingxiandoc_red = zhenyingDocRed[1].getElementsByTagName("mdui-select")
    获取野怪数据(bingxiandoc_blue, function(myvalue) {
      bxConfList.push(myvalue)
    }, function(myvalue) {
      bxConfList.push(myvalue)
    }, function(myvalue) {
      ygConfList.push(myvalue)
    }, bingxiandoc_red)
  }
  var fytConfList = []
  var sjConfList = []
  var sjmode = document.getElementsByClassName("setmode")[2].value
  if (sjmode == "all") {
    var fytsjdoc = allputong[2].getElementsByTagName("mdui-select")
    获取防御塔属性(fytsjdoc, function(myvalue) {
      fytConfList.push(myvalue)
    }, function(myvalue) {
      sjConfList.push(myvalue)
    }, function(myvalue) {
      sjConfList.push(myvalue)
    })
  } else if (sjmode == "zhenying") {
    var fytsjdoc_blue = zhenyingDocBlue[2].getElementsByTagName("mdui-select")
    var fytsjdoc_red = zhenyingDocRed[2].getElementsByTagName("mdui-select")
    获取防御塔属性(fytsjdoc_blue, function(myvalue) {
      fytConfList.push(myvalue)
    }, function(myvalue) {
      sjConfList.push(myvalue)
    }, function(myvalue) {
      sjConfList.push(myvalue)
    }, fytsjdoc_red)
  }
  var HeroList = []
  var value = document.getElementsByClassName("setmode")[0].value
  if (value == "zhenying") {
    var bluedoc = document.getElementsByClassName("zhenying_blue")[0].getElementsByTagName("mdui-select")
    var reddoc = document.getElementsByClassName("zhenying_red")[0].getElementsByTagName("mdui-select")
    var HeroList_blue = []
    var HeroList_red = []
    for (let index = 0; index < 6; index++) {
      var herodata_blue = []
      var herodata_red = []
      for (let i = 0; i < 5; i++) {
        herodata_blue.push(判断数据(bluedoc[index]))
        herodata_red.push(判断数据(reddoc[index]))
      }
      HeroList_blue.push(herodata_blue)
      HeroList_red.push(herodata_red)
    }
    HeroList.push(HeroList_blue)
    HeroList.push(HeroList_red)
  } else if (value == "xvanshou") {
    var bluedoc = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-select")
    var reddoc = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-select")
    var bluelist = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
    var redlist = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")
    var HeroList_blue = []
    var HeroList_red = []
    for (let index = 0; index < 6; index++) {
      var herodata_blue = []
      var herodata_red = []
      for (let i = 0; i < 5; i++) {
        herodata_blue.push(判断数据(bluelist[i].getElementsByTagName("mdui-select")[index]))
        herodata_red.push(判断数据(redlist[i].getElementsByTagName("mdui-select")[index]))
      }
      HeroList_blue.push(herodata_blue)
      HeroList_red.push(herodata_red)
    }
    HeroList.push(HeroList_blue)
    HeroList.push(HeroList_red)
  } else {
    var HeroList_blue = []
    var HeroList_red = []
    for (let index = 0; index < 6; index++) {
      var herodata_blue = []
      var herodata_red = []
      for (let i = 0; i < 5; i++) {
        herodata_blue.push(判断数据(allputong[0].getElementsByTagName("mdui-select")[index]))
        herodata_red.push(判断数据(allputong[0].getElementsByTagName("mdui-select")[index]))
      }
      HeroList_blue.push(herodata_blue)
      HeroList_red.push(herodata_red)
    }
    HeroList.push(HeroList_blue)
    HeroList.push(HeroList_red)
  }
  if (HeroList.length == 0) {
    return null
  }
  var alljson = []
  alljson.push(HeroList)
  alljson.push(bxConfList)
  alljson.push(ygConfList)
  alljson.push(fytConfList)
  alljson.push(sjConfList)
  console.log(alljson)
  return JSON.stringify(alljson)
}

function 设置自定义项目(myindex, endindex, myjson, doc) {
  for (let index = myindex; index < endindex; index++) {
    //将下标改为从0开始
    var i = index - myindex
    var element = myjson[i][0];
    doc[index].value = element;
  }
}

function 设置自定义项目2(myindex, endindex, myjson, doc, doc2) {
  for (let index = myindex; index < endindex; index++) {
    //将下标改为从0开始
    var i = index - myindex
    var element = myjson[i][0];
    doc[index].value = element
    var element = myjson[i][1];
    doc2[index].value = element
  }
}

function 选择自定义配置(json) {
  if (typeof json == "undefined") {
    return
  }
  var alldoc = customdialog.getElementsByTagName("mdui-select")
  for (let index = 0; index < alldoc.length; index++) {
    alldoc[index].value = alldoc[index].defvalue
  }
  var yxvalue = json.yxtype
  var bxvalue = json.bxtype
  var sjvalue = json.sjtype
  document.getElementsByClassName("setmode")[0].value = yxvalue
  document.getElementsByClassName("setmode")[1].value = bxvalue
  document.getElementsByClassName("setmode")[2].value = sjvalue
  var myjson = JSON.parse(json.myjson)
  edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
  if (json.adjson) {
    var ccc = json.adjson
    edittt[0].value = ccc[0]
    edittt[1].value = ccc[1]
    edittt[2].data = ccc[2]
    edittt[3].data = ccc[3]
  } else {
    edittt[0].value = ""
    edittt[1].value = ""
    edittt[2].data = ""
    edittt[3].data = ""
  }
  var json_herolist = myjson[0]
  var json_bxlist = myjson[1]
  var json_yglist = myjson[2]
  var json_fytlist = myjson[3]
  var json_sjlist = myjson[4]
  const bxjsonMap = {
    0: [],
    1: ["对抗路"],
    2: ["中路"],
    3: ["对抗路",
      "中路"],
    4: ["发育路"],
    5: ["对抗路",
      "发育路"],
    6: ["中路",
      "发育路"],
    "null": ["对抗路",
      "中路",
      "发育路"],
  };
  if (bxvalue == "all") {
    //先循环五次 出兵路线需要特殊判断
    var mduiDoc = allputong[1].getElementsByTagName("mdui-select")
    var myjson = json_bxlist
    var myjson2 = json_yglist
    设置自定义项目(0, 5, myjson, mduiDoc)
    var myvalue = myjson[myjson.length - 1][0]
    mduiDoc[5].value = bxjsonMap[myvalue];
    设置自定义项目(6, 8, myjson2, mduiDoc)
  } else if (bxvalue == "zhenying") {
    var bluedoc = zhenyingDocBlue[1].getElementsByTagName("mdui-select")
    var reddoc = zhenyingDocRed[1].getElementsByTagName("mdui-select")
    var myjson = json_bxlist
    var myjson2 = json_yglist
    设置自定义项目2(0, 5, myjson, bluedoc, reddoc)
    var myvalue = myjson[myjson.length - 1][0]
    bluedoc[5].value = bxjsonMap[myvalue];
    var myvalue = myjson[myjson.length - 1][1]
    reddoc[5].value = bxjsonMap[myvalue];
    设置自定义项目2(6, 8, json_yglist, bluedoc, reddoc)
  }
  if (sjvalue == "all") {
    var myjson = json_fytlist
    var myjson2 = json_sjlist
    var mduiDoc = allputong[2].getElementsByTagName("mdui-select")
    设置自定义项目(0, 3, myjson, mduiDoc)
    设置自定义项目(3, 5, myjson2, mduiDoc)
  } else if (sjvalue == "zhenying") {
    var bluedoc = zhenyingDocBlue[2].getElementsByTagName("mdui-select")
    var reddoc = zhenyingDocRed[2].getElementsByTagName("mdui-select")
    var myjson = json_fytlist
    var myjson2 = json_fytlist
    设置自定义项目2(0, 3, myjson, bluedoc, reddoc)
    设置自定义项目2(3, 5, myjson, bluedoc, reddoc)
  }
  var myvalue = json_sjlist[json_sjlist.length - 1]
  document.getElementById("mytiao").value = myvalue;
  if (yxvalue == "zhenying") {
    var bluedoc = document.getElementsByClassName("zhenying_blue")[0]
    var reddoc = document.getElementsByClassName("zhenying_red")[0]
    for (let index = 0; index < 6; index++) {
      var element = json_herolist[0][index];
      bluedoc.getElementsByTagName("mdui-select")[index].value = element[0]
      var element = json_herolist[1][index];
      reddoc.getElementsByTagName("mdui-select")[index].value = element[0]
    }
  } else if (yxvalue == "xvanshou") {
    var bluelist = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
    var redlist = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")
    for (let index = 0; index < 6; index++) {
      for (let i = 0; i < 5; i++) {
        var element = json_herolist[0][index];
        bluelist[i].getElementsByTagName("mdui-select")[index].value = element[i]
        var element = json_herolist[1][index];
        redlist[i].getElementsByTagName("mdui-select")[index].value = element[i]
      }
    }
  } else {
    for (let index = 0; index < 6; index++) {
      var element = json_herolist[0][index];
      allputong[0].getElementsByTagName("mdui-select")[index].value = element[0]
    }
  }
}
var customButton = document.getElementsByClassName("custombutton")
customButton[0].onclick = function() {
  加载自定义配置()
}
customButton[1].onclick = function() {
  mdui.prompt({
    headline: "新建配置",
    description: "请输入配置名以新建配置",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: (value) => {
      var 自定义名 = 获取选择自定义名()
      var custom_json
      if (localStorage.getItem("custom_cof")) {
        custom_json = JSON.parse(localStorage.getItem("custom_cof"))
      } else {
        custom_json = {}
      }
      if (value == "") {
        mdui.alert({
          headline: "提示",
          description: "新建配置失败！配置名称不能为空，请重新输入！",
          confirmText: "确定",
        });
        return;
      }
      if (isJSON(value)) {
        mdui.alert({
          headline: "提示",
          description: "保存失败 保存配置不可是json 请输入正常字符串",
          confirmText: "确定",
          onConfirm: () => console.log("confirmed"),
        });
        return
      }
      custom_json[value] = {
        myjson: 自定义名,
        yxtype: document.getElementsByClassName("setmode")[0].value,
        bxtype: document.getElementsByClassName("setmode")[1].value,
        sjtype: document.getElementsByClassName("setmode")[2].value,
        adjson: ["",
          "",
          "",
          ""]
      }
      console.log(custom_json)
      localStorage.setItem("custom_cof", JSON.stringify(custom_json))
      localStorage.setItem("customs", value)
      document.querySelectorAll(".myedit")[2].value = value;
      加载自定义配置()
      mdui_snackbar( {
        message: "新建配置成功",
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    },
    onCancel: () => console.log("canceled"),
  });
}
customButton[2].onclick = function() {
  var 自定义名 = 获取选择自定义名()
  edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
  var custom_json = {}
  custom_json = {
    myjson: 自定义名,
    yxtype: document.getElementsByClassName("setmode")[0].value,
    bxtype: document.getElementsByClassName("setmode")[1].value,
    sjtype: document.getElementsByClassName("setmode")[2].value,
    adjson: [edittt[0].value, edittt[1].value, edittt[2].data, edittt[3].data]
  }
  复制文本(JSON.stringify(custom_json))
}
customButton[3].onclick = function() {
  mdui.prompt({
    headline: "导入配置",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: (value) => {
      try {
        选择自定义配置(JSON.parse(value))
        mdui_snackbar( {
          message: tip3,
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
      } catch {
        mdui_snackbar( {
          message: "输入配置有误",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
      }
    },
    onCancel: () => console.log("canceled"),
  });
}
customButton[4].onclick = function() {
  if (localStorage.getItem("custom_cof")) {
    var editvalue = document.querySelectorAll(".myedit")[2].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_cof"))) {
      mdui.confirm({
        headline: "提示",
        description: "是否删除该配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
          var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
          delete custom_json[editvalue]
          localStorage.setItem("custom_cof", JSON.stringify(custom_json))
          localStorage.setItem("customs", "")
          document.querySelectorAll(".myedit")[2].value = ""
          还原自定义配置()
          mdui_snackbar( {
            message: "删除配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
customButton[5].onclick = function() {
  if (localStorage.getItem("custom_cof")) {
    var editvalue = document.querySelectorAll(".myedit")[2].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_cof"))) {
      mdui.prompt({
        headline: "提示",
        description: tip4,
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
          if (value === "") {
            mdui.alert({
              headline: "提示",
              description: "重命名配置失败！配置名称不能为空！请重新输入！",
              confirmText: "确定"
            })
            return;
          }
          if (isJSON(value)) {
            mdui.alert({
              headline: "提示",
              description: "保存失败 保存配置不可是json 请输入正常字符串",
              confirmText: "确定",
              onConfirm: () => console.log("confirmed"),
            });
            return
          }
          var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
          var custom_json = 修改键名(custom_json, editvalue, value);
          localStorage.setItem("custom_cof", JSON.stringify(custom_json))
          localStorage.setItem("customs", value)
          document.querySelectorAll(".myedit")[2].value = value
          加载自定义配置()
          mdui_snackbar( {
            message: "重命名配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
customButton[6].onclick = function() {
  if (localStorage.getItem("custom_cof")) {
    var editvalue = document.querySelectorAll(".myedit")[2].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_cof"))) {
      document.getElementsByClassName("suijitest")[0].open = true
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}
customButton[7].onclick = function() {
  if (localStorage.getItem("custom_cof")) {
    var editvalue = document.querySelectorAll(".myedit")[2].value
    if (editvalue in JSON.parse(localStorage.getItem("custom_cof"))) {
      mdui.confirm({
        headline: "提示",
        description: "是否保存该配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
          var 自定义名 = 获取选择自定义名()
          var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
          edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
          custom_json[editvalue] = {
            myjson: 自定义名,
            yxtype: document.getElementsByClassName("setmode")[0].value,
            bxtype: document.getElementsByClassName("setmode")[1].value,
            sjtype: document.getElementsByClassName("setmode")[2].value,
            adjson: [edittt[0].value, edittt[1].value, edittt[2].data, edittt[3].data]
          }
          localStorage.setItem("custom_cof", JSON.stringify(custom_json))
          mdui_snackbar( {
            message: "保存配置成功",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
        },
        onCancel: () => console.log("canceled"),
      });
    } else {
      mdui_snackbar( {
        message: tip5,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    }
  } else {
    mdui_snackbar( {
      message: tip2,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
  }
}

function 还原自定义配置() {
  var alldoc = customdialog.getElementsByTagName("mdui-select")
  for (let index = 0; index < alldoc.length; index++) {
    alldoc[index].value = alldoc[index].defvalue
  }
  edittt[0].value = ""
  edittt[1].value = ""
  edittt[2].data = ""
  edittt[3].data = ""
  customdialog.querySelector("mdui-tab").click()
  customdialog.bodyRef.value.scroll({
    top: 0,
    behavior: 'smooth'
  });
}
customButton[8].onclick = function() {
  mdui.confirm({
    headline: "提示",
    description: "是否还原？",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: () => {
      还原自定义配置()
      mdui_snackbar( {
        message: "还原成功",
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
    },
    onCancel: () => console.log("canceled"),
  });
}
customButton[9].onclick = function () {
    if(自定义JSON开关 === true) {
        自定义JSON开关 = false
        mdui.alert({
        headline:"提示",
        description:"自定义JSON已关闭",
        confirmText:"确定"
    })
    }
    else {
    	自定义JSON开关 = true
        mdui.alert({
        headline:"提示",
        description:"自定义JSON已开启",
        confirmText:"确定"
    })
    }
}
customButton[10].onclick = function () {
	if(自定义JSON开关 !== true) {
		mdui.alert({
            headline:"提示",
            description:"自定义JSON未开启",
            confirmText:"确定"
        });
        return;
	}
    else {
    	自定义JSON输入框()
    }
}
function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  console.log('It is not a string!')
}
edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")

function checkpeiload() {
  peiedit = document.getElementsByClassName("peiedit")[0]
  const createcustom_tab = window.createcustom_tab
  if (createcustom_tab == true) {
    peiedit.open = true
  } else {
    mdui_snackbar( {
      message: "加载中",
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
    if (typeof createcustom_tab == "function") createcustom_tab(peiedit)
  }
}
edittt[2].onclick = function() {
  window.peimode = 2
  checkpeiload()
}
edittt[3].onclick = function() {
  window.peimode = 3
  checkpeiload()
}

function entclick() {
  var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
  if (edittt[0].value != "" && typeof mydatajson[0][edittt[0].value] == "undefined") {
    mdui.alert({
      headline: "提示",
      description: "不支持的地图名称",
      confirmText: "确定",
      onConfirm: () => console.log("confirmed"),
    });
    return
  }
  if (typeof custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"] == "undefined") {
    custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"] = ["",
      "",
      "",
      ""]
  }
  custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"][0] = edittt[0].value
  custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"][1] = edittt[1].value
  检测英雄随机禁用(edittt[1].value)
  localStorage.setItem("custom_cof", JSON.stringify(custom_json))
  document.getElementsByClassName("suijitest")[0].open = false;
  mdui_snackbar( {
    message: "保存成功",
    action: "确定",
    onActionClick: () => console.log("click action button")
  });
}

function getHexBackgroundColor(element) {
  // 获取元素的 background-color
  var computedStyles = window.getComputedStyle(element);
  var backgroundColor = computedStyles.getPropertyValue('background-color');
  // 检查是否为 RGB 或 RGBA 格式，如果是，转换为十六进制
  if (backgroundColor.match(/^rgb/) || backgroundColor.match(/^rgba/)) {
    // 提取 RGB 值
    var rgbValues = backgroundColor.match(/\d+/g).map(Number);
    // 转换为十六进制
    var hexColor = rgbValues.map(function(value) {
      return ('0' + value.toString(16)).slice(-2);
    }).join('');
    backgroundColor = '#' + hexColor;
  }
  return backgroundColor;
}
var colordoc = document.getElementsByClassName("color-preset")[0].childNodes
colordoc.forEach(element => {
  element.onclick = function() {
    if (color_message != "null") {
      mdui_snackbar( {
        message: color_message,
        action: "确定",
        onActionClick: () => console.log("click action button")
      });
      return
    }
    color = getHexBackgroundColor(this)
    localStorage.setItem("wzzdy_mythemecolor", color)
    mdui.setColorScheme(color)
  }
});
document.getElementsByClassName('color-custom')[0].addEventListener('click', function(event) {
  if (color_message != "null") {
    mdui_snackbar( {
      message: color_message,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
    event.preventDefault()
  }
});
document.getElementsByClassName("color-custom")[0].addEventListener('input', function() {
  color = this.value;
  localStorage.setItem("wzzdy_mycustomthemecolor", color)
  localStorage.setItem("wzzdy_mythemecolor", color)
  mdui.setColorScheme(color)
});
color_message = "null"
document.getElementsByClassName('color-img')[0].addEventListener('click', function(event) {
  if (color_message != "null") {
    mdui_snackbar( {
      message: color_message,
      action: "确定",
      onActionClick: () => console.log("click action button")
    });
    event.preventDefault()
    return
  }
});
document.getElementsByClassName('color-img')[0].addEventListener('input', function() {
  if (this.files && this.files[0]) {
    color_message = "正在从壁纸提取颜色中 请耐心等待"
    const file = this.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      const image = new Image();
      const blobUrl = URL.createObjectURL(file);
      image.src = blobUrl;
      mdui.getColorFromImage(image).then(color => {
        //清理blob
        URL.revokeObjectURL(blobUrl);
        //清空选择 防止重复选择不触发
        document.getElementsByClassName('color-img')[0].value = ""
        localStorage.setItem("wzzdy_mythemecolor", color)
        mdui.setColorScheme(color)
        color_message = "null"
        mdui_snackbar( {
          message: "从壁纸设置主题成功",
          action: "确定",
          onActionClick: () => console.log("click action button")
        });
      });
    };
    reader.readAsDataURL(file); // 开始读取文件内容
  }
})
document.querySelector(".color-scheme").addEventListener("open", function() {
  document.querySelector(".color_outlined").style.display = "none"
  document.querySelector(".color_filled").style.display = "unset"
})
document.querySelector(".color-scheme").addEventListener("close", function() {
  document.querySelector(".color_outlined").style.display = "unset"
  document.querySelector(".color_filled").style.display = "none"
})

function bindsearch(view) {
  view.addEventListener("input",
    function() {
      childnodes = view.parentElement.getElementsByTagName("mdui-menu-item");
      for (let i = 0; i < childnodes.length; i++) {
        if (childnodes[i].isadd == true) {
          continue
        }
        let value = childnodes[i].textContent;
        if (value.includes(this.value)) {
          childnodes[i].style.display = "";
        } else {
          childnodes[i].style.display = "none";
        }
      }
    })
  view.parentElement.parentElement.addEventListener("closed",
    function() {
      childnodes = view.parentElement.getElementsByTagName("mdui-menu-item");
      //退出清空输入框
      view.value = ""
      for (let i = 0; i < childnodes.length; i++) {
        childnodes[i].style.display = "";
      }
    })
}
const allsearchview = document.getElementsByClassName("search_edit");
for (let i = 0; i < allsearchview.length; i++) {
  bindsearch(allsearchview[i]);
}
var mysnackbar = false;

function mdui_snackbar(args) {
  if (mysnackbar && mysnackbar.style.display != "none") {
    mysnackbar.remove()
  }
  mysnackbar = mdui.snackbar(args);
}

function createcheckbox(array, ele, defvalue, menu_item) {
  defvalue = defvalue.split(',')
  if (menu_item == null) {
    menu_item = Array.from({
      length: array.length
    }, (_, index) => `${index + 1}`);
  }
  for (let index = 0; index < array.length; index++) {
    // 创建 mdui-checkbox
    var checkbox = document.createElement('mdui-checkbox');
    const value = menu_item[index].toString()
    checkbox.setAttribute('value', value);
    const element = array[index];
    checkbox.innerText = element;
    if (defvalue.includes(value)) {
      checkbox.checked = true
    }
    ele.appendChild(checkbox);
  }
}

function getIndexByTagName(element, parent) {
  if (!parent) parent = element.parentElement;
  // 过滤出具有指定tagName的子元素
  const siblingsWithTag = parent.getElementsByTagName(element.tagName.toLowerCase());
  // 找到当前元素在筛选后数组中的索引
  const index = [...siblingsWithTag].indexOf(element);
  return index !== -1 ? index: undefined; // 如果找到了就返回索引，否则返回undefined
}

function showeditdia(textv, func, ele) {
  let tabPanel = textv.parentElement.parentElement;
  let mindex = 0
  let radiodiv
  let result = ""
  let value
  let allnum = textv.allnum || tabPanel.allnum
  let step
  let allstr = []
  if (peimode == 2) {
    step = [
      "随机生成范围",
      function() {
        createcheckbox(textv.menu, radiodiv, value[0], textv.menu_item)
      },
    ]
  } else if (peimode == 3) {
    var customjson = JSON.parse(localStorage.getItem("custom_cof"))
    var myjson = JSON.parse(customjson[document.querySelectorAll(".myedit")[2].value].myjson)
    var json_herolist = myjson[0]
    var json_bxlist = myjson[1]
    var json_yglist = myjson[2]
    var json_fytlist = myjson[3]
    var json_sjlist = myjson[4]
    let list_pos = getIndexByTagName(textv.parentElement, tabPanel.parentElement);
    let textv_pos = getIndexByTagName(textv);
    let alltab = []
    if (list_pos == 0) {
      //位置 属性的对应关系
      let blue = json_herolist[0][textv_pos]
      let red = json_herolist[1][textv_pos]
      alltab = [...blue,
        ...red]
    } else if (list_pos == 1) {
      let mydata = json_bxlist[textv_pos]
      //属性 位置的对应关系
      alltab = [mydata[0],
        mydata[1]]
    } else if (list_pos == 2) {
      let mydata = json_yglist[textv_pos]
      //属性 位置的对应关系
      alltab = [mydata[0],
        mydata[1]]
    } else if (list_pos == 3) {
      let mydata = json_fytlist[textv_pos]
      //属性 位置的对应关系
      alltab = [mydata[0],
        mydata[1]]
    } else if (list_pos == 4) {
      let mydata = json_sjlist[textv_pos]
      //属性 位置的对应关系
      alltab = [mydata[0],
        mydata[1]]
    } else if (list_pos == 5) {
      //胜利条件
      let mydata = json_sjlist[textv_pos][0]
      //属性 位置的对应关系
      alltab = [mydata]
    }
    allstr = alltab.map((char, index) => allnum[index] + " " + textv.menu[char - 1]);
    step = [
      "随机打乱范围",
      function() {
        createcheckbox(allstr, radiodiv, value[0])
        //跳过第二项的设置
        mindex++
      },
    ]
  }
  if (ele && ele.data) {
    value = ele.data.split(":")
  } else {
    value = ["",
      ""]
  }
  let dia = mdui.dialog({
    headline: "提示",
    description: step[0],
    body: '<p>如显示不全可向下滑动查看更多内容</p><div class="radiodiv"></div>',
    onOpen: (dia) => {
      let mdui_buttons = dia.querySelectorAll("mdui-button")
      mdui_buttons.forEach(mdui_button => {
        mdui_button.style.margin = "0px"
        let button = mdui_button.shadowRoot.querySelector("button")
        button.style.padding = "0 0.3rem"
      });
      radiodiv = dia.getElementsByClassName("radiodiv")[0]
      step[1]()
    },
    actions: [{
      text: "返回",
      onClick: () => {
        return true;
      },
    }, {
      text: "删除",
      onClick: () => {
        if (ele == null) {
          mdui_snackbar( {
            message: "你必须要创建配置后才能删除",
            action: "确定",
            onActionClick: () => console.log("click action button")
          });
          return false
        }
        ele.remove()
        return true;
      },
    },
      {
        text: "全选",
        onClick: () => {
          var childnodes = radiodiv.childNodes
          for (let index = 0; index < childnodes.length; index++) {
            const element = childnodes[index];
            element.checked = true
          }
          return false;
        },
      },
      {
        text: "下一步",
        onClick: () => {
          var childnodes = radiodiv.childNodes
          let valuetab = []
          let localstr
          for (let index = 0; index < childnodes.length; index++) {
            const element = childnodes[index];
            if (element.checked == true) {
              valuetab.push(element.value);
            }
          }
          if ((mindex == 0 || peimode == 3) && valuetab.length < 2) {
            if (childnodes.length == 1) {
              mdui_snackbar( {
                message: "该项不支持设置该操作 请返回选择其他选项",
                action: "确定",
                onActionClick: () => console.log("click action button")
              });
              return false
            }
            mdui_snackbar( {
              message: "你必须至少选择两个选项",
              action: "确定",
              onActionClick: () => console.log("click action button")
            });
            return false
          } else if (valuetab.length == 0) {
            mdui_snackbar( {
              message: "你必须至少选择一个选项",
              action: "确定",
              onActionClick: () => console.log("click action button")
            });
            return false
          }
          mindex++
          for (let index = 0; index < childnodes.length; index++) {
            const element = childnodes[index];
            element.remove()
            index--
          }
          localstr = valuetab.join(',');
          if (mindex == 1) {
            dia.description = "作用位置设置"
            result = localstr
            createcheckbox(allnum, radiodiv, value[1])
            return false
          } else {
            if (result == "") {
              result = localstr
            } else {
              result = result + ":" + localstr
            }
            func(result)
          }
        },
      }],
  })
}

function addchipitem(data, textv, ele) {
  const listItem = document.createElement('mdui-chip');
  listItem.elevated = true;
  listItem.className = "mychip";
  listItem.textContent = "一个配置";
  listItem.data = data;
  listItem.onclick = function() {
    showeditdia(textv,
      function(result) {
        listItem.data = result
      },
      listItem)
  }
  ele.appendChild(listItem)
}

function createcustom_tab(ele) {
  var customdia = document.getElementsByClassName("custom-dialog")[0]
  var tabs = customdia.getElementsByTagName("mdui-tabs")[0]
  // 创建tabs容器
  var tabsContainer = document.createElement('mdui-tabs');
  var alltab = tabs.getElementsByTagName("mdui-tab")
  let pos = 1
  for (let index = 0; index < alltab.length; index++) {
    let tabele = alltab[index]
    var tab = document.createElement('mdui-tab');
    tab.setAttribute('value', tabele.value);
    tab.textContent = tabele.textContent;
    tabpanel = tabs.getElementsByTagName("mdui-tab-panel")[index]
    // 创建mdui-tab-panel元素
    var tabPanel = document.createElement('mdui-tab-panel');
    tabPanel.setAttribute('slot', 'panel');
    tabPanel.setAttribute('value', tabele.value);
    const orilist = tabpanel.getElementsByClassName("putong")[0];
    var newlist = orilist.cloneNode(true);
    //循环到第三页时添加胜利条件
    if (index == 2) {
      let endlist = document.querySelector("#mytiao").parentElement.cloneNode(true)
      newlist.appendChild(endlist)
    }
    // 获取所有的mdui-select元素
    var selects = newlist.querySelectorAll('mdui-select');
    selects.forEach(function(select) {
      // 创建一个新的mdui-text-field元素
      var textField = document.createElement('mdui-text-field');
      textField.className = "myedit";
      textField.label = select.label;
      textField.variant = select.variant;
      textField.value = "点击编辑配置";
      textField.readonly = true
      const select_menu = select.querySelectorAll("mdui-menu-item")
      const menu = []
      select_menu.forEach(element => {
        const text = element.textContent
        menu.push(text)
      });
      textField.menu = menu
      textField.menu_item = Array.from({
        length: menu.length
      }, (_, index) => `${index + 1}`);
      //出兵路线特殊判断
      if (select.label == "出兵路线") {
        textField.menu = [
          ["不出兵"],
          ["对抗路"],
          ["中路"],
          ["对抗路 中路"],
          ["发育路"],
          ["对抗路 发育路"],
          ["中路 发育路"],
          ["对抗路 中路 发育路"],
        ];
        textField.menu_item = [0,
          1,
          2,
          3,
          4,
          5,
          6,
          "null"]
      } else if (select.label == "胜利条件") {
        textField.allnum = ["全体"]
      }
      textField.pos = pos
      pos++
      textField.onclick = function() {
        const textv = textField
        var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
        let peiz
        try {
          peiz = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])[textv.pos]
        } catch {
          if (typeof custom_json[document.querySelectorAll(".myedit")[2].value].adjson == "undefined") {
            custom_json[document.querySelectorAll(".myedit")[2].value].adjson = ["",
              "",
              "",
              ""]
          }
        }
        if (typeof peiz == "undefined") {
          peiz = []
        }
        let oridia = mdui.dialog({
          headline: "提示",
          description: "你可新建或点击配置卡片编辑配置",
          body: '<mdui-button variant="filled" class="mdia" full-width>点击新建</mdui-button>',
          onOpen: (dia) => {
            for (let index = 0; index < peiz.length; index++) {
              const element = peiz[index];
              addchipitem(element, textv, oridia)
            }
            let mdia = dia.getElementsByClassName("mdia")[0]
            mdia.onclick = function() {
              showeditdia(textv, function(result) {
                addchipitem(result, textv, oridia)
              })
            }
          },
          actions: [{
            text: "返回",
            onClick: () => {
              return true;
            },
          },
            {
              text: "保存",
              onClick: () => {
                var chips = oridia.getElementsByTagName("mdui-chip")
                var results = []
                for (let index = 0; index < chips.length; index++) {
                  const element = chips[index];
                  results.push(element.data)
                }
                let pos = (textv.pos).toString()
                try {
                  let oridata = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])
                  if (results.length == 0) {
                    delete oridata[pos]
                  } else {
                    oridata[pos] = results
                  }
                  let result = JSON.stringify(oridata)
                  custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = result
                } catch {
                  let json = {}
                  if (results.length == 0) {
                    delete json[pos]
                  } else {
                    json[pos] = results
                  }
                  let result = JSON.stringify(json)
                  custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = result
                }
                edittt[peimode].data = custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode]
                localStorage.setItem("custom_cof", JSON.stringify(custom_json))
                textv.value = "点击编辑配置 共有" + results.length + "个配置"
                console.log(custom_json[document.querySelectorAll(".myedit")[2].value].adjson)
              },
            }],
        })
      }
      // 将textField替换select
      select.parentNode.replaceChild(textField,
        select);
    })
    var alllist = newlist.getElementsByTagName("mdui-list")
    for (let i = 0; i < alllist.length; i++) {
      const element = alllist[i];
      tabPanel.appendChild(element)
      //getElementsByTagName返回的会动态更改 appendChild会删除原元素 必须减一
      i--
    }
    if (tabpanel.querySelector(".xvanshou") != null) {
      const array = Array.from({
        length: 10
      }, (_, index) => `位置${index + 1}`);
      tabPanel.allnum = array
    } else if (tabpanel.querySelector(".zhenying") != null) {
      tabPanel.allnum = ["蓝方",
        "红方"]
    } else {
      tabPanel.allnum = ["全体"]
    }
    tabsContainer.appendChild(tab);
    tabsContainer.appendChild(tabPanel);
  }
  ele.appendChild(tabsContainer)
  tabsContainer.getElementsByTagName("mdui-tab-panel")[2]
  window.createcustom_tab = true
  ele.open = true
  ele.addEventListener("open", function() {
    ele.querySelector("mdui-tab").click()
    // 获取所有的mdui-text-field元素
    var textFields = ele.querySelectorAll('mdui-text-field');
    let index = 0
    textFields.forEach(function(textField) {
      edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
      var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
      try {
        var adjson = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])
        textField.value = "点击编辑配置 共有" + adjson[index + 1].length + "个配置"
      } catch {
        textField.value = "点击编辑配置 共有0个配置"
      }
      index++
    })
    ele.updateComplete.then(() => {
      ele.bodyRef.value.scrollTop = 0;
    })
  })
  ele.addEventListener("close", function() {
    edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
    try {
      let adstr = custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode]
      if (adstr == "{}") {
        custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = ""
        localStorage.setItem("custom_cof", JSON.stringify(custom_json))
      }
      edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
      edittt[peimode].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adstr)).length + "个配置"
    } catch {
      edittt[peimode].value = "点击编辑配置 共有0个配置"
    }
  })
}
document.getElementsByClassName("suijitest")[0].addEventListener("open", function() {
  edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
  var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
  var adjson = custom_json[document.querySelectorAll(".myedit")[2].value].adjson
  try {
    edittt[2].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adjson[2])).length + "个配置"
  } catch {
    edittt[2].value = "点击编辑配置 共有0个配置"
  }
  try {
    edittt[3].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adjson[3])).length + "个配置"
  } catch {
    edittt[3].value = "点击编辑配置 共有0个配置"
  }
})

function 复制内容处理(url) {
  const 自动文本开关 = document.querySelector("#zdwenben");
  const 文本输入框 = document.querySelector(".wenben");
  const 编辑标签 = document.querySelectorAll(".myedit");
  const 预设模板 = `地图模式：{地图模式}{换行}🈲禁用英雄：{禁用英雄}{换行}🔗点击下方链接加入房间{换行}{链接}{换行}📣加入失败?说明房间已销毁{换行}📣成员已满?请更换阵营加入{换行}祝您玩的开心❤️{换行}-----星凌王者创房工具-----`;

  function 替换所有变量(内容) {
    const 地图ID = 编辑标签[0] ?.value.trim() || "";
    const 禁用英雄 = window.myheros || "";
    const 配置参数 = "null";
    return 内容
    .replace(/\{地图模式\}/g,
      地图ID)
    .replace(/\{禁用英雄\}/g,
      禁用英雄)
    .replace(/\{配置参数\}/g,
      配置参数)
    .replace(/\{链接\}/g,
      url)
    .replace(/\{换行\}/g,
      "\n")
    .replace(/\^/g,
      "&nbsp;");
  }
  try {
    if (!自动文本开关 || 自动文本开关.innerHTML.includes("关")) {
      return 替换所有变量(预设模板);
    }
    if (文本输入框) {
      if (!文本输入框.value.includes("{链接}")) {
        mdui.alert({
          headline: "提示",
          description: "错误！输入框内必须包含{链接}变量",
          confirm: "确定"
        });
        return 文本输入框.value;
      }
      return 替换所有变量(文本输入框.value);
    }
    return url;
  } catch (e) {
    console.error("处理失败:", e);
    alert("处理内容时发生错误: " + e.message);
    return url;
  }
}
// 备份相关功能
function 备份配置(type) {
  mdui.prompt({
    headline: "备份配置",
    description: "请输入唯一标识符（建议使用容易记住的英文或数字）",
    confirmText: "备份",
    cancelText: "取消",
    onConfirm: async (uniqueId) => {
      if (!uniqueId.trim()) {
        mdui.alert("唯一标识符不能为空", "提示");
        return;
      }

      try {
        let configData = {};
        if (type === 'hero') {
          // 获取当前英雄配置
          const editvalue = document.querySelectorAll(".myedit")[1].value;
          const heros_json = JSON.parse(localStorage.getItem("custom_heros") || "{}");
          if (heros_json[editvalue]) {
            configData = {
              type: 'hero',
              name: editvalue,
              data: heros_json[editvalue],
              uniqueId: uniqueId
            };
          } else {
            mdui.alert("请先选择要备份的配置", "提示");
            return;
          }
        } else if (type === 'custom') {
          // 获取当前自定义配置
          const editvalue = document.querySelectorAll(".myedit")[2].value;
          const custom_json = JSON.parse(localStorage.getItem("custom_cof") || "{}");
          if (custom_json[editvalue]) {
            configData = {
              type: 'custom',
              name: editvalue,
              data: custom_json[editvalue],
              uniqueId: uniqueId
            };
          } else {
            mdui.alert("请先选择要备份的配置", "提示");
            return;
          }
        }

        // 发送备份请求到后端
        const response = await fetch('/backup_config.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configData)
        });

        const result = await response.json();

        if (result.success) {
          mdui.alert(`配置备份成功！\n唯一标识：${uniqueId}`, "备份成功");
        } else {
          mdui.alert(`备份失败：${result.message}`, "错误");
        }
      } catch (error) {
        console.error('备份失败:', error);
        mdui.alert("备份失败，请检查网络连接", "错误");
      }
    }
  });
}

function 恢复配置(type) {
  mdui.prompt({
    headline: "恢复配置",
    description: "请输入要恢复的配置唯一标识符",
    confirmText: "恢复",
    cancelText: "取消",
    onConfirm: async (uniqueId) => {
      if (!uniqueId.trim()) {
        mdui.alert("唯一标识符不能为空", "提示");
        return;
      }

      try {
        // 发送恢复请求到后端
        const response = await fetch('/restore_config.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: type,
            uniqueId: uniqueId
          })
        });

        const result = await response.json();

        if (result.success) {
          // 恢复配置到本地存储
          if (type === 'hero') {
            const heros_json = JSON.parse(localStorage.getItem("custom_heros") || "{}");
            heros_json[result.data.name] = result.data.data;
            localStorage.setItem("custom_heros", JSON.stringify(heros_json));

            // 更新界面
            document.querySelectorAll(".myedit")[1].value = result.data.name;
            localStorage.setItem("banheros", result.data.name);
            加载英雄配置();
          } else if (type === 'custom') {
            const custom_json = JSON.parse(localStorage.getItem("custom_cof") || "{}");
            custom_json[result.data.name] = result.data.data;
            localStorage.setItem("custom_cof", JSON.stringify(custom_json));

            // 更新界面
            document.querySelectorAll(".myedit")[2].value = result.data.name;
            localStorage.setItem("customs", result.data.name);
            加载自定义配置();
          }

          mdui.alert(`配置恢复成功！\n配置名称：${result.data.name}`, "恢复成功");
        } else {
          mdui.alert(`恢复失败：${result.message}`, "错误");
        }
      } catch (error) {
        console.error('恢复失败:', error);
        mdui.alert("恢复失败，请检查网络连接", "错误");
      }
    }
  });
}

// 为备份按钮添加事件监听
// 备份相关功能
function 备份配置(type) {
  mdui.prompt({
    headline: "备份配置",
    description: "请输入唯一标识符（建议使用容易记住的英文或数字）",
    confirmText: "备份",
    cancelText: "取消",
    onConfirm: async (uniqueId) => {
      if (!uniqueId.trim()) {
        mdui.alert("唯一标识符不能为空", "提示");
        return;
      }

      // 验证唯一标识符格式（只允许字母、数字、下划线）
      if (!/^[a-zA-Z0-9_]+$/.test(uniqueId)) {
        mdui.alert("唯一标识符只能包含字母、数字和下划线", "提示");
        return;
      }

      try {
        let configData = {};
        let configName = "";

        if (type === 'hero') {
          // 获取当前英雄配置
          const editvalue = document.querySelectorAll(".myedit")[1].value;
          const heros_json = JSON.parse(localStorage.getItem("custom_heros") || "{}");
          if (heros_json[editvalue]) {
            configData = {
              type: 'hero',
              name: editvalue,
              data: heros_json[editvalue],
              timestamp: new Date().toISOString(),
              version: '1.0'
            };
            configName = editvalue;
          } else {
            mdui.alert("请先选择要备份的配置", "提示");
            return;
          }
        } else if (type === 'custom') {
          // 获取当前自定义配置
          const editvalue = document.querySelectorAll(".myedit")[2].value;
          const custom_json = JSON.parse(localStorage.getItem("custom_cof") || "{}");
          if (custom_json[editvalue]) {
            configData = {
              type: 'custom',
              name: editvalue,
              data: custom_json[editvalue],
              timestamp: new Date().toISOString(),
              version: '1.0'
            };
            configName = editvalue;
          } else {
            mdui.alert("请先选择要备份的配置", "提示");
            return;
          }
        }

        // 创建FormData发送数据
        const formData = new FormData();
        formData.append('uniqueId', uniqueId);
        formData.append('type', type);
        formData.append('configData', JSON.stringify(configData));

        // 发送备份请求到后端
        const response = await fetch('/backup_config.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          mdui.alert(`配置备份成功！\n配置名称：${configName}\n唯一标识：${uniqueId}`, "备份成功");
        } else {
          mdui.alert(`备份失败：${result.message}`, "错误");
        }
      } catch (error) {
        console.error('备份失败:', error);
        mdui.alert("备份失败，请检查网络连接", "错误");
      }
    }
  });
}

function 恢复配置(type) {
  mdui.prompt({
    headline: "恢复配置",
    description: "请输入要恢复的配置唯一标识符",
    confirmText: "恢复",
    cancelText: "取消",
    onConfirm: async (uniqueId) => {
      if (!uniqueId.trim()) {
        mdui.alert("唯一标识符不能为空", "提示");
        return;
      }

      try {
        // 发送恢复请求到后端
        const formData = new FormData();
        formData.append('uniqueId', uniqueId);
        formData.append('type', type);

        const response = await fetch('/restore_config.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // 恢复配置到本地存储
          const configData = result.data;

          if (type === 'hero') {
            const heros_json = JSON.parse(localStorage.getItem("custom_heros") || "{}");
            heros_json[configData.name] = configData.data;
            localStorage.setItem("custom_heros", JSON.stringify(heros_json));

            // 更新界面
            document.querySelectorAll(".myedit")[1].value = configData.name;
            localStorage.setItem("banheros", configData.name);
            加载英雄配置();
          } else if (type === 'custom') {
            const custom_json = JSON.parse(localStorage.getItem("custom_cof") || "{}");
            custom_json[configData.name] = configData.data;
            localStorage.setItem("custom_cof", JSON.stringify(custom_json));

            // 更新界面
            document.querySelectorAll(".myedit")[2].value = configData.name;
            localStorage.setItem("customs", configData.name);
            加载自定义配置();
          }

          mdui.alert(`配置恢复成功！\n配置名称：${configData.name}`, "恢复成功");
        } else {
          mdui.alert(`恢复失败：${result.message}`, "错误");
        }
      } catch (error) {
        console.error('恢复失败:', error);
        mdui.alert("恢复失败，请检查网络连接", "错误");
      }
    }
  });
}

// 为备份按钮添加事件监听
function 初始化备份功能() {
  // 等待DOM完全加载后再执行
  setTimeout(() => {
    // 禁用英雄配置的备份按钮
    const heroBackupBtn = document.createElement('mdui-button');
    heroBackupBtn.setAttribute('variant', 'filled');
    heroBackupBtn.setAttribute('class', 'herobutton');
    heroBackupBtn.setAttribute('icon', 'cloud_upload');
    heroBackupBtn.textContent = '备份配置';
    heroBackupBtn.onclick = () => 备份配置('hero');

    const heroRestoreBtn = document.createElement('mdui-button');
    heroRestoreBtn.setAttribute('variant', 'filled');
    heroRestoreBtn.setAttribute('class', 'herobutton');
    heroRestoreBtn.setAttribute('icon', 'cloud_download');
    heroRestoreBtn.textContent = '恢复配置';
    heroRestoreBtn.onclick = () => 恢复配置('hero');

    // 插入到英雄配置按钮区域 - 使用更准确的选择器
    const heroButtonContainer = document.querySelector('.example-dialog .mydiv');
    if (heroButtonContainer) {
      heroButtonContainer.appendChild(heroBackupBtn);
      heroButtonContainer.appendChild(heroRestoreBtn);
      console.log('英雄配置备份按钮已添加');
    } else {
      console.warn('未找到英雄配置按钮容器');
    }

    // 自定义配置的备份按钮
    const customBackupBtn = document.createElement('mdui-button');
    customBackupBtn.setAttribute('variant', 'filled');
    customBackupBtn.setAttribute('class', 'custombutton');
    customBackupBtn.setAttribute('icon', 'cloud_upload');
    customBackupBtn.textContent = '备份配置';
    customBackupBtn.onclick = () => 备份配置('custom');

    const customRestoreBtn = document.createElement('mdui-button');
    customRestoreBtn.setAttribute('variant', 'filled');
    customRestoreBtn.setAttribute('class', 'custombutton');
    customRestoreBtn.setAttribute('icon', 'cloud_download');
    customRestoreBtn.textContent = '恢复配置';
    customRestoreBtn.onclick = () => 恢复配置('custom');

    // 插入到自定义配置按钮区域
    const customButtonContainer = document.querySelector('.custom-dialog .mydiv');
    if (customButtonContainer) {
      customButtonContainer.appendChild(customBackupBtn);
      customButtonContainer.appendChild(customRestoreBtn);
      console.log('自定义配置备份按钮已添加');
    } else {
      console.warn('未找到自定义配置按钮容器');
    }
  },
    100);
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', 初始化备份功能);

// 如果对话框是动态加载的，还需要监听对话框打开事件
document.addEventListener('DOMContentLoaded', function() {
  // 监听英雄配置对话框打开
  const heroDialog = document.querySelector('.example-dialog');
  if (heroDialog) {
    heroDialog.addEventListener('open', function() {
      // 确保备份按钮存在
      setTimeout(() => {
        const heroContainer = this.querySelector('.mydiv');
        const existingBackupBtn = heroContainer.querySelector('mdui-button[icon="cloud_upload"]');
        if (!existingBackupBtn) {
          初始化备份功能();
        }
      },
        50);
    });
  }

  // 监听自定义配置对话框打开
  const customDialog = document.querySelector('.custom-dialog');
  if (customDialog) {
    customDialog.addEventListener('open', function() {
      // 确保备份按钮存在
      setTimeout(() => {
        const customContainer = this.querySelector('.mydiv');
        const existingBackupBtn = customContainer.querySelector('mdui-button[icon="cloud_upload"]');
        if (!existingBackupBtn) {
          初始化备份功能();
        }
      },
        50);
    });
  }
});