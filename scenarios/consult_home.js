const visit = async (page) => {
  await page.goto('', {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(2000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="see-more"]');
  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="date-btn"]');
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="channels-btn"]');
  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="see-more"]');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForNetworkIdle();
  await page.waitForTimeout(2000);
};

module.exports = visit;