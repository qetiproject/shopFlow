# E2E ტესტები (Playwright)

## კონფიგურაცია

ყველა დეტალი არის **პროექტის ფესვში**: `playwright.config.ts`.

| პარამეტრი | მნიშვნელობა | რისთვის |
|-----------|-------------|--------|
| `testDir` | `e2e` | ტესტის ფაილები იქნება ამ ფოლდერში |
| `testMatch` | `*.e2e.ts` | მხოლოდ `.e2e.ts` ფაილები ითვლება ტესტებად |
| `baseURL` | `http://localhost:4200` | `page.goto('/login')` → `http://localhost:4200/login` |
| `webServer` | `npm run start` | ტესტებამდე ავტომატურად იშვება `ng serve` |
| `workers` | `1` | ერთი ტესტი ერთ დროს (თუ 2 ან მეტი — პარალელური გაშვება) |
| `timeout` | 25000 ms | ერთი ტესტის მაქს დრო |
| `expect.timeout` | 10000 ms | ასერციის ლოდინი |
| `use.screenshot` | `only-on-failure` | ჩავარდნისას ინახება სკრინშოტი |
| `use.video` | `on-first-retry` | retry-ზე იწერება ვიდეო |
| `projects` | chromium (და სურვილისამებრ firefox, webkit) | რომელ ბრაუზერებში გაეშვება |

## სკრიპტები (package.json)

- **`npm run e2e`** — ტესტების გაშვება (headless, უხილავი ბრაუზერი).
- **`npm run e2e:ui`** — Playwright UI (ინტერაკტიული, ტესტების არჩევა, ნაბიჯების ნახვა).
- **`npm run e2e:headed`** — ტესტები ხილულ ბრაუზერში (დებაგისთვის).

## პირველი გაშვება

1. დააყენე პაკეტი: `npm install`
2. დააყენე ბრაუზერები (ერთხელ): `npx playwright install chromium`
3. გაუშვი ტესტები: `npm run e2e`

ტესტის ფაილები დაამატე აქ `e2e/` ფოლდერში, გაფართოება: `*.e2e.ts`.

## კონვენციები

- **e2e/env.ts** — `BASE_URL` (process.env-დან); გამოიყენე smoke ან სადაც URL უნდა იყოს დინამიური.
- **e2e/helpers.ts** — გამოსაყენებელი ფუნქციები (მაგ. `expectLoginPage(page)`) რომ არ გაიმეორო იგივე assertion-ები.
- პროტექტედ როუტები — ერთი `describe` + მასივი URL-ების მიხედვით ციკლით ტესტები, იგივე ლოგიკა ერთ ადგილზე.
