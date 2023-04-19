import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('has heading', async ({ page }) => {
    await page.goto('/')

    const title = page.getByRole('heading', { name: 'conduit' })

    await expect(title).toContainText('conduit')
  })
})
