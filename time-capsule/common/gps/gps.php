<?php
define('__QQWRY__', __DIR__.'/geoip-qqwry');
//include __QQWRY__.'/bin.php';
//include __QQWRY__'/ext.php';
include __QQWRY__.'/sqlite.php';

function gps($ip) {
	if (empty($ip)) return '';

//	$qqwry_bin_file = __QQWRY__.'/qqwry.dat';
	$qqwry_sqlite_file = __QQWRY__.'/qqwry.mod.sqlite3';

//	$seeker = new IpLocationSeekerBinary($qqwry_bin_file);
	$seeker = new IpLocationSeekerSqlite($qqwry_sqlite_file);
	$geoloc = $seeker->seek($ip);
	
	return $geoloc[0].($geoloc[1] ? ' - '.$geoloc[1] : '');
	
//	TODO filter no-result / invalid IP
}
?>
