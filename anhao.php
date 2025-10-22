<?php
// anhao.php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userInput = $_POST['anhao'] ?? '';
    $correctAnhao = "星凌";
    if ($userInput === $correctAnhao) {
        $_SESSION['verified'] = true;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => '暗号错误']);
    }
    exit;
}
?>
