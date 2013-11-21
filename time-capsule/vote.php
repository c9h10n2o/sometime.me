<?php
include 'common/common.php';
include 'common/conn.php';

$dev = !empty($_GET['dev']);

$tile_id = empty($_GET['id']) ? exit('{}') : (int)$_GET['id'];

$rs_tiles = $mysqli->query('SELECT votes FROM tiles WHERE id='.$tile_id);
$r_tile = $rs_tiles->fetch_array();
$cur_vote_num = $r_tile[0];
$rs_tiles->close();
$cur_vote_num += $_GET['action'] == 'cancel' ? -1 : 1;
if ($cur_vote_num < 0) $cur_vote_num = 0;
if (!$dev) $mysqli->query('UPDATE tiles SET votes='.$cur_vote_num.' WHERE id='.$tile_id);
?>
{
	"count": <?php echo $cur_vote_num ?> 
}

<?php $mysqli->close() ?>
