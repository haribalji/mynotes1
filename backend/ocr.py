import cv2
import numpy as np
import pytesseract
import easyocr
from paddleocr import PaddleOCR

# --- Image Preprocessing Functions ---
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def remove_noise(image):
    return cv2.medianBlur(image, 5)

def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    gray = get_grayscale(img)
    thresh = thresholding(gray)
    deskewed = deskew(thresh)
    processed = remove_noise(deskewed)
    return processed

# --- OCR Functions ---
def ocr_tesseract(image):
    text = pytesseract.image_to_string(image)
    return text

def ocr_easyocr(image_path):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path, detail=0)
    return '\n'.join(result)

def ocr_paddleocr(image_path):
    ocr = PaddleOCR(use_angle_cls=True, lang='en')
    result = ocr.ocr(image_path, cls=True)
    lines = []
    for line in result[0]:
        lines.append(line[1][0])
    return '\n'.join(lines)

# --- Main Pipeline ---
def main(image_path, method='tesseract'):
    processed_image = preprocess_image(image_path)
    print('[INFO] Preprocessing done.')

    if method == 'tesseract':
        print('[INFO] Using Tesseract OCR...')
        text = ocr_tesseract(processed_image)
    elif method == 'easyocr':
        print('[INFO] Using EasyOCR...')
        text = ocr_easyocr(image_path)
    elif method == 'paddleocr':
        print('[INFO] Using PaddleOCR...')
        text = ocr_paddleocr(image_path)
    else:
        raise ValueError('Method must be "tesseract", "easyocr", or "paddleocr".')
    
    print('\n--- OCR Output ---\n')
    print(text)

if __name__ == "__main__":
    image_file = 'image.png'   # Replace with your image path
    ocr_method = 'tesseract'   # Change to 'easyocr' or 'paddleocr' as needed
    main(image_file, ocr_method)
