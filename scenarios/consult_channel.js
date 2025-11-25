const visit = async (page) => {
  await page.goto('/channel/u8', { waitUntil: 'networkidle' });

  await page.waitForTimeout(10000);

  await page.scrollToEnd();
  await page.waitForTimeout(1000);

  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);

  const dateBtn = await page.$('[data-greenframeid="date-btn"]');
  if (dateBtn) await dateBtn.click();
  else console.log("DATE BTN NOT FOUND IN CHANNEL PAGE");

  await page.waitForNetworkIdle();
  await page.waitForTimeout(2000);
};

module.exports = visit;