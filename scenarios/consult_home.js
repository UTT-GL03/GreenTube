const visit = async (page) => {
  await page.goto('', { waitUntil: 'networkidle' });

  await page.waitForTimeout(10000);

  await page.scrollToEnd();
  await page.waitForTimeout(1000);

  let seeMore = await page.$('[data-greenframeid="see-more"]');
  if (seeMore) {
    await seeMore.click();
  } else {
    console.log("SEE MORE NOT FOUND (1)");
  }

  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);

  let dateBtn = await page.$('[data-greenframeid="date-btn"]');
  if (dateBtn) {
    await dateBtn.click();
  } else {
    console.log("DATE BTN NOT FOUND");
  }

  await page.waitForTimeout(1000);

  let channelsBtn = await page.$('[data-greenframeid="channels-btn"]');
  if (channelsBtn) {
    await channelsBtn.click();
  } else {
    console.log("CHANNEL BTN NOT FOUND");
  }

  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);

  seeMore = await page.$('[data-greenframeid="see-more"]');
  if (seeMore) {
    await seeMore.click();
  } else {
    console.log("SEE MORE NOT FOUND (2)");
  }

  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForNetworkIdle();
  await page.waitForTimeout(2000);
};

module.exports = visit;