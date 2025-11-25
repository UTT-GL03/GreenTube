const visit = async (page) => {
  await page.goto('/video/v53', { waitUntil: 'networkidle' });

  await page.waitForTimeout(10000);

  const videoPlayer = await page.$('[data-greenframeid="video-player"]');
  if (videoPlayer) await videoPlayer.click();
  else console.log("VIDEO PLAYER NOT FOUND");

  await page.waitForTimeout(1000);
  await page.scrollToEnd();
  await page.waitForTimeout(1000);

  const seeMoreDesc = await page.$('[data-greenframeid="see-more-desc"]');
  if (seeMoreDesc) await seeMoreDesc.click();
  else console.log("SEE MORE DESC NOT FOUND");

  await page.waitForTimeout(1000);
  await page.keyboard.press('Home');
  await page.waitForNetworkIdle();
  await page.waitForTimeout(10000);
};

module.exports = visit;