<?php
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// 设置时区为东八区（北京时间）
date_default_timezone_set('Asia/Shanghai');

// 配置常量
define('STORAGE_DIR', __DIR__ . '/room_data/');
define('ITEMS_PER_PAGE', 12);

// 检查并创建存储目录
if (!file_exists(STORAGE_DIR)) {
    if (!mkdir(STORAGE_DIR, 0755, true)) {
        die('<div class="error-message">无法创建房间数据目录</div>');
    }
}

// 获取分页参数
$currentPage = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($currentPage - 1) * ITEMS_PER_PAGE;

// 获取并排序房间文件
$roomFiles = glob(STORAGE_DIR . '*.json');
usort($roomFiles, function($a, $b) {
    return filemtime($b) - filemtime($a);
});

// 分页处理
$totalRooms = count($roomFiles);
$totalPages = ceil($totalRooms / ITEMS_PER_PAGE);
$paginatedFiles = array_slice($roomFiles, $offset, ITEMS_PER_PAGE);

// 处理房间数据
$rooms = [];
foreach ($paginatedFiles as $file) {
    $roomData = json_decode(file_get_contents($file), true);
    if (json_last_error() !== JSON_ERROR_NONE) continue;
    
    $roomId = basename($file, '.json');
    $expiresIn = ceil(($roomData['expires_at'] - time()) / 3600); // 剩余小时数
    
    $rooms[] = [
        'id' => $roomId,
        'created_at' => date('Y-m-d H:i:s', $roomData['created_at']),
        'expires_in' => $expiresIn > 0 ? $expiresIn . '小时' : '已过期',
        'share_url' => (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . "/room.php?id={$roomId}",
        'is_active' => $expiresIn > 0
    ];
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>房间列表</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .short-url {
            font-family: 'Courier New', monospace;
            background-color: #f3f4f6;
            padding: 0.5rem;
            border-radius: 0.375rem;
            word-break: break-all;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">
            房间列表
            </h1>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                共 <?php echo $totalRooms; ?> 个房间
            </span>
        </div>

        <?php if ($totalRooms === 0): ?>
            <div class="bg-white rounded-lg shadow p-8 text-center">
                <i class="fas fa-door-closed text-4xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-500">暂无房间数据</h3>
                <p class="text-gray-400 mt-2">当前没有可显示的房间信息</p>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($rooms as $room): ?>
                    <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 card-hover fade-in <?php echo !$room['is_active'] ? 'opacity-70' : ''; ?>">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-mono bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    ID: <?php echo $room['id']; ?>
                                </span>
                                <span class="<?php echo $room['is_active'] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?> px-3 py-1 rounded-full text-xs">
                                    <?php echo $room['is_active'] ? '有效' : '已过期'; ?>
                                </span>
                            </div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-500 mb-2">链接</label>
                                <div class="short-url text-blue-600 hover:text-blue-800 transition-colors">
                                    <?php echo htmlspecialchars($room['share_url']); ?>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                    <label class="block text-gray-500">创建时间</label>
                                    <p class="text-gray-700"><?php echo $room['created_at']; ?></p>
                                </div>
                                <div>
                                    <label class="block text-gray-500">剩余时间</label>
                                    <p class="text-gray-700"><?php echo $room['expires_in']; ?></p>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                                <a href="<?php echo htmlspecialchars($room['share_url']); ?>" 
                                   target="_blank"
                                   class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    <i class="fas fa-external-link-alt mr-2"></i>访问房间
                                </a>
                                <button onclick="copyToClipboard('<?php echo $room['share_url']; ?>')"
                                        class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                                    <i class="fas fa-copy mr-2"></i>复制链接
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            
            <?php if ($totalPages > 1): ?>
                <div class="flex justify-center mt-8">
                    <nav class="inline-flex rounded-md shadow-sm">
                        <?php if ($currentPage > 1): ?>
                            <a href="?page=<?php echo $currentPage - 1; ?>" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                <i class="fas fa-chevron-left"></i>
                            </a>
                        <?php endif; ?>
                        
                        <?php 
                        $startPage = max(1, $currentPage - 2);
                        $endPage = min($totalPages, $currentPage + 2);
                        
                        if ($startPage > 1): ?>
                            <a href="?page=1" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">1</a>
                            <?php if ($startPage > 2): ?>
                                <span class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500">...</span>
                            <?php endif; ?>
                        <?php endif; ?>
                        
                        <?php for ($i = $startPage; $i <= $endPage; $i++): ?>
                            <a href="?page=<?php echo $i; ?>" class="<?php echo $i == $currentPage ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-500 hover:bg-gray-50'; ?> px-3 py-2 border-t border-b border-gray-300">
                                <?php echo $i; ?>
                            </a>
                        <?php endfor; ?>
                        
                        <?php if ($endPage < $totalPages): ?>
                            <?php if ($endPage < $totalPages - 1): ?>
                                <span class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500">...</span>
                            <?php endif; ?>
                            <a href="?page=<?php echo $totalPages; ?>" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                <?php echo $totalPages; ?>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ($currentPage < $totalPages): ?>
                            <a href="?page=<?php echo $currentPage + 1; ?>" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                <i class="fas fa-chevron-right"></i>
                            </a>
                        <?php endif; ?>
                    </nav>
                </div>
            <?php endif; ?>
        <?php endif; ?>
    </div>

    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('链接已复制: ' + text);
            }).catch(err => {
                console.error('复制失败: ', err);
            });
        }
    </script>
</body>
</html>
