<?php
header('Access-Control-Allow-Origin: *');

define('STORAGE_DIR', __DIR__ . '/room_data/');

$roomId = $_GET['id'] ?? '';
if($roomId === "") {
    http_response_code(400);
    die('<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>房间ID无效</title>
    <style>
        body {
            text-align: center;
            padding: 50px;
            font-family: "Microsoft YaHei", sans-serif;
        }
        h2 {
            color: red;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h2>房间ID未填写</h2>
    <p>房间ID不能为空</p>
</body>
</html>');
}
if (!preg_match('/^\d{6}$/', $roomId)) {
    http_response_code(400);
    die('<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>房间ID无效</title>
    <style>
        body {
            text-align: center;
            padding: 50px;
            font-family: "Microsoft YaHei", sans-serif;
        }
        h2 {
            color: red;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h2>房间ID无效</h2>
    <p>房间ID必须是6位数字</p>
</body>
</html>');
}

$filePath = STORAGE_DIR . $roomId . '.json';

if (!file_exists($filePath)) {
    http_response_code(404);
    die('<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>房间不存在</title>
    <style>
        body {
            text-align: center;
            padding: 50px;
            font-family: "Microsoft YaHei", sans-serif;
        }
        h2 {
            color: red;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h2>房间不存在</h2>
    <p>可能已被删除或已过期</p>
</body>
</html>');
}

$roomData = json_decode(file_get_contents($filePath), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    die('<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>房间数据损坏</title>
    <style>
        body {
            text-align: center;
            padding: 50px;
            font-family: "Microsoft YaHei", sans-serif;
        }
        h2 {
            color: red;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h2>房间数据损坏</h2>
    <p>无法读取房间配置</p>
</body>
</html>');
}

if (time() > $roomData['expires_at']) {
    http_response_code(410);
    die('<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>房间已过期</title>
    <style>
        body {
            text-align: center;
            padding: 50px;
            font-family: "Microsoft YaHei", sans-serif;
        }
        h2 {
            color: red;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h2>房间已过期</h2>
    <p>房间链接24小时后自动失效</p>
</body>
</html>');
}

$roomPageUrl = htmlspecialchars($roomData['room_page_url'], ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>正在加载房间 <?php echo htmlspecialchars($roomId, ENT_QUOTES, 'UTF-8'); ?></title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: "Microsoft YaHei", sans-serif;
        }
        #loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: white;
        }
        #loading h2 {
            color: #333;
            margin-top: 20px;
        }
        #room-frame {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div id="loading">
        <h2>正在加载房间（房间号：<?php echo htmlspecialchars($roomId, ENT_QUOTES, 'UTF-8');?>）...</h2>
    </div>
    <iframe id="room-frame" src="<?php echo $roomPageUrl; ?>" 
            onload="document.getElementById('loading').style.display='none'; document.title='房间加入（房间号：<?php echo htmlspecialchars($roomId, ENT_QUOTES, 'UTF-8'); ?>）';"></iframe>
</body>
</html>
