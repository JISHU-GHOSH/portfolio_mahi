import cv2
import numpy as np
import os
import sys

VIDEO_PATH = r"C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4"
OUT_DIR = r"portfolio-hero/public/frames"
os.makedirs(OUT_DIR, exist_ok=True)

# Continuous unbroken 64-frame horizontal sweep from Frame 70 (Profile Left)
# through Frame 108 (Forward Center) to Frame 133 (Profile Right).
# Every adjacent frame is separated by exactly 1 video frame for 100% seamless continuity.
SWEEP_START = 70
SWEEP_END = 134 # 64 frames (70 to 133 inclusive)
CENTER_FRAME = 108

def inpaint_frame(img):
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    mask[790:1020, 1590:1870] = 255
    return cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)

cap = cv2.VideoCapture(VIDEO_PATH)
if not cap.isOpened():
    print(f"Error opening video: {VIDEO_PATH}")
    sys.exit(1)

frames = []
while True:
    ret, frame = cap.read()
    if not ret: break
    frames.append(frame)
cap.release()

print(f"Loaded {len(frames)} video frames from {VIDEO_PATH}.")

# Export 64 continuous frames
for i, f_num in enumerate(range(SWEEP_START, SWEEP_END)):
    cleaned = inpaint_frame(frames[f_num])
    out_path = os.path.join(OUT_DIR, f"{i:03d}.webp")
    cv2.imwrite(out_path, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Export forward eye-contact center frame (Frame 108)
cleaned_center = inpaint_frame(frames[CENTER_FRAME])
cv2.imwrite(os.path.join(OUT_DIR, "center.webp"), cleaned_center, [cv2.IMWRITE_WEBP_QUALITY, 92])

print(f"Successfully saved 64 continuous sweep frames + center.webp to {OUT_DIR}")
