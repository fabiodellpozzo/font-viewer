<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fontFamily = $_POST['fontFamily'];
    $fontFile = $_FILES['fontFile'];
    $fontVariant = pathinfo($fontFile['name'], PATHINFO_FILENAME);

    $fontDir = __DIR__ . '/fonts/' . $fontFamily;
    if (!is_dir($fontDir)) {
        mkdir($fontDir, 0777, true);
    }

    $filePath = $fontDir . '/' . $fontVariant . '.' . pathinfo($fontFile['name'], PATHINFO_EXTENSION);
    if (move_uploaded_file($fontFile['tmp_name'], $filePath)) {
        $fileUrl = 'fonts/' . $fontFamily . '/' . $fontVariant . '.' . pathinfo($fontFile['name'], PATHINFO_EXTENSION);

        $jsonFilePath = __DIR__ . '/fonts.json';
        $fonts = json_decode(file_get_contents($jsonFilePath), true);
        $fontExists = false;

        foreach ($fonts as &$font) {
            if ($font['family'] === $fontFamily) {
                if (!in_array($fontVariant, $font['variants'])) {
                    $font['variants'][] = $fontVariant;
                }
                $font['files'][$fontVariant] = $fileUrl;
                $fontExists = true;
                break;
            }
        }

        if (!$fontExists) {
            $fonts[] = [
                'family' => $fontFamily,
                'variants' => [$fontVariant],
                'files' => [
                    $fontVariant => $fileUrl
                ]
            ];
        }

        file_put_contents($jsonFilePath, json_encode($fonts));
        echo json_encode(['status' => 'success', 'fontFamily' => $fontFamily, 'fontVariant' => $fontVariant, 'fileUrl' => $fileUrl]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
