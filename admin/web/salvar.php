<?php 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//$data = json_decode(file_get_contents("php://input"));
return file_put_contents("request.json", $request);
