import puppeteer from "puppeteer";

const getChannel = async ({ channelLink }: { channelLink: string }) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  console.log(channelLink);

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto(channelLink, {
    waitUntil: "domcontentloaded",
  });

  const video_count = await page.$x('//*[@id="videos-count"]/span[1]');

  const sub_count = await page.$x('//*[@id="subscriber-count"]');

  const channel_name = await page.$x('//*[@id="text"]');

  let video_count_value = await page.evaluate(
    (el) => el.textContent,
    video_count[0]
  );

  let sub_count_value = await page.evaluate(
    (el) => el.textContent,
    sub_count[0]
  );

  let channel_name_value = await page.evaluate(
    (el) => el.textContent,
    channel_name[0]
  );

  await browser.close();

  return {
    'subs': sub_count_value,
    'videos': video_count_value,
    'name': channel_name_value
  }
};

export default getChannel;