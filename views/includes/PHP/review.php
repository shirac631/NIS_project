<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

header('Content-Type: application/json; charset=utf-8');

//  התחברות למסד הנתונים
$server_name = "127.0.0.1"; 
$user_name   = "noamvi_NIS"; 
$password    = "noamvi_NIS"; 
$database    = "noamvi_users";

$conn = new mysqli($server_name, $user_name, $password, $database);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "חיבור לבסיס הנתונים נכשל"]);
    exit;
}

$visitor_name   = trim($_POST['visitor_name'] ?? "");
$visit_date     = trim($_POST['visit_date'] ?? "");
$rating         = intval($_POST['rating'] ?? 0);
$category       = trim($_POST['category'] ?? "");
$comment        = trim($_POST['comment'] ?? "");
$recommend_dish = trim($_POST['recommend_dish'] ?? "");

if (empty($visitor_name) || empty($comment)) {
    echo json_encode(["status" => "error", "message" => "נא למלא את כל שדות החובה"]);
    exit;
}

$sql = "INSERT INTO customer_reviews 
        (visitor_name, visit_date, rating, category, comment, recommend_dish, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "שגיאה במערכת"]);
    exit;
}

$stmt->bind_param("ssisss", 
    $visitor_name, $visit_date, $rating, $category, $comment, $recommend_dish
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success", 
        "message" => "הביקורת שלך התקבלה בהצלחה ותפורסם לאחר אישור המערכת. תודה ששיתפת אותנו!"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "שגיאה בשמירת הנתונים"]);
}

$stmt->close();
$conn->close();
?>