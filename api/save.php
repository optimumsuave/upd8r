<?php

$json = $_POST['json'];
if (json_decode($json) != null) { /* sanity check */
	$file = fopen('json/content.json','w+');
	fwrite($file, $json);
	fclose($file);
	print 1;
} else {
	print 0;
 // handle error
}

?>