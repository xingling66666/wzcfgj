<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 配置区域
define('DEBUG', true);
define('STORAGE_DIR', __DIR__ . '/room_data/');
define('LOGS_DIR', __DIR__ . '/logs/');

// 初始化目录
function initDirectories() {
    if (!file_exists(STORAGE_DIR) && !mkdir(STORAGE_DIR, 0755, true)) {
        return ['error' => '无法创建存储目录'];
    }
    if (!file_exists(LOGS_DIR) && !mkdir(LOGS_DIR, 0755, true)) {
        return ['error' => '无法创建日志目录'];
    }
    if (!is_writable(STORAGE_DIR)) {
        return ['error' => '存储目录不可写'];
    }
    if (!is_writable(LOGS_DIR)) {
        return ['error' => '日志目录不可写'];
    }
    return null;
}

// 写日志（包含所有要求字段）
function writeLog($是否成功, $message, $url = '', $roomId = '') {
    $logData = [
        '日期' => date('Y-m-d H:i:s'),
        'IP地址' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        '域名' => $_SERVER['HTTP_HOST'] ?? 'unknown',
        '结果' => $是否成功 ? '成功' : '失败',
        '原房间链接' => $url,
        '房间号' => $roomId,
        '消息' => $message
    ];
    
    // 构建日志行（JSON格式便于解析）
    $logLine = json_encode($logData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
    
    $logFile = LOGS_DIR . 'api_access_' . date('Y-m-d') . '.log';
    file_put_contents($logFile, $logLine, FILE_APPEND);
}

// 主程序开始
if (DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// 初始化目录
$initError = initDirectories();
if ($initError) {
    writeLog(false, '初始化错误: ' . $initError['error']);
    echo json_encode($initError);
    exit;
}

// 获取输入数据
$roomPageUrl = '';
if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] === 'application/x-www-form-urlencoded') {
    $roomPageUrl = $_POST['url'] ?? '';
} else {
    $requestData = file_get_contents('php://input');
    $data = json_decode($requestData, true);
    $roomPageUrl = $data['url'] ?? '';
}

// 验证URL
if (empty($roomPageUrl)) {
    writeLog(false, '空URL参数', '');
    echo '进房页面URL参数不能为空';
    exit;
}

if (!filter_var($roomPageUrl, FILTER_VALIDATE_URL)) {
    writeLog(false, '无效的URL格式', $roomPageUrl);
    echo "提供的url无效";
    exit;
}

// 生成唯一房间ID
$roomId = '';
$attempts = 0;
do {
    if ($attempts++ > 10) {
        writeLog(false, '无法生成唯一房间ID', $roomPageUrl);
        echo json_encode(['error' => '无法生成唯一房间ID']);
        exit;
    }
    $roomId = str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $filePath = STORAGE_DIR . $roomId . '.json';
} while (file_exists($filePath));

// 准备存储数据
$roomData = [
    'room_page_url' => $roomPageUrl,
    'created_at' => time(),
    'expires_at' => time() + 86400, // 24小时后过期
    'creator_ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
];

// 写入文件
if (file_put_contents($filePath, json_encode($roomData)) === false) {
    writeLog(false, '无法写入房间数据', $roomPageUrl, $roomId);
    echo json_encode(['error' => '无法保存房间数据']);
    exit;
}

// 返回成功响应
$response = [
    'success' => true,
    'room_id' => $roomId,
    'expires_at' => $roomData['expires_at'],
    'share_url' => (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . "/room.php?id={$roomId}"
];

writeLog(true, '房间创建成功', $roomPageUrl, $roomId);
echo json_encode($response);
?>
