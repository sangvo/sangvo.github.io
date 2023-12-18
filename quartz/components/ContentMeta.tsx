import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

export default (() => {
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: string[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

      if (fileData.dates) {
        segments.push(formatDate(getDate(cfg, fileData)!))
      }

      const formatDateMicro = new Date(getDate(cfg, fileData)!).toISOString()
      const authorName = fileData.frontmatter?.author ?? cfg?.author?.name
      const authorUrl = fileData.frontmatter?.authorUrl ?? cfg?.author?.url
      const ogImagePath = fileData.frontmatter?.ogImage ?? `https://${cfg.baseUrl}/static/og-image.png`

      segments.push(timeTaken)
      return (
      <div class="content-meta-wrapper">
        {cfg.baseUrl && <meta itemprop="image" content={ogImagePath} />}
        <span class="content-meta author">
          <a itemprop="url" href={authorUrl}>
            <span itemprop="name">{authorName}</span>
          </a>
        </span>
        <time class={`content-meta ${displayClass ?? ""}`} dateTime={formatDateMicro} itemProp="datePublished">{segments.join(", ")}</time>
      </div>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta-wrapper {
    margin-top: 1rem;
  }
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  .author {
    margin-right: 0.5rem;
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
