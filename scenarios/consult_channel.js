const visit = async (page) => {
  await page.goto('/channel/u8', {
      waitUntil: 'networkidle',
  });
  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="date-btn"]');
  await page.waitForNetworkIdle();
  await page.waitForTimeout(2000);
};

module.exports = visit;