<?php
// ini_set("display_errors", 1);
// error_reporting(E_ALL); 
$field_name = $_POST['cf_name'];
$field_email = $_POST['cf_email'];
$field_select = $_POST['cf_select'];
$field_message = $_POST['cf_message'];

// read XML file and obtain contact form email address
$file = "assets/xml/pages.xml";
$xml = simplexml_load_file($file);	
$contact = $xml->xpath("//pages/page/contact/formEmail/text()");
$mail_to = $contact[0];
		
$subject = 'Message from a site visitor: '.$field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'Reason: '.$field_select."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Message: '.$field_message;

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) {
	// header( 'Location: ./#thankyou' ) ;
	// mail sent successfully - response is handled by JavaScript, no client should navigate directly to this file
	echo 1;
}
else {
	// header( 'Location: ./#error' ) ;
	// mail error - response is handled by JavaScript, no client should navigate directly to this file
	echo 0;
}
?>