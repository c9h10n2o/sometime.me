<?php
include 'common/common.php';
include 'common/conn.php';
include 'common/gps/gps.php';
// include 'common/mail/send.php';

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
			"something": "<?php echo filter_user_text($r_comment->something) ?>"
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

<?php
//	send a notification mail
	$rs_tiles = $mysqli->query('SELECT block_id,title,file FROM tiles WHERE id='.$tile_id);
	$rs_tile = $rs_tiles->fetch_object();
	$rs_blocks = $mysqli->query('SELECT roll_id FROM blocks WHERE id='.$rs_tile->block_id);
	$rs_block = $rs_blocks->fetch_object();
	$rs_rolls = $mysqli->query('SELECT title,folder FROM rolls WHERE id='.$rs_block->roll_id);
	$rs_roll = $rs_rolls->fetch_object();

	$mail_pic_thumb = 'http://sometime.me/gallery/thumbs/'.$rs_roll->folder.'/'.$rs_tile->file.'.jpg';
	$mail_pic_title = $rs_roll->title.' · '.$rs_tile->title;
	$mail_link = 'http://sometime.me/#'.$rs_roll->folder.'/'.$tile_id;
	$mail_subject = '【断章】《'.$mail_pic_title.'》有了新评论';
	$mail_body = ($someplace ? '来自'.$someplace.'的 ' : '')
				.($someone ? $someone : '过客')
				.($somewhere ? '(<a href="'.$somewhere.'" target="_blank">'.$somewhere.'</a>)' : ($email ? '('.$email.')' : ''))
				.' 对《<a href="'.$mail_link.'" target="_blank">'.$mail_pic_title.'</a>》评论道：'
				.'<blockquote>'.$something.'</blockquote>'
				.'<hr><a href="'.$mail_link.'" target="_blank"><img src="'.$mail_pic_thumb.'"></a>';

	$rs_tiles->close();
	$rs_blocks->close();
	$rs_rolls->close();

	// send_mail($mail_subject, $mail_body, '寒塘渡月', ['someone@sometime.me', '寒塘渡月'], ['trash@sometime.me', '木樨']);
}
?>

<?php $mysqli->close() ?>
