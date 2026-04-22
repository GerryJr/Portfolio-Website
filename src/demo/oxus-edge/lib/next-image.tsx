import type { CSSProperties, ImgHTMLAttributes } from "react";
import { prefixAsset } from "./shims";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  width?: number | string;
  height?: number | string;
};

export default function Image({
  src,
  alt,
  fill,
  priority: _priority,
  quality: _quality,
  sizes: _sizes,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  loading,
  width,
  height,
  className,
  style,
  ...rest
}: ImageProps) {
  const finalSrc = prefixAsset(src);
  const finalLoading = loading ?? "lazy";
  if (fill) {
    const fillStyle: CSSProperties = {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      ...style,
    };
    return <img src={finalSrc} alt={alt} className={className} style={fillStyle} loading={finalLoading} {...rest} />;
  }
  // Emulate next/image's "width=N height=N + style={{ width: 'auto', height: 'auto' }}"
  // convention: size to the given pixel dimension on one axis, preserve aspect on the other.
  const styleWidthAuto = style && (style as CSSProperties).width === "auto";
  const styleHeightAuto = style && (style as CSSProperties).height === "auto";
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  const mergedStyle: CSSProperties = {
    ...style,
    width: styleWidthAuto
      ? styleHeightAuto
        ? w  // both auto → bound by width, aspect preserved via height:auto below
        : "auto"
      : (style as CSSProperties)?.width ?? w,
    height: styleHeightAuto && styleWidthAuto
      ? "auto"
      : (style as CSSProperties)?.height ?? h,
  };
  return <img src={finalSrc} alt={alt} className={className} style={mergedStyle} loading={finalLoading} {...rest} />;
}
