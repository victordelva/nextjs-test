## Exercise details

## Problem (requirements)

We need to create a simple leave management system where the user can request leave by inputting dates and we book the leave based on the leave policy. The user needs to see the booked leaves on the user interface.

## Solution

1. Create a new `leave` API (/api/leave) that handles creating and reading all the booked leaves. It has a POST and GET handler:

- POST handler creates a new leave based on the start and end date
  - Validates input to make sure:
    1. the required data is posted
    2. Start date is not greater than end date
    3. Start date is not in the past
    4. User is allowed to book the leave based on the duration of the leave. For this one we use a `LeavePolicy` to determine if the user is allowed to book the leave. So for example if the user has booked 4 leaves and the total days are 20 and the allowance is 25 days, the user can not book a leave that is more than 5 days.
- GET handler returns all the created leaves

2. Create a new page which shows the leaves in the tabular view and provides a form for booking new leaves.

#### Video

### Other considerations

- For storing the data for simplicity you can store in memory (i.e. array, object etc.).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
