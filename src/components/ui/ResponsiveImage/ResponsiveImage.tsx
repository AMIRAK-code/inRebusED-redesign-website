import { useState, useCallback } from 'react'
import styles from './ResponsiveImage.module.css'

interface ResponsiveImageProps {
  src: string
  alt: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  placeholder?: string
  hasVariants?: boolean
  className?: string
  imgClassName?: string
  onLoad?: () => void
}

/**
 * Derives sibling AVIF / WebP paths from a .jpg src, builds a full <picture>
 * with AVIF → WebP → JPG sources (each with 640w/@2x srcset where files exist
 * — the browser will 404-skip missing variants gracefully).
 *
 * When `placeholder` (base64 LQIP) is supplied the wrapper shows it as a
 * blurred background; the <img> fades in over 200ms on load.
 */
export default function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  width,
  height,
  placeholder,
  hasVariants = false,
  className,
  imgClassName,
  onLoad,
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setLoaded(true)
    onLoad?.()
  }, [onLoad])

  const base = src.replace(/\.(jpe?g)$/i, '')
  const avif = `${base}.avif`
  const webp = `${base}.webp`

  // Use consistent w-descriptors; only include 640w/@2x when the pipeline
  // produced them (hasVariants=true, meaning source was >1600px wide).
  const avifSrcSet = hasVariants
    ? `${base}-640w.avif 640w, ${avif} 1600w, ${base}@2x.avif 3200w`
    : avif
  const webpSrcSet = hasVariants
    ? `${base}-640w.webp 640w, ${webp} 1600w, ${base}@2x.webp 3200w`
    : webp
  const jpgSrcSet = hasVariants
    ? `${base}-640w.jpg 640w, ${src} 1600w`
    : src

  const wrapStyle = placeholder
    ? ({
        backgroundImage: `url("${placeholder}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } as React.CSSProperties)
    : undefined

  return (
    <div
      className={`${styles.wrap}${className ? ` ${className}` : ''}`}
      style={wrapStyle}
    >
      {placeholder && (
        <div className={`${styles.blur}${loaded ? ` ${styles.blurHidden}` : ''}`} aria-hidden="true" />
      )}
      <picture>
        <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" />
        <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
        <source srcSet={jpgSrcSet}  sizes={sizes} type="image/jpeg" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          className={[
            styles.img,
            placeholder ? styles.imgFade : '',
            placeholder && loaded ? styles.imgLoaded : '',
            imgClassName ?? '',
          ].filter(Boolean).join(' ')}
        />
      </picture>
    </div>
  )
}
