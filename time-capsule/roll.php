<?php
include 'common/common.php';
include 'common/conn.php';

$roll_start_id = empty($_GET['start_id']) ? '' : (int)$_GET['start_id'];
$roll_end_id = empty($_GET['end_id']) ? $roll_start_id : (int)$_GET['end_id'];
$roll_offset = empty($_GET['offset']) ? 0 : (int)$_GET['offset'];
$roll_amount = empty($_GET['amount']) ? 0 : (int)$_GET['amount'];
?>

{
	"birthday": "Wed Sep 16 1987 9:16:00 GMT+0800 (CST)"
,	"moments": <?php echo mysql_result(mysql_query('SELECT COUNT(*) FROM tiles WHERE type="image"'), 0) ?>
,	"count": <?php echo mysql_result(mysql_query('SELECT COUNT(*) FROM rolls'), 0) ?>
,	"rolls": [
	<?php
	$rs_rolls = null;
	
	if ($roll_start_id && $roll_end_id) {
		$roll_start_order = mysql_result(mysql_query('SELECT _order FROM rolls WHERE id='.$roll_start_id), 0);
		$roll_end_order = mysql_result(mysql_query('SELECT _order FROM rolls WHERE id='.$roll_end_id), 0);

		$rs_rolls = mysql_query('SELECT * FROM rolls WHERE _order>='.$roll_start_order.' AND _order<='.$roll_end_order
		.' ORDER BY _order DESC'.($roll_amount ? ' LIMIT 0, '.$roll_amount : ''));
		$roll_offset = mysql_result(mysql_query('SELECT COUNT(*) FROM rolls WHERE _order>'.$roll_end_order), 0);
	}
	elseif ($roll_amount) {
		$rs_rolls = mysql_query('SELECT * FROM rolls ORDER BY _order DESC LIMIT '.$roll_offset.', '.$roll_amount);
		$roll_offset = $roll_offset;
	}
	
	$is_first_roll = true;
	
	for (; $rs_rolls && $r_roll = mysql_fetch_object($rs_rolls); $roll_offset++) {
		echo $is_first_roll ? '' : ',';
		$is_first_roll = false;
	?>
		{
			"id": <?php echo $r_roll->id ?>
		,	"offset": <?php echo $roll_offset ?>
		,	"title": "<?php echo $r_roll->title ?>"
		,	"folder": "<?php echo $r_roll->folder ?>"
		,	"blocks": [
			<?php
			$rs_blocks = mysql_query('SELECT * FROM blocks WHERE roll_id='.$r_roll->id.' ORDER BY order_');
			$is_first_block = true;
			while ($r_block = mysql_fetch_object($rs_blocks)) {
				echo $is_first_block ? '' : ',';
				$is_first_block = false;
			?>
				{
					"style": "<?php echo $r_block->style ?>"
				,	"displayDate": "<?php echo $r_block->displayDate ?>"
				,	"tiles": [
					<?php
					$rs_tiles = mysql_query('SELECT * FROM tiles WHERE block_id='.$r_block->id);
					$is_first_tile = true;
					while ($r_tile = mysql_fetch_object($rs_tiles)) {
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
					<?php } ?>
					]
				}
			<?php } ?>
			]
		}
	<?php } ?>
	]
}

<?php mysql_close() ?>
