const visit = async (page) => {
  await page.goto('/video/v53', {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="video-player"]');
  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);
  await page.click('[data-greenframeid="see-more-desc"]');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForNetworkIdle();
  await page.waitForTimeout(10000);
};

module.exports = visit;