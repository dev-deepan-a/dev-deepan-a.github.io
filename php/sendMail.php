<?php
// the message
$msg = "Testing Email";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("shriram@houseofbluebeans.com","Test",$msg);
echo "Hello";
?>