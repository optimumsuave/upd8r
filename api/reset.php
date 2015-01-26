<?php 
//initial stuff


$master = [];
$residential = array("name"=> "Residential", "data"=>array(array("name"=>"A", "descr"=>"Hi")));
$commercial = array("name"=> "Commercial", "data"=>array(array("name"=>"B", "descr"=>"Lo")));
$nonprofit = array("name"=> "Non-Profit", "data"=>array(array("name"=>"C", "descr"=>"Mid")));
$master['data'] = array($residential, $commercial, $nonprofit);

$json = json_encode($master);

$file = fopen('json/content.json','w+');
fwrite($file, $json);
fclose($file);