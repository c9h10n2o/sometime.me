<?php

header("content-type: application/json; charset=UTF-8");

// convert \r\n's to paragraphs or line breaks, and preserve extra spaces
function convert2html($str) {
	if (!$str) return '';
	
	$str = preg_replace('/(\r?\n){2}/', '</p><p>', $str);
	$str = preg_replace('/\r?\n/', '<br/>', $str);	
	$str = str_replace('  ', ' &nbsp;', $str);
	$str = str_replace('"', '\"', $str);
//	$str = str_replace("'", "\'", $str);
	$str = '<p>'.$str.'</p>';
	
	return $str;
}

// convert \r\n's to a space, and remove extra spaces
function filterUserText($str) {
	if (!$str) return '';

	$str = preg_replace('/(\r?\n)+/', ' ', $str);
	$str = preg_replace('/\s+/', ' ', $str);
	$str = str_replace('"', '\"', $str);
//	$str = str_replace("'", "\'", $str);
	
	return $str;
}

?>
