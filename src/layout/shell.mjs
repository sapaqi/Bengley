import { esc, attrs, cx } from "../lib/html.mjs";

// Site-wide header, footer and document shell (WordPress: header.php / footer.php).

function header(ctx, page) {
  const { site } = ctx;
  const section = ctx.route.split("/")[0];
  const navLinks = site.navigation.map((item) => {
    const current = item.url.split("/")[0] === section && section !== "";
    return `<a ${attrs({
      href: ctx.url(item.url),
      "aria-current": current ? "page" : false,
      class: cx(
        "block border-t border-primary/12 py-[13px] text-[16px] leading-[1.5] whitespace-nowrap text-primary no-underline",
        "md:border-0 md:py-[10px] md:text-nav",
        "hover:text-link-hover hover:underline hover:underline-offset-[6px]",
        current && "font-semibold",
      ),
    })}>${esc(item.label)}</a>`;
  }).join("\n      ");

  return `<a class="skip-link fixed top-3 left-3 z-[100] -translate-y-[160%] bg-primary px-5 py-2 text-white focus:translate-y-0" href="#main">Skip to content</a>

  <header class="${cx(
    "site-header fixed top-[var(--header-top)] left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-between gap-0 rounded",
    "w-[calc(100%-var(--gutter)*2)] max-w-[1408px] min-h-[82px] px-5 py-4 max-xs:px-[15px] backdrop-blur-[18px]",
    "md:flex-nowrap md:gap-4 md:min-h-[90px] md:px-5 md:py-5 lg:gap-6 lg:px-6",
    "xl:min-h-[clamp(92px,6.818vw,120px)] xl:px-[30px] xl:py-6",
    page.overImage ? "bg-glass" : "bg-white/94",
  )}" id="site-header">
    <a class="brand relative block h-[51px] w-[170px] shrink-0 overflow-clip max-xs:h-[45px] max-xs:w-[150px] md:h-[47px] md:w-[158px] lg:h-[55px] lg:w-[185px] xl:h-[70px] xl:w-[235px]" href="${ctx.url("")}" aria-label="${esc(site.name)} home">
      <img class="brand__full absolute inset-0 h-full w-full object-contain" src="${ctx.icon("McGR logo")}" width="235" height="70" alt="">
      <img class="brand__symbol absolute top-1/2 left-0 size-[35px] -translate-y-1/2 opacity-0" src="${ctx.icon("McGR logo SYMBOL")}" width="35" height="35" alt="">
    </a>
    <button class="menu-toggle -mr-1.5 flex min-h-11 items-center gap-3 bg-transparent py-2 pr-1.5 pl-3 text-[13px] text-primary md:hidden" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav" hidden>
      <span class="menu-toggle__label max-xs:hidden">Menu</span>
      <span class="menu-toggle__icon relative block h-5 w-[23px]" aria-hidden="true"><span class="absolute top-[6px] left-0 h-px w-[23px] bg-current"></span><span class="absolute top-[14px] left-0 h-px w-[23px] bg-current"></span></span>
    </button>
    <nav class="primary-nav flex w-full flex-col items-stretch gap-0 pt-[18px] md:w-auto md:flex-row md:items-center md:gap-3 md:pt-0 lg:gap-5 xl:gap-[clamp(22px,2.841vw,50px)]" id="primary-nav" aria-label="Main navigation">
      ${navLinks}
    </nav>
  </header>`;
}

