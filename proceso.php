<?php
$data = file_get_contents("data-1.json");
$items = json_decode($data, true);

$metodo = $_POST['proceso'];


if($metodo === 'todos'){
  $items = json_encode($items, true);
  echo $items;
}

if($metodo === 'ciudad'){
  $ciudades = [];
  foreach($items as $item){
    if(!in_array($item['Ciudad'], $ciudades)){
      $ciudades[] = $item['Ciudad'];
    }
  }
  echo json_encode($ciudades, true);
}

if($metodo === 'tipo'){
  $tipos = [];
  foreach($items as $item){
    if(!in_array($item['Tipo'], $tipos)){
      $tipos[] = $item['Tipo'];
    }
  }
  echo json_encode($tipos, true);
}

if($metodo === 'buscar'){
  $result = [];
  $ciudad = $_POST['ciudad'];
  $tipo = $_POST['tipo'];
  $from = $_POST['from'];
  $to = $_POST['to'];

  foreach($items as $item){
    $precio = $item['Precio'];
    $c = $item['Ciudad'];
    $t = $item['Tipo'];
    $precio = str_replace("$","",$precio,$i);
    $precio = str_replace(",","",$precio,$i);
    if($precio >= $from AND $precio <= $to ){
      if($ciudad == '' AND $tipo == ''){
          $results[] = $item;
      }else{
        if($ciudad != '' AND $tipo != ''){
          if($c == $ciudad AND $t == $tipo){
            $results[] = $item;
          }
        }else{
          if($ciudad != ''){
            if($c == $ciudad){
              $results[] = $item;
            }
          }
          if($tipo != ''){
            if($t == $tipo){
              $results[] = $item;
            }
          }
        }
      }
    }
  }

  $items = json_encode($results, true);
  echo $items;
}

?>
