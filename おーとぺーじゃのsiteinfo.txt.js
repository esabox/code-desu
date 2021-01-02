MY_SITEINFO = [

  // url, nextLink, pageElement は必須。他は省略可。
  //https://headlines.yahoo.co.jp/cm/main?d=20191212-00000012-asahi-bus_all
  ////*[@id="ft"]/ul/li[12]/a
  {
    url: '^https://headlines\\.yahoo\\.co\\.jp/cm/',
    nextLink: '//a[contains(text(), "次へ")]',
    pageElement: '//body',
  },
  // {
  //   url: '^https://www.tokyomotion.net/',
  //   nextLink: '//a[contains(text(), "»")]',
  //   pageElement: '//body', //'//*[@id="wrapper"]/div[2]',
  // },
  {
    url: '^http://13dl.net/',
    nextLink: '//a[contains(text(), "»")]',
    pageElement: '//body',
  },
  {
    url: '^https://manga314\\.com/',
    nextLink: '//a[contains(text(), "« Older Entries")]',
    pageElement: '//*[@id="content"]',
    //pageElement: '//body', //
  },
  {
    url: '^https://www.tokyomotion.net/', //user/.+/videos',
    nextLink: '//a[contains(text(), "»")]',
    pageElement: '//body',
    //https://www.tokyomotion.net/user/t_t_t_t_t_t_t_t/videos?page=2
  },
  // {
  //   url: '^http://manga314\\.com/',
  //   nextLink: '//a[href^="https://manga314.com/page/"]',
  //   pageElement: '//body'
  // },
  {
    url: '^http://buhidoh/\\.net/',
    nextLink: '//.nextpostslink',
    pageElement: '//body'
  },
  {
    url: '^https://ja.nyahentai.com/',
    nextLink: '//a[@rel="next"]',
    pageElement: '//*[@class="container index-container"]' //'//body' //
    //pageElement: '//*[@id="content"]/div[2]' //'//body' //
  },
  {
    url: '^https://jav.re/.+/|^https://jav.com.se/',
    nextLink: '//a[contains(text(), "»")]',
    pageElement: '//body' //
  },
  {
    url: '^https://dlraw.net/filter/',
    nextLink: '//a[contains(text(), "Next →")]',
    pageElement: '//div[@class="gradient"]' //
  },
  // {
  //   url: '^',
  //   nextLink: '//a[contains(text(), "»")]',
  //   pageElement: '//body' //
  // },
  // {
  //   url: '^',
  //   nextLink: '//a[contains(text(), "»")]',
  //   pageElement: '//body' //
  // },
  // {
  //   url: '^',
  //   nextLink: '//a[contains(text(), "»")]',
  //   pageElement: '//body' //
  // },
  // {
  //   url: '^',
  //   nextLink: '//a[contains(text(), "»")]',
  //   pageElement: '//body' //
  // },

]