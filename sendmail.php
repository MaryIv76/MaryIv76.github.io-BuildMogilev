<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'phpMailer/src/Exception.php';
    require 'phpMailer/src/PHPMailer.php';
    
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
    
    //От кого письмо
    $mail->setFrom('mashamashustik@mail.ru', 'ООО "ОтделКом"');
    //Кому отправить 
    $mail->addAddress('ivanova_mary02@mail.ru');
    //Тема письма
    $mail->Subject = 'Привет! Это ООО "ОтделКом"';
    
    
    //Тело письма
    $body = '<h1>Встречайте супер письмо!</h1>';
    
    if (trim(!empty($_POST['input-name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['input-name'].'</p>';
    }
    if (trim(!empty($_POST['input-tel']))) {
        $body.='<p><strong>Телефон:</strong> '.$_POST['input-tel'].'</p>';
    }
    if (trim(!empty($_POST['input-text']))) {
        $body.='<p><strong>Сообщение:</strong> '.$_POST['input-text'].'</p>';
    }
    
    
    $mail->Body = $body;
    
    
    //Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }
    
    $response = ['message' => $message];
    
    
    header('Content-type: application/json');
    echo json_encode($response);
?>
