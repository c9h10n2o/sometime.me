<?php
include 'bin.php';

$sqlite_filepath = '/Users/nocturne/qqwry.mod.sqlite3';
//$sqlite_filepath = __DIR__.'/qqwry.mod.sqlite3';
$qqwry_filepath = __DIR__.'/qqwry.dat';
$seeker = new IpLocationSeekerBinary($qqwry_filepath);
$seeker->saveAsSqlite($sqlite_filepath, 3, true, !empty($_GET['echo']));
?>
