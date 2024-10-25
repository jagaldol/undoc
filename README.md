# Undoc: Health Care Chatbot

[![banner](/docs/banner.png)](https://undoc.vercel.app)

webpage implementation of AI Undoc Chatbot.

> For more details on RAG and RAFT methods, please visit [main repo: health-care-advisor](https://github.com/jagaldol/health-care-advisor).

## [DEMO PAGE](https://undoc.vercel.app)

[![demo](/docs/demo.png)](https://undoc.vercel.app)

## How To Start

### Create Env file

```bash
cp .env.local.example .env.local
```

Copy the example file and update it according to your environment.

### Run Server

To start the development server, run:

```bash
npm install

# and

npm run dev
# or
yarn dev
# or
pnpm dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

> This project is built using [Next.js](https://nextjs.org/) and was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## System Structure

![structure](/docs/structure.png)

## Citation

- 초거대 AI 헬스케어 질의응답 데이터: AI 허브, 초거대 AI 헬스케어 질의응답 데이터
- Gemma 2 Model: "Gemma 2: Improving Open Language Models at a Practical Size", 2023.
- RAFT Methodology: "Adapting Language Model to Domain Specific RAG", arXiv preprint arXiv:2403.10131, 2023.
- RAGAS Evaluation: "RAGAS: Automated Evaluation of Retrieval Augmented Generation", 2023.
