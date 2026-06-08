"""Process Qubitcoin logo: transparent bg, rounded corners, favicon sizes."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = (
    ROOT
    / "assets"
    / "c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_eb76439034f1e8db9e2bb533261f6bfa_images_image-56bf16ac-d14a-4d1c-ab7f-74c334689900.png"
)
SRC = ASSETS if ASSETS.exists() else ROOT / "public" / "logo.png"

OUT_LOGO = ROOT / "public" / "logo.png"
OUT_ICON = ROOT / "src" / "app" / "icon.png"
OUT_FAVICON = ROOT / "public" / "favicon.ico"
OUT_APP_FAVICON = ROOT / "src" / "app" / "favicon.ico"
ROUND_RATIO = 0.18


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 10:
        return True
    if r < 28 and g < 28 and b < 28:
        return True
    return False


def strip_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if is_background(r, g, b, a):
                pixels[x, y] = (0, 0, 0, 0)
    return img


def round_corners(img: Image.Image, ratio: float = ROUND_RATIO) -> Image.Image:
    w, h = img.size
    radius = int(min(w, h) * ratio)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    rounded = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rounded.paste(img, (0, 0), mask)
    return rounded


def main() -> None:
    img = Image.open(SRC)
    img = strip_background(img)
    img = round_corners(img)

    img.save(OUT_LOGO, "PNG")
    print(f"Saved logo -> {OUT_LOGO}")

    icon = img.resize((512, 512), Image.Resampling.LANCZOS)
    icon.save(OUT_ICON, "PNG")
    print(f"Saved app icon -> {OUT_ICON}")

    favicon_sizes = [(16, 16), (32, 32), (48, 48)]
    favicon_images = [
        img.resize(size, Image.Resampling.LANCZOS) for size in favicon_sizes
    ]
    for out_path in (OUT_FAVICON, OUT_APP_FAVICON):
        favicon_images[0].save(
            out_path,
            format="ICO",
            sizes=[(s[0], s[1]) for s in favicon_sizes],
            append_images=favicon_images[1:],
        )
        print(f"Saved favicon -> {out_path}")


if __name__ == "__main__":
    main()
