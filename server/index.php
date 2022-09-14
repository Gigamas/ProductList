<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'dbconnect.php';


$conn = OpenCon();
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
       $product = json_decode( file_get_contents('php://input'));
        $sql = "INSERT INTO ProductList(SKU, Name, Price, Size, Weight, Height, Width, Length) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssdddddd', $product->{'SKU'}, $product->{'Name'}, $product->{'Price'}, $product->{'Size'}, $product->{'Weight'}, $product->{'Height'}, $product->{'Width'}, $product->{'Length'});
        echo json_encode($stmt);
        if($stmt->execute()){
            $response = ['status' => 1];
        }else {
            $response = ['status' => 0];
        }
        echo json_encode($response);
        $stmt->store_result();
        break;
    case "GET":
        $sql = "SELECT * FROM ProductList ORDER BY SKU";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $resultSet = $stmt->get_result();
        $products = $resultSet->fetch_all(MYSQLI_ASSOC);
        echo json_encode($products);
        $stmt->store_result();
        break;
    case "DELETE":
        $sql = "DELETE FROM ProductList WHERE SKU = ?";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $path[2]);
        if($stmt->execute()){
            $response = ['status' => 1];
        }else {
            $response = ['status' => 0];
        }
        echo json_encode($response);
        $stmt->store_result();
        break;
    }


CloseCon($conn);


?>