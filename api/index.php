<?php

// To get new password, type it in here...
// print sha1("holladay");
$TOKEN = "3a819b6b9d76925fc2a78d5561e371ca2e12b866";
$LOGGED_IN = 0;

if(isset($_POST['username']) && isset($_POST['password'])) {
	print_r($_POST);
	if($_POST['username'] == "admin" && sha1($_POST['password']) == $TOKEN){
		print "ya";
		header("Location: index.php?token=" . $TOKEN);
	} 
}

//Admin stuff
if(!isset($_GET['token'])) {
	$LOGGED_IN = 0;
} else {
	if($_GET['token'] == $TOKEN) {
		$LOGGED_IN = 1;
	}
}

if($LOGGED_IN) {

}

//Main site variables to change

$SITE_NAME = "Mitchell Holladay";

// date_default_timezone_set('UTC');
// $masterJSON = [];

?>



<!DOCTYPE html>
<html class="" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Admin | <?php print $SITE_NAME;?></title>
    <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css" />
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/main.css" />
    <link rel="stylesheet" href="assets/jquery-ui.min.css" />
  	<?php if($LOGGED_IN):?>
  		<script type="text/javascript" src="assets/jquery-2.1.3.min.js"></script>
  		<script type="text/javascript" src="assets/jquery-ui.min.js"></script>
  		<script type="text/javascript" src="assets/inliner.js"></script>
      <script type="text/javascript" src="assets/jquery.jeditable.js"></script>
  		<script type="text/javascript" src="assets/moment.js"></script>
  		<script type="text/javascript" src="assets/app.js"></script>
  	<?php endif;?>
  </head>
  <body>
  <nav>
  	<?php if($LOGGED_IN):?>
	<ul>
		<li class="save"><i class='fa fa-save'></i><span>Save</span></li>
		<li><i class='fa fa-power-off'></i><span>Log Out</span></li>
	</ul>
  	<?php endif;?>

  </nav>
  <div class="wrap">
  <?php if(!$LOGGED_IN):?>
  	<div class="login">
	  	<h1>Login</h1>
		<form action="index.php" method="post">
			<span>Username</span><input type="text" name="username" id="username"/> 
			<span>Password</span><input type="password" name="password" id="password"/>
			<input type="submit" value="CONFIRM"/>
		</form>
		<div class="clearfix"></div>
	</div>
  <?php endif;?>

  <?php if($LOGGED_IN):?>
  	<div class="contenteditor">
  		<h1>ADMIN</h1>
  		<div class="sections">
  			
  		</div>
  	</div>
  <?php endif;?>



  </div>
<style>
