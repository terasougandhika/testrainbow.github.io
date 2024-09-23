<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if(isset($_POST['submit'])){
    // Sanitize input data
    $full_name = htmlspecialchars(strip_tags($_POST['full_name']));
    $from = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Validate email
    if (filter_var($from, FILTER_VALIDATE_EMAIL)) {
        $to = "donnosougi@gmail.com"; // replace with your actual email
        $subject = "Form submission from " . $full_name;

        $message_body = $full_name . " wrote the following:" . "\n\n" . $message;

        // Headers
        $headers = "From:" . $from . "\r\n";
        $headers .= "Reply-To: " . $from . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Sending email
        if(mail($to, $subject, $message_body, $headers)){
            echo "Mail Sent. Thank you " . $full_name . ", we will contact you shortly.";
        } else {
            echo "Failed to send email. Please try again later.";
        }
    } else {
        echo "Invalid email format. Please try again.";
    }
}
?>
