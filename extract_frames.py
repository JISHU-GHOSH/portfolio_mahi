import cv2
import numpy as np
import os
import sys

VIDEO_PATH = r"C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4"
OUT_DIR = r"portfolio-hero/public/frames"
os.makedirs(OUT_DIR, exist_ok=True)

# 64-frame counter-clockwise circular mapping for Mahi:
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
    124, 126, 128, 130, 132, 178, 180, 182,
    # 8..15: 45° to 90° (UP-RIGHT -> UP)
    184, 186, 188, 190, 8, 10, 12, 14,
    # 16..23: 90° to 135° (UP -> UP-LEFT)
    14, 16, 18, 20, 202, 204, 206, 208,
    # 24..31: 135° to 180° (UP-LEFT -> LEFT)
    210, 212, 214, 142, 144, 146, 148, 150,
    # 32..39: 180° to 225° (LEFT -> DOWN-LEFT)
    150, 152, 154, 58, 60, 62, 64, 66,
    # 40..47: 225° to 270° (DOWN-LEFT -> DOWN)
    66, 68, 70, 44, 46, 48, 50, 52,
    # 48..55: 270° to 315° (DOWN -> DOWN-RIGHT)
    52, 54, 56, 34, 36, 38, 40, 42,
    # 56..63: 315° to 360° (DOWN-RIGHT -> RIGHT)
    116, 118, 120, 121, 122, 123, 124, 124
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
