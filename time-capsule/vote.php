<?php
include 'common/common.php';
include 'common/conn.php';

$debug = !empty($_GET['debug']);

$tile_id = empty($_GET['id']) ? exit('{}') : (int)$_GET['id'];

$cur_vote_num = mysql_result(mysql_query('SELECT votes FROM tiles WHERE id='.$tile_id), 0);
$cur_vote_num += $_GET['action'] == 'cancel' ? -1 : 1;
if ($cur_vote_num < 0) $cur_vote_num = 0;
if (!$debug) mysql_query('UPDATE tiles SET votes='.$cur_vote_num.' WHERE id='.$tile_id);
?>

{
	"count": <?php echo $cur_vote_num ?>
}

<?php mysql_close() ?>
