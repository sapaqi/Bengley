"""Losslessly strip XMP (APP1 non-Exif) and Ducky (APP12) segments from JPEGs.

PHP's exif_read_data() warns when the first APP1 segment is XMP rather than Exif,
which WordPress triggers during media import. Pixel data is not re-encoded.
"""
import struct, sys, pathlib

def clean(path):
    data = path.read_bytes()
    if data[:2] != b"\xff\xd8":
        return False
    out, i, changed = bytearray(b"\xff\xd8"), 2, False
    while i < len(data):
        if data[i] != 0xFF:
            raise ValueError(f"{path}: bad marker at {i}")
        marker = data[i + 1]
        if marker == 0xDA:  # start of scan: copy the rest verbatim
            out += data[i:]
            break
        length = struct.unpack(">H", data[i + 2:i + 4])[0]
        segment = data[i:i + 2 + length]
        drop = (marker == 0xE1 and not segment[4:10] == b"Exif\x00\x00") or marker == 0xEC
        if drop:
            changed = True
        else:
            out += segment
        i += 2 + length
    if changed:
        path.write_bytes(out)
    return changed

for p in sorted(pathlib.Path(sys.argv[1]).glob("*.jpg")):
    if clean(p):
        print("cleaned", p.name)
