<?php
include 'common/common.php';
include 'common/conn.php';

$roll_id = empty($_GET['roll_id']) ? '' : $_GET['roll_id'];
$roll_offset = empty($_GET['offset']) ? 0 : (int)$_GET['offset'];
$roll_amount = empty($_GET['amount']) ? 0 : (int)$_GET['amount'];
?>

{
	"birthday": "Wed Sep 16 1987 9:16:59 GMT+0800 (CST)"
,	"moments": <?php
		$rs_tiles = $mysqli->query('SELECT id FROM tiles WHERE type="image"');
		echo $rs_tiles->num_rows;
		$rs_tiles->close();
	?> 
,	"count": <?php
		$rs_rolls = $mysqli->query('SELECT id FROM rolls');
		echo $rs_rolls->num_rows;
		$rs_rolls->close();
	?>

,	"rolls": [

	<?php
	$rs_rolls = null;
	
	if ($roll_id) {
		$rs_rolls = $mysqli->query('SELECT * FROM rolls WHERE folder="'.$roll_id.'"');
		if ($rs_rolls->num_rows) {
			$r_roll = $rs_rolls->fetch_object();
			$roll_order = $r_roll->_order;
			$rs_later_rolls = $mysqli->query('SELECT id FROM rolls WHERE _order>'.$roll_order);
			$roll_offset = $rs_later_rolls->num_rows;
			$rs_later_rolls->close();
		}
	}
	elseif ($roll_amount) {
		$rs_rolls = $mysqli->query('SELECT * FROM rolls ORDER BY _order DESC LIMIT '.$roll_offset.', '.$roll_amount);
		$roll_offset = $roll_offset;
	}
	
	$is_first_roll = true;
	
	for (; $rs_rolls && ($r_roll || $r_roll = $rs_rolls->fetch_object()); $roll_offset++) {
		echo $is_first_roll ? '' : ',';
		$is_first_roll = false;
	?>
		{
			"id": "<?php echo $r_roll->folder ?>"
		,	"offset": <?php echo $roll_offset ?> 
		,	"title": "<?php echo $r_roll->title ?>"
		,	"folder": "<?php echo $r_roll->folder ?>"
		,	"blocks": [
			<?php
			$rs_blocks = $mysqli->query('SELECT * FROM blocks WHERE roll_id='.$r_roll->id.' ORDER BY _order');
			$is_first_block = true;
			$r_roll = null;
			// clear to end loop
			while ($r_block = $rs_blocks->fetch_object()) {
				echo $is_first_block ? '' : ',';
				$is_first_block = false;
			?>
				{
					"style": "<?php echo $r_block->style ?>"
				,	"displayDate": "<?php echo $r_block->displayDate ?>"
				,	"tiles": [
					<?php
					$rs_tiles = $mysqli->query('SELECT * FROM tiles WHERE block_id='.$r_block->id);
					$is_first_tile = true;
					while ($r_tile = $rs_tiles->fetch_object()) {
						echo $is_first_tile ? '' : ',';
						$is_first_tile = false;
					?>
						{
							"id": "<?php echo $r_tile->id ?>"
						,	"tileNo": "<?php echo $r_tile->tileNo ?>"
						,	"type": "<?php echo $r_tile->type ?>"
						,	"file": "<?php echo $r_tile->file ?>"
						,	"title": "<?php echo $r_tile->title ?>"
						,	"votes": <?php echo $r_tile->votes ?>
						<?php
						if ($r_tile->type == 'text' || $r_tile->type == 'words')
							echo ', "text": "'.convert2html($r_tile->text).'"';
						else 
							echo ', "story": "'.convert2html($r_tile->story).'"';
						?>
						}
					<?php }
					$rs_tiles->close() ?>
					]
				}
			<?php }
			$rs_blocks->close() ?>
			]
		}
	<?php }
	$rs_rolls->close() ?>
	]
}

<?php $mysqli->close() ?>
