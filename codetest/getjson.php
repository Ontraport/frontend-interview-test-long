<?php
	$path = "data/";
	$filename = "";
	$jsonData = "{}";
	
	if(isset($_GET["file"]))
	{
		$filename = $path . $_GET["file"];
		$file = fopen($filename, "r" );
		
		if(!$file)
		{
	   		echo "Error opening file: " . $filename . ". Exiting...<br />";
	   		die();
		}
		
		$filesize = filesize($filename);
		$jsonData = fread($file, $filesize);	
		fclose($file);
	}
	else
	{
		echo "No file name specified. Exiting...<br />";
		die();
	}

	if(isset($_GET["callback"]))
	{
	    header('Content-Type: text/javascript; charset=utf8');
	    header('Access-Control-Allow-Origin: http://www.spencerbartz.com/');
	    header('Access-Control-Max-Age: 3628800');
	    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

	    $callback = $_GET["callback"];
	    echo $callback . '(' . $jsonData . ');';

	}
	else
	{
	    // normal JSON string
	    header('Content-Type: application/json; charset=utf8');
	    echo $jsonData;
	}
?>