import Head from 'next/head';
import { useRouter } from 'next/router';

const getIframeSrc = (html = '') => {
  if (typeof html !== 'string' || !html) return undefined;
  const match = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
};

const getYoutubeThumbnail = (url = '') => {
  if (typeof url !== 'string' || !url) return undefined;

  const match = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=))([^?&"'>]+)/i
  );

  const videoId = match?.[1];
  if (!videoId) return undefined;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const buildVideoJsonLd = (blok, pageUrl) => {
  const cards = blok?.Cards || [];

  const videoObjects = cards
    .map((card) => {
      const contentUrl = !card?.isEmbedded ? card?.Video?.filename : undefined;
      const embedUrl = card?.isEmbedded ? getIframeSrc(card?.embeddedCode || '') : undefined;
      const rawPublishedDate = card?.PublishedDate;
      const dateObj = typeof rawPublishedDate === 'string' ? new Date(rawPublishedDate) : null;
      const uploadDate =
        dateObj && !isNaN(dateObj.getTime()) ? dateObj.toISOString() : undefined;
      const duration = card?.videoDuration || blok?.videoDuration;

      if (!contentUrl && !embedUrl) return null;

      const name =
        card?.videoTitle ||
        card?.Title ||
        (card?.authorName
          ? `${card.authorName} video testimonial`
          : blok?.Title || 'Video testimonial');

      const thumbnailUrl =
        getYoutubeThumbnail(embedUrl) || card?.authorImage?.filename || undefined;

      const videoObject = {
        '@type': 'VideoObject',
        name,
        ...(card?.Quote ? { description: card.Quote } : {}),
        ...(thumbnailUrl ? { thumbnailUrl } : {}),
        ...(contentUrl ? { contentUrl } : {}),
        ...(embedUrl ? { embedUrl } : {}),
        ...(uploadDate ? { uploadDate } : {}),
        ...(duration ? { duration } : {}),
        ...(pageUrl ? { url: pageUrl } : {}),
        ...(pageUrl && card?._uid ? { '@id': `${pageUrl}#video-${card._uid}` } : {}),
      };

      return videoObject;
    })
    .filter(Boolean);

  if (!videoObjects.length) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': videoObjects,
  };
};

const VideoSchemaHead = ({ blok }) => {
  const router = useRouter();

  const siteUrl = process.env.NEXT_PUBLIC_RWIT_LIVE_URL || '';
  const pageUrl =
    siteUrl && router?.asPath ? `${siteUrl}${router.asPath.split('?')[0]}` : undefined;

  const videoJsonLd = buildVideoJsonLd(blok, pageUrl);

  if (!videoJsonLd) return null;

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
    </Head>
  );
};

export default VideoSchemaHead;
