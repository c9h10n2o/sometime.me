<?php
include 'common/common.php';
include 'common/conn.php';

$debug = !empty($_GET['debug']);

$tile_id = empty($_GET['id']) ? exit('{}') : (int)$_GET['id'];

$r_tile = mysql_fetch_object(mysql_query('SELECT * FROM tiles WHERE id='.$tile_id));
if (!$debug) mysql_query('UPDATE tiles SET views=views+1 WHERE id='.$tile_id);
?>

{
	"id": <?php echo $r_tile->id ?>
,	"type": "<?php echo $r_tile->type ?>"
,	"file": "<?php echo $r_tile->file ?>"
,	"link": "<?php echo $r_tile->link ?>"
,	"title": "<?php echo $r_tile->title ?>"
,	"votes": <?php echo $r_tile->votes ?>

<?php
if ($r_tile->type == 'text' || $r_tile->type == 'words')
	echo ', "text": "'.convert2html($r_tile->text).'"';
else 
	echo ', "story": "'.convert2html($r_tile->story).'"';
?>

}

<?php mysql_close() ?>