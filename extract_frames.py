import cv2
import numpy as np
import os
import sys

VIDEO_PATH = r"C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4"
OUT_DIR = r"portfolio-hero/public/frames"
os.makedirs(OUT_DIR, exist_ok=True)

# 64-frame counter-clockwise continuous circular mapping for Mahi:
# 0..7:   RIGHT (0°) -> UP-RIGHT (45°)
# 8..15:  UP-RIGHT (45°) -> UP (90°)
# 16..23: UP (90°) -> UP-LEFT (135°)
# 24..31: UP-LEFT (135°) -> LEFT (180°)
# 32..39: LEFT (180°) -> DOWN-LEFT (225°)
# 40..47: DOWN-LEFT (225°) -> DOWN (270°)
# 48..55: DOWN (270°) -> DOWN-RIGHT (315°)
# 56..63: DOWN-RIGHT (315°) -> RIGHT (360°/0°)
frame_map = [
    # 0..7: 0° to 45° (RIGHT -> UP-RIGHT)
    130, 128, 126, 124, 115, 114, 113, 112,
    # 8..15: 45° to 90° (UP-RIGHT -> UP)
    111, 110, 109, 108, 8, 10, 12, 14,
    # 16..23: 90° to 135° (UP -> UP-LEFT)
    16, 18, 20, 28, 215, 213, 211, 209,
    # 24..31: 135° to 180° (UP-LEFT -> LEFT)
    207, 205, 200, 189, 186, 162, 68, 67,
    # 32..39: 180° to 225° (LEFT -> DOWN-LEFT)
    66, 65, 64, 63, 62, 61, 60, 59,
    # 40..47: 225° to 270° (DOWN-LEFT -> DOWN)
    58, 57, 56, 54, 52, 50, 48, 46,
    # 48..55: 270° to 315° (DOWN -> DOWN-RIGHT)
    44, 42, 40, 39, 38, 37, 36, 35,
    # 56..63: 315° to 360° (DOWN-RIGHT -> RIGHT)
    34, 34, 139, 138, 137, 136, 134, 132
]

def inpaint_frame(img):
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    mask[790:1020, 1590:1870] = 255
    return cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)

cap = cv2.VideoCapture(VIDEO_PATH)
if not cap.isOpened():
    print(f"Error opening video: {VIDEO_PATH}")
    sys.exit(1)

all_frames = {}
needed = set(frame_map)
needed.add(0) # Center direct eye-contact frame

f_idx = 0
while True:
    ret, frame = cap.read()
    if not ret: break
    if f_idx in needed:
        all_frames[f_idx] = frame
    f_idx += 1
cap.release()

print(f"Loaded {len(all_frames)} needed video frames.")

# Save 64 directional frames
for i, f_num in enumerate(frame_map):
    cleaned = inpaint_frame(all_frames[f_num])
    out_path = os.path.join(OUT_DIR, f"{i:03d}.webp")
    cv2.imwrite(out_path, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Save center eye contact frame
cleaned_center = inpaint_frame(all_frames[0])
cv2.imwrite(os.path.join(OUT_DIR, "center.webp"), cleaned_center, [cv2.IMWRITE_WEBP_QUALITY, 92])

print(f"Successfully saved 64 WebP frames + center.webp to {OUT_DIR}")
