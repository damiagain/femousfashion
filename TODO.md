# Fixes TODO

## Admin reviews page

- [x] Update `src/pages/admin/AdminReviews.tsx` to show: product thumbnail -> review text -> admin reply.

- [x] Persist admin reply in local state (add `adminReply` in the in-memory reviews objects and render it).

## WhatsApp cart link

- [x] Update `src/data/cartStore.ts` to generate a reliable “View cart” link for WhatsApp.
- [x] Ensure `/cart?token=...` loads the correct cart and cleans the URL.

## Shop all filter bug

- [ ] Update `src/pages/ShopPage.tsx` so “Shop all” (category slug `all` or missing slug) disables category filtering.

## Add to cart visibility

- [x] Verify and fix Add-to-cart rendering on product pages (likely `src/pages/ProductPage.tsx` and/or `src/components/ProductCard.tsx`).
- [ ] Fix any z-index/overlay issues with sticky CTAs.

## Hero image overlay

- [ ] Update `src/pages/HomePage.tsx` to ensure hero background stays behind foreground content (z-index / pointer-events).

## Verification

- [ ] Run `npm run build` (or `npm run dev`) and manually verify all 5 fixes.
