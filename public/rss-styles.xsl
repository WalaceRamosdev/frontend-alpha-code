<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
                .container { max-width: 800px; margin: 0 auto; padding: 40px 24px; }
                header { text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                h1 { font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
                .subtitle { color: #888; font-size: 1rem; }
                .feed-link { display: inline-block; margin-top: 16px; padding: 8px 20px; background: #d42838; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s; }
                .feed-link:hover { background: #b81f2d; }
                article { margin-bottom: 32px; padding: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; transition: border-color 0.2s; }
                article:hover { border-color: rgba(212,40,56,0.3); }
                h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
                h2 a { color: #fff; text-decoration: none; }
                h2 a:hover { color: #d42838; }
                .meta { font-size: 0.85rem; color: #666; margin-bottom: 12px; }
                .description { color: #999; font-size: 0.95rem; }
                footer { text-align: center; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); color: #555; font-size: 0.85rem; }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1><xsl:value-of select="/rss/channel/title"/></h1>
                    <p class="subtitle"><xsl:value-of select="/rss/channel/description"/></p>
                    <a class="feed-link" href="{/rss/channel/link}">Visitar o Blog →</a>
                </header>
                <xsl:for-each select="/rss/item">
                    <article>
                        <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
                        <div class="meta">
                            <xsl:value-of select="pubDate"/>
                        </div>
                        <p class="description"><xsl:value-of select="description" disable-output-escaping="yes"/></p>
                    </article>
                </xsl:for-each>
                <footer>
                    <p>© <xsl:value-of select="/rss/channel/title"/> — Alimentado por RSS</p>
                </footer>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
