<?php

$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'timeflow');
// $mysqli = new mysqli('180.178.33.76', 'a1112221456', '3edc4rfv5tgb', 'a1112221456');

if ($mysqli->connect_errno) http_response_code(500);

$mysqli->query('set names utf8');
// $mysqli->query('set character_set_client=utf8');
// $mysqli->query('set character_set_results=utf8');

?>