function footer(ctx) {
  const { site } = ctx;
  const legal = site.legalLinks
    .filter((item) => item.url) // links without a page yet are not shown
    .map((item) => `<a ${attrs({ href: ctx.url(item.url), "aria-current": ctx.route === item.url ? "page" : false, class: "no-underline hover:underline hover:underline-offset-[5px]" })}>${esc(item.label)}</a>`)
    .join("");
  const address = site.address.map(esc).join("<br>");

  return `<footer class="bg-primary text-white" data-section="footer">
    <div class="wrap grid grid-cols-1 gap-[42px] pt-[58px] pb-[52px] md:grid-cols-[30%_40%_30%] md:gap-0 md:pt-section md:pb-[90px] lg:grid-cols-[35%_38%_27%] xl:grid-cols-[42.5%_34.25%_23.25%] xl:pb-[130px]">
      <a class="w-[230px] self-start md:w-[180px] lg:w-[220px] xl:w-[270px]" href="${ctx.url("")}" aria-label="${esc(site.name)} home"><img class="h-auto w-full" src="${ctx.icon("McGR logo WHITE")}" width="270" height="80" alt="${esc(site.name)}" loading="lazy"></a>
      <nav class="grid grid-flow-col grid-cols-2 grid-rows-[repeat(3,auto)] content-start gap-x-[25px] gap-y-[15px] md:grid-cols-none md:gap-x-5 md:gap-y-3 md:pr-6 xl:gap-x-[30px] xl:pr-10" aria-label="Footer navigation">
        ${site.navigation.map((item) => `<a class="text-[15px] leading-[1.9] no-underline hover:underline hover:underline-offset-[5px] md:text-[14px] xl:text-body" href="${ctx.url(item.url)}">${esc(item.label)}</a>`).join("")}
      </nav>
      <div class="flex items-end justify-between gap-[25px] text-[14px] leading-[1.9] max-xs:flex-col max-xs:items-start md:block xl:text-body">
        <address>${address}</address>
        <a class="flex flex-col items-start gap-[14px] no-underline hover:underline hover:underline-offset-[5px] md:mt-[50px] md:flex-row md:items-center md:gap-[18px] xl:mt-[82px] xl:gap-[30px]" href="${esc(site.linkedin)}" target="_blank" rel="noopener noreferrer">Connect with us<img class="size-[26px]" src="${ctx.icon("linkedin logo WHITE")}" width="26" height="26" alt="LinkedIn (opens in a new tab)"></a>
      </div>
    </div>
    <div class="border-t border-white/35">
      <div class="wrap flex flex-col justify-between gap-[25px] py-7 text-[12px] leading-[1.9] md:flex-row md:gap-6 md:py-[46px] md:text-[14px] xl:text-body">
        <div class="flex flex-wrap gap-5">${legal}</div><p>${esc(site.credit)}</p>
      </div>
    </div>
  </footer>
  <div class="fixed bottom-6 left-1/2 z-[60] flex w-[min(560px,calc(100%-32px))] -translate-x-1/2 items-center gap-5 rounded border border-white/25 bg-primary px-6 py-[18px] text-white shadow-[0_8px_35px_rgb(0_0_0/20%)]" id="demo-notice" role="status" hidden><p class="text-[14px] leading-[1.6]">This content will be connected in the next stage.</p><button class="shrink-0 bg-transparent px-2.5 py-1 text-[28px] leading-none" type="button" aria-label="Dismiss message">×</button></div>`;
}

export function document(ctx, page, main) {
  const { site } = ctx;
  const title = page.route === "" ? site.name : `${page.title} | ${site.name}`;
  const description = page.description || `${page.title} — ${site.name}.`;
  return `<!doctype html>
<html ${attrs({ lang: "en", "data-brand": site.brand, "data-parallax": site.parallax ? false : "off" })}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#232c64">
  <meta name="description" content="${esc(description)}">
  <title>${esc(title)}</title>
  <link rel="icon" href="${ctx.icon("McGR logo SYMBOL")}" type="image/svg+xml">
  <link rel="preload" href="${ctx.asset("fonts/LibreFranklin-Variable.ttf")}" as="font" type="font/ttf" crossorigin>
  ${page.preload ? `<link rel="preload" href="${ctx.image(page.preload)}" as="image" fetchpriority="high">\n  ` : ""}<link rel="stylesheet" href="${ctx.asset("css/app.css")}">
  <script>document.documentElement.classList.add('js');</script>
  <script src="${ctx.asset("js/app.js")}" defer></script>
</head>
<body>
  ${header(ctx, page)}

  <main id="main">
${main}
  </main>

  ${footer(ctx)}
</body>
</html>
`;
}
