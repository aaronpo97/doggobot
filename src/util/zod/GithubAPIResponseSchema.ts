import { z } from 'zod';

const GithubAPISchema = z.object({
  name: z.string(),
  owner: z.object({
    html_url: z.string(),
  }),
  html_url: z.string(),
  description: z.string(),
  url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  license: z.object({
    name: z.string(),
    url: z.string(),
  }),
  topics: z.array(z.unknown()),
  visibility: z.string(),
  forks: z.number(),
  open_issues: z.number(),
});

export default GithubAPISchema;
