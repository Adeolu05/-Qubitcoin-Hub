"""
Generate a looping Qubitcoin-themed hero background video.
Quantum grid + 16-qubit circuit motif + brand green glow.
"""

from __future__ import annotations

import math
from pathlib import Path

import imageio.v3 as iio
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "hero-bg.mp4"

# 1088 height is divisible by 16 (H.264 macro block) — avoids encoder resize blur
W, H = 1920, 1088
FPS = 24
DURATION = 10
BRAND = (26, 188, 156)
BG = (5, 5, 8)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def draw_frame(t: float) -> np.ndarray:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img, "RGBA")

    # Ambient radial glow (slow pulse)
    pulse = 0.5 + 0.5 * math.sin(t * 0.8)
    cx, cy = W * 0.5, H * 0.42
    glow_max = int(min(W, H) * 0.55)
    for r in range(glow_max, 0, -int(glow_max / 24)):
        alpha = int(12 * pulse * (1 - r / glow_max))
        draw.ellipse(
            (cx - r, cy - r * 0.65, cx + r, cy + r * 0.65),
            fill=(BRAND[0], BRAND[1], BRAND[2], alpha),
        )

    # Perspective grid floor
    horizon = int(H * 0.38)
    for i in range(-20, 21):
        x_base = W / 2 + i * (W * 0.043)
        draw.line(
            [(x_base, horizon), (W / 2 + i * (W * 0.14), H)],
            fill=(BRAND[0], BRAND[1], BRAND[2], 18),
            width=1,
        )
    for row in range(12):
        y = horizon + (H - horizon) * (row / 12) ** 1.2
        x_span = W * 0.062 + row * (W * 0.074)
        draw.line(
            [(W / 2 - x_span, y), (W / 2 + x_span, y)],
            fill=(40, 40, 50, 40),
            width=1,
        )

    # 16 qubit nodes + entanglement lines (qPoW motif)
    n_qubits = 16
    margin = W * 0.12
    spacing = (W - 2 * margin) / (n_qubits - 1)
    base_y = H * 0.32
    nodes: list[tuple[float, float]] = []

    for i in range(n_qubits):
        x = margin + i * spacing
        wave = math.sin(t * 1.4 + i * 0.45) * (H * 0.013)
        y = base_y + wave
        nodes.append((x, y))

        node_pulse = 0.6 + 0.4 * math.sin(t * 2 + i * 0.35)
        r = int(5 + 3 * node_pulse)
        glow_a = int(90 * node_pulse)
        draw.ellipse(
            (x - r - 4, y - r - 4, x + r + 4, y + r + 4),
            fill=(BRAND[0], BRAND[1], BRAND[2], glow_a // 3),
        )
        draw.ellipse(
            (x - r, y - r, x + r, y + r),
            fill=(BRAND[0], BRAND[1], BRAND[2], 220),
            outline=(180, 255, 230, 120),
            width=1,
        )

    # CNOT-style links between neighbors
    for i in range(n_qubits - 1):
        x1, y1 = nodes[i]
        x2, y2 = nodes[i + 1]
        link_alpha = int(50 + 40 * math.sin(t * 1.8 + i * 0.5))
        draw.line(
            [(x1, y1), (x2, y2)],
            fill=(BRAND[0], BRAND[1], BRAND[2], link_alpha),
            width=2,
        )

    # Floating hash particles (mining metaphor)
    for i in range(40):
        px = (math.sin(t * 0.3 + i * 1.7) * 0.5 + 0.5) * W
        py = (math.cos(t * 0.25 + i * 2.1) * 0.5 + 0.5) * H * 0.55 + H * 0.1
        size = 2 + (i % 3)
        alpha = int(30 + 25 * math.sin(t + i))
        draw.rectangle(
            (px, py, px + size, py + size),
            fill=(BRAND[0], BRAND[1], BRAND[2], alpha),
        )

    # Vignette
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    vdraw.ellipse(
        (W * 0.1, H * 0.05, W * 0.9, H * 0.95),
        fill=(0, 0, 0, 0),
        outline=(0, 0, 0, 180),
        width=int(min(W, H) * 0.11),
    )
    img = Image.alpha_composite(img.convert("RGBA"), vignette).convert("RGB")

    return np.array(img)


def main() -> None:
    frames = [draw_frame(t / FPS) for t in range(FPS * DURATION)]
    iio.imwrite(
        OUT,
        frames,
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        output_params=[
            "-crf",
            "15",
            "-preset",
            "slow",
            "-movflags",
            "+faststart",
        ],
    )
    print(f"Wrote {OUT} ({len(frames)} frames @ {FPS}fps, {W}x{H})")


if __name__ == "__main__":
    main()
