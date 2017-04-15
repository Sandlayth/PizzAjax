<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);

session_start();
require_once 'configureDB.php';

if(isset($_POST['action'])) {
    switch($_POST['action']) {
        case "addPizza":
            addPizza();
            break;
        case "getPizza":
            getPizza();
            break;
        case "delPizza":
            delPizza();
            break;
        default:
            echo "Go ride a lama, hacker!";
            break;
    }
} else {
    echo "Go ride a lama, hacker!";  
}


function addPizza() {
    if(!empty($_POST['name']) && !empty($_POST['price']) && !empty($_POST['idIngredients'])) {
        try {
            global $db_con;
            $name = $_POST['name'];
            $description = $_POST['description'];
            $price = $_POST['price'];

            $stmt = $db_con->prepare('insert into pizza(name, description, price) values(:name, :description, :price)');
            $stmt->execute(array('name' => $name, 'description' => $description, 'price' => $price));
            
            $idPizza = $db_con->lastInsertId();

            foreach($_POST["idIngredients"] as $idIngredient) { 
                $stmt = $db_con->prepare('insert into pizzaIngredient(idPizza, idIngredient) values(:idPizza, :idIngredient)');
                $stmt->execute(array('idPizza' => $idPizza, 'idIngredient' => $idIngredient));
            }

        } catch (PDOException $e) {
            echo $e;
        }
        echo "Success";
    } else {
        echo "Missing values";
    }
}

function delPizza() {
    if(!empty($_POST['id'])) {
        try {
            global $db_con;
            $id = $_POST['id'];

            $stmt = $db_con->prepare('delete from pizza where idPizza = :id');
            $stmt->execute(array('id' => $id));
        } catch (PDOException $e) {
            echo $e;
        }
        echo "Success";
    } else {
        echo "Missing values";
    }
}

function getPizza() {
    try { 
        global $db_con;
        $stmt = $db_con->prepare("select * from pizza");
        $stmt->execute();
        // $stmt->execute(array(":idEcole"=>$idEcole));
        $data = array();
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
            $data['idPizza'][] = $row;
        }       
        header('Content-Type: application/json');
        echo json_encode($data);  
    } catch (PDOException $e) {
        echo $e;
    }
}

?>
