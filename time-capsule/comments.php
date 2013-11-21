<?php
include 'common/common.php';
include 'common/conn.php';
include 'common/gps/gps.php';

$tile_id = empty($_REQUEST['id']) ? exit('{}') : (int)$_REQUEST['id'];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
//	get the comments
	$comment_start_index = empty($_GET['start']) ? 0 : $_GET['start'] - 1;
	$comment_amount = empty($_GET['amount']) ? 5 : $_GET['amount'];
?>

{	
	"count": <?php
		$rs_comments = $mysqli->query('SELECT id FROM comments WHERE tile_id='.$tile_id);
		echo $rs_comments->num_rows;
		$rs_comments->close();
	?>

,	"comments": [
	<?php
	$rs_comments = $mysqli->query('SELECT * FROM comments WHERE tile_id='.$tile_id.' ORDER BY sometime DESC LIMIT '.$comment_start_index.', '.$comment_amount);
	
	$is_first_comment = true;
	
	while ($r_comment = $rs_comments->fetch_object()) {
		echo $is_first_comment ? '' : ',';
		$is_first_comment = false;
	?>
		{
			"something": "<?php echo filterUserText($r_comment->something) ?>"
		,	"someone": "<?php echo $r_comment->someone ?>"
		,	"someplace": "<?php echo $r_comment->someplace ?>"
		,	"somewhere": "<?php echo $r_comment->somewhere ?>"
		,	"sometime": "<?php echo $r_comment->sometime ?>"
		}
	<?php }
	$rs_comments->close() ?>
	]
}

<?php
}
else {
//	post a comment

//	validate data
	$something = empty($_POST['something']) ? exit('{}') : $_POST['something'];
	$someone = $_POST['someone'];
	$somewhere = $_POST['somewhere'];
	$email = $_POST['email'];
	$ip = $_SERVER['REMOTE_ADDR'];
	$someplace = gps($ip);

	$mysqli->query('INSERT INTO comments (tile_id, something, someone, somewhere, email, ip, someplace) VALUES ('.$tile_id.', "'.$something.'", "'.$someone.'", "'.$somewhere.'", "'.$email.'", "'.$ip.'", "'.$someplace.'")');
	$rs_comments = $mysqli->query('SELECT * FROM comments ORDER BY sometime DESC');
	$r_this_comment = $rs_comments->fetch_object();
	$rs_comments->close();
?>

{
	"someplace": "<?php echo $r_this_comment->someplace ?>"
,	"sometime": "<?php echo $r_this_comment->sometime ?>"
}

<?php } ?>

<?php $mysqli->close() ?>
