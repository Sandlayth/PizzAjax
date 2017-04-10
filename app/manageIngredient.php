<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);

session_start();
require_once 'configureDB.php';

if(isset($_POST['action'])) {
    switch($_POST['action']) {
        case "addIngredient":
            addIngredient();
            break;
        case "getIngredient":
            getIngredient();
            break;
        case "delIngredient":
            delIngredient();
            break;
        default:
            echo "Go ride a lama, hacker!";
            break;
    }
} else {
    echo "Go ride a lama, hacker!";  
}

function addIngredient() {
    if(!empty($_POST['name'])) {
        try {
            global $db_con;
            $name = $_POST['name'];
            $stmt = $db_con->prepare('insert into ingredient(name) values(:name)');
            $stmt->execute(array('name' => $name));
        } catch (PDOException $e) {
            echo $e;
        }
        echo "Success";
    } else {
        echo "Missing values";
    }
}

function delIngredient() {
    if(!empty($_POST['id'])) {
        try {
            global $db_con;
            $id = $_POST['id'];

            $stmt = $db_con->prepare('delete from ingredient where idIngredient = :id');
            $stmt->execute(array('id' => $id));
        } catch (PDOException $e) {
            echo $e;
        }
        echo "Success";
    } else {
        echo "Missing values";
    }
}

function getIngredient() {
    try { 
        global $db_con;
        $stmt = $db_con->prepare("select * from ingredient");
        $stmt->execute();
        // $stmt->execute(array(":idEcole"=>$idEcole));
        $data = array();
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
            $data['idIngredient'][] = $row;
        }       
        header('Content-Type: application/json');
        echo json_encode($data);  
    } catch (PDOException $e) {
        echo $e;
    }
}

?>