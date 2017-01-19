<?php
header("Access-Control-Allow-Origin: *");
//upload.php

$filename = $_FILES['file']['name'];
$filetype = $_FILES['file']['type'];
$filesize = $_FILES['file']['size'];
$fileerror = $_FILES['file']['error'];

$extra = array(
    "name" => $filename,
    "type" => $filetype,
    "size" => $filesize,
    "error" => $fileerror,
);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

$path = 'raw/';
$NowDir = getcwd();

if (isset($_FILES['file'])) {
    $filename = $_FILES['file']['name'];
    $full_filename = $NowDir . "/raw/" . $filename;

    // Check if file already exists
    if (file_exists($full_filename)) {
        echo json_encode(array(
            'status'   => false,
            'melding'  => $filename . ' already exists.',
            'pad'      => ''
        ));
        exit;
    }

    $ext = '.'.pathinfo($filename, PATHINFO_EXTENSION);
    $generatedName = md5($_FILES['file']['tmp_name']).$ext;
    $filePath = $path.$generatedName;
    $newPath = $path.$filename;
    $ren = rename($filePath, $newPath);

    //WORKAROUND: iPad noemt alle files <image.jpg>.
    if (strtolower($filename) == "image.jpg") {             // Test of het de beruchte file naam is
        $filename = $filesize . $filename;                  // Maak de file "uniek" met de file size
    }                                                       // Geen datum genomen. EXIF in $filetmp bevat geen creation date meer

    if (!is_writable($path)) {
        echo json_encode(array(
            'status'   => false,
            'melding'  => 'Destination directory not writable.',
            'pad'      => ''
        ));
        exit;
    }

    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        $newPath = $path.$filename;
        $ren = rename($filePath, $newPath);

        $Orentation = 1;
        $exif = exif_read_data($newPath);
        if(!empty($exif['Orientation'])) {
            $Orientation = $exif['Orientation'];
            adjustPicOrientation($newPath, $Orientation);
        };

        echo json_encode(array(
            'status'        => true,
            'melding'       => $filename,
            'pad'           => $path
        ));
    }
}
else {
    echo json_encode(
        array('status' => false, 'melding' => 'No file uploaded.', 'pad' => '')
    );
    exit;
}

//______________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________
function _mirrorImage ( $imgsrc) {
    $width = imagesx ( $imgsrc );
    $height = imagesy ( $imgsrc );

    $src_x = $width -1;
    $src_y = 0;
    $src_width = -$width;
    $src_height = $height;

    $imgdest = imagecreatetruecolor ( $width, $height );

    if ( imagecopyresampled ( $imgdest, $imgsrc, 0, 0, $src_x, $src_y, $width, $height, $src_width, $src_height ) )
    {
        return $imgdest;
    }
    return $imgsrc;
}

//______________________________________________________________________________________________________________________
function adjustPicOrientation($full_filename, $Orientation){
    if($Orientation != 1){
        $img = imagecreatefromjpeg($full_filename);
        $mirror = false;
        $deg    = 0;
        switch ($Orientation) {
            case 2:
                $mirror = true;
                break;
            case 3:
                $deg = 180;
                break;
            case 4:
                $deg = 180;
                $mirror = true;
                break;
            case 5:
                $deg = 270;
                $mirror = true;
                break;
            case 6:
                $deg = 270;
                break;
            case 7:
                $deg = 90;
                $mirror = true;
                break;
            case 8:
                $deg = 90;
                break;
        }
        if ($deg) $img = imagerotate($img, $deg, 0);
        if ($mirror) $img = _mirrorImage($img);
        imagejpeg($img, $full_filename, 95);
        imagedestroy($img);
    }
    return $full_filename;
}

?>